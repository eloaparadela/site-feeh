// ─────────────────────────────────────────────
// CONFIGURAÇÃO CENTRAL DE TRACKING
// ─────────────────────────────────────────────
// Único lugar do projeto com os IDs/labels de tracking.
//
// META: já configurado e ativo.
//
// GOOGLE (GA4 e Google Ads): ainda NÃO temos os IDs. Os campos ficam
// como `null` de propósito — todo o código em lib/google.ts faz
// early return quando eles são null, então nada é carregado nem
// disparado até você preencher os valores reais aqui.
//
// Quando tiver os IDs do Google, troque os `null` abaixo pelos valores
// reais e gere um novo build (`npm run build`). Não precisa mexer em
// mais nenhum arquivo.
export const TRACKING_CONFIG = {
  // Meta Pixel — Gerenciador de Eventos → Fontes de dados → Pixel
  META_PIXEL_ID: '1596095051343969',

  // Endpoint da Meta Conversions API (PHP, hospedado na Hostinger).
  // Caminho relativo: funciona em qualquer domínio sem precisar editar.
  META_CAPI_ENDPOINT: '/api/meta-capi.php',

  // Google Analytics 4 — Measurement ID (formato "G-XXXXXXXXXX")
  GA_MEASUREMENT_ID: null as string | null,

  // Google Ads — ID da conta (formato "AW-XXXXXXXXX")
  GOOGLE_ADS_ID: null as string | null,

  // Google Ads — labels de conversão (formato "AbCdEfGhIjKlMnOp")
  GOOGLE_ADS_LEAD_CONVERSION_LABEL: null as string | null,
  GOOGLE_ADS_CONTACT_CONVERSION_LABEL: null as string | null,
}
