<?php
/**
 * Prosat — Meta Conversions API endpoint
 *
 * Recebe eventos do navegador (Lead, Contact, ViewContent — e, já
 * preparado mas não usado automaticamente hoje: QualifiedLead,
 * Opportunity, Sale) e reenvia para a Meta Graph API do lado do
 * servidor, usando o mesmo event_id que o Pixel já disparou no
 * navegador (deduplicação automática pela Meta).
 *
 * A configuração real (Pixel ID + Access Token) NÃO fica neste arquivo
 * nem em qualquer lugar dentro de public_html — fica num arquivo
 * privado fora da pasta pública do site. Veja TRACKING_SETUP.md para
 * o caminho exato e o passo a passo de upload na Hostinger.
 */

// ── CORS: só o domínio da Prosat pode chamar este endpoint ──
$allowedOrigins = [
    'https://prosatmonitoramento.com',
    'https://www.prosatmonitoramento.com',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// ── Config privada (Pixel ID / Token / versão da Graph API) ──
// Ajuste este caminho se a estrutura de pastas na Hostinger for diferente
// da documentada em TRACKING_SETUP.md.
$configPath = __DIR__ . '/../../private/meta-config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'server_misconfigured']);
    exit;
}
require $configPath;

if (!defined('META_PIXEL_ID') || !defined('META_ACCESS_TOKEN') || !defined('META_GRAPH_VERSION')) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'server_misconfigured']);
    exit;
}

// ── Lê e valida o payload (limite de ~1MB) ──
$raw = file_get_contents('php://input', false, null, 0, 1000000);
if ($raw === false || strlen($raw) === 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'empty_body']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

// ── event_name: allowlist explícita — nada fora daqui passa.
// QualifiedLead/Opportunity/Sale estão liberados aqui pra quando forem
// usados no futuro, mas HOJE nenhum código do site os dispara. ──
$allowedEvents = ['Lead', 'Contact', 'ViewContent', 'QualifiedLead', 'Opportunity', 'Sale'];
$eventName = isset($data['event_name']) ? (string) $data['event_name'] : '';
if (!in_array($eventName, $allowedEvents, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_event_name']);
    exit;
}

// ── event_id: obrigatório, é o que garante a deduplicação ──
$eventId = isset($data['event_id']) ? substr((string) $data['event_id'], 0, 100) : '';
if ($eventId === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_event_id']);
    exit;
}

$eventSourceUrl = isset($data['event_source_url']) ? substr((string) $data['event_source_url'], 0, 500) : '';

function prosat_sanitize_text($value, int $maxLen = 200): ?string
{
    if (!is_string($value) || $value === '') {
        return null;
    }
    $value = trim(strip_tags($value));
    return $value === '' ? null : substr($value, 0, $maxLen);
}

function prosat_hash(?string $value): ?string
{
    if ($value === null || $value === '') {
        return null;
    }
    return hash('sha256', strtolower(trim($value)));
}

// ── user_data — hashing SHA-256 só nos campos que a Meta exige ──
$userDataInput = is_array($data['user_data'] ?? null) ? $data['user_data'] : [];

$email = prosat_sanitize_text($userDataInput['email'] ?? null, 200);
$phoneRaw = prosat_sanitize_text($userDataInput['phone'] ?? null, 30);
$phone = $phoneRaw !== null ? preg_replace('/\D/', '', $phoneRaw) : null;
$firstName = prosat_sanitize_text($userDataInput['first_name'] ?? null, 100);
// external_id = visitor_id anônimo (lib/attribution.ts) — não é PII, mas a
// Meta pede que também vá hasheado, igual em/ph/fn.
$externalId = prosat_sanitize_text($userDataInput['external_id'] ?? null, 100);

$userData = array_filter([
    'em' => prosat_hash($email),
    'ph' => prosat_hash($phone),
    'fn' => prosat_hash($firstName),
    'external_id' => prosat_hash($externalId),
    // client_ip_address, client_user_agent, fbp, fbc NÃO são hasheados.
    'client_ip_address' => prosat_sanitize_text($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? null, 100),
    'client_user_agent' => prosat_sanitize_text($_SERVER['HTTP_USER_AGENT'] ?? null, 300),
    'fbp' => prosat_sanitize_text($data['fbp'] ?? null, 100),
    'fbc' => prosat_sanitize_text($data['fbc'] ?? null, 100),
], function ($v) {
    return $v !== null;
});

// ── custom_data — nunca deixa passar subject/message/PII ──
$customDataInput = is_array($data['custom_data'] ?? null) ? $data['custom_data'] : [];
$blockedKeys = ['subject', 'message', 'email', 'phone', 'name', 'first_name'];
$customData = [];
foreach ($customDataInput as $key => $value) {
    if (in_array($key, $blockedKeys, true)) {
        continue;
    }
    if (is_string($value)) {
        $customData[$key] = prosat_sanitize_text($value, 200);
    } elseif (is_scalar($value)) {
        $customData[$key] = $value;
    }
}

// ── Monta o evento no formato da Graph API ──
$event = [
    'event_name' => $eventName,
    'event_time' => time(),
    'event_id' => $eventId,
    'action_source' => 'website',
    'event_source_url' => $eventSourceUrl,
    'user_data' => $userData,
];
if (!empty($customData)) {
    $event['custom_data'] = $customData;
}

$graphUrl = sprintf(
    'https://graph.facebook.com/%s/%s/events',
    META_GRAPH_VERSION,
    META_PIXEL_ID
);

$body = json_encode([
    'data' => [$event],
    'access_token' => META_ACCESS_TOKEN,
]);

$ch = curl_init($graphUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_CONNECTTIMEOUT => 3,
]);
$response = curl_exec($ch);
$curlErrno = curl_errno($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Nunca ecoar $response bruto (pode conter detalhes internos da Meta) nem o token.
if ($response === false || $curlErrno !== 0) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'meta_request_failed']);
    exit;
}

if ($httpCode < 200 || $httpCode >= 300) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'meta_rejected_event']);
    exit;
}

echo json_encode(['ok' => true]);
