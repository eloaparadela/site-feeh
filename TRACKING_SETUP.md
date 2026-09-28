# Tracking — Prosat

Documentação da estrutura de tracking do site: Meta Pixel + Meta Conversions API (ativos), atribuição/origem (UTMs, first/last touch, click IDs — ativos), Google Analytics 4 e Google Ads (preparados, aguardando IDs), e eventos avançados de funil (QualifiedLead/Opportunity/Sale — preparados, não disparam sozinhos).

## Visão geral da arquitetura

```
components/tracking/
  MetaPixel.tsx        → injeta o Pixel (base code) uma vez, no <body>
  GoogleTags.tsx        → injeta o gtag.js — só carrega quando GA4/Ads tiverem ID
  TrackingProvider.tsx  → observa navegação (Next Router), dispara PageView
                            e chama captureAttribution() a cada carregamento
  TrackedLink.tsx        → <a> com tracking, para usar em Server Components

lib/
  tracking-config.ts    → ÚNICO lugar com os IDs (Pixel, GA4, Google Ads)
  tracking.ts            → API pública: trackPageView / trackViewContent /
                            trackContact / trackLead / trackQualifiedLead /
                            trackOpportunity / trackSale — é só isso que os
                            componentes do site usam
  meta.ts                → fala com o Meta Pixel (fbq) e a Meta CAPI
  google.ts               → fala com o gtag (GA4 + Google Ads), com early
                            return enquanto não houver ID configurado
  attribution.ts          → captura e persiste UTMs, fbclid/gclid, first
                            touch, last touch e visitor_id (localStorage,
                            sem PII). Usada internamente por tracking.ts —
                            nenhum componente chama isso direto.
  crm.ts                   → tipos + função pura que monta o formato de
                            payload de lead pra um CRM futuro. Não envia
                            nada — não existe endpoint de CRM ainda.

public/api/meta-capi.php → endpoint da Meta Conversions API (PHP, roda na
                            Hostinger). Vira /api/meta-capi.php depois do build.
                            Aceita Lead/Contact/ViewContent (ativos) e já
                            está preparado pra QualifiedLead/Opportunity/Sale
                            (não disparados automaticamente).

hostinger-privado/meta-config.php → Pixel ID + Access Token real. NUNCA vai
                            para public_html nem para o Git (está no
                            .gitignore). É o único lugar com o token.
```

Nenhum componente do site (Header, Footer, formulários, botões) chama `fbq()`,
`gtag()` ou lê `localStorage`/query string diretamente — todos chamam
`trackPageView()`, `trackViewContent()`, `trackContact()` ou `trackLead()` de
`lib/tracking.ts`. Essas funções são quem decide o que mandar pra cada canal
e enriquecem automaticamente os eventos com dados de atribuição.

---

## META — já ativo

### Pixel ID
`1596095051343969`, configurado em `lib/tracking-config.ts`.

### Onde o token fica
O token de acesso da Meta Conversions API **não está em nenhum arquivo do
Next.js** (nunca vai pro HTML, JS ou bundle do navegador). Ele mora só em
`hostinger-privado/meta-config.php`, um arquivo local que:

- **não é commitado** (está no `.gitignore`)
- **não faz parte do build** (fica fora da pasta `public/`, então o
  `next build` nunca copia ele pro `out/`)
- precisa ser **enviado manualmente** pra Hostinger, pra uma pasta **fora**
  da `public_html`

### Onde colocar o token real na Hostinger

A estrutura de pastas do seu usuário na Hostinger (baseado no que vimos no
Gerenciador de Arquivos) é algo como:

```
/home/u761134531/
  public_html/          ← aqui vai o conteúdo do build (out/)
    api/
      meta-capi.php      ← já incluso no build, não precisa criar
    index.html
    _next/
    ...
  private/                ← VOCÊ CRIA esta pasta, um nível ACIMA de public_html
    meta-config.php        ← sobe o hostinger-privado/meta-config.php pra cá
```

**Passo a passo:**
1. No Gerenciador de Arquivos da Hostinger, vá para a raiz da sua conta
   (clique em "Home" ou suba um nível a partir de `public_html`).
2. Crie uma pasta chamada `private`.
3. Dentro dela, envie o arquivo `hostinger-privado/meta-config.php` do seu
   projeto local — ele **já está com o token de produção real** (confirmado
   em 2026-09-27), não precisa editar nada antes de subir.
4. Confirme que a pasta `private` **não** está dentro de `public_html` —
   ela tem que ficar irmã dela, não filha.

Se a estrutura de pastas da sua conta Hostinger for diferente (caminho do
`private` não é `../../private/` a partir de `public_html/api/`), ajuste a
linha `$configPath` no topo de `public/api/meta-capi.php` (e gere um novo
build) para apontar pro lugar certo.

### Enquanto o meta-config.php não estiver na Hostinger
Até você enviar `hostinger-privado/meta-config.php` pra pasta `private/` na
Hostinger, a Meta CAPI (lado servidor) vai falhar silenciosamente (o
`meta-capi.php` retorna erro, mas isso **nunca afeta o site** — formulários
continuam funcionando normalmente). O **Pixel no navegador já funciona
100% desde já**, independente da CAPI.

---

## Eventos Meta ativos

| Evento | Quando dispara |
|---|---|
| `PageView` | Toda visita/troca de página |
| `ViewContent` | Visita às 4 páginas `/instalacao/[veículo]` |
| `Contact` | Clique em WhatsApp, botão de Orçamento, "Fale conosco", "Veja planos" etc. |
| `Lead` | Formulário enviado **com sucesso** (resposta OK da API de leads) |

`Lead` nunca dispara em clique de botão, abertura de modal, ou erro de envio
— só depois que `submitLead()` (em `lib/leads.ts`) retorna sucesso.

## Deduplicação Browser + Server (event_id)

Em `trackLead()` (e também `trackContact()`/`trackViewContent()`), um
`event_id` único é gerado com `crypto.randomUUID()` e usado nas duas
chamadas:

```ts
// lib/tracking.ts
const eventId = newEventId()
metaLead(eventId, params)              // navegador — fbq(..., {eventID: eventId})
sendMetaCapiEvent({ event_id: eventId, ... })  // servidor — mesmo event_id
```

A Meta usa esse `event_id` repetido para entender que é o mesmo evento
capturado por dois caminhos, e conta só uma vez.

## Advanced Matching (Lead)

Quando disponíveis no formulário, `email`, `phone` e `first_name` são
enviados na CAPI com hash SHA-256 (exigido pela Meta). `client_ip_address`,
`client_user_agent`, `fbp` e `fbc` são enviados sem hash (a Meta não
permite/exige hash neles). `subject` e `message` dos formulários **nunca**
são enviados pra Meta.

---

## GOOGLE — preparado, ainda inativo

**Não inventamos nenhum ID.** Enquanto os campos abaixo estiverem `null` em
`lib/tracking-config.ts`, nada do Google é carregado — sem script, sem
cookie, sem chamada de rede, sem erro no console.

```ts
GA_MEASUREMENT_ID: null,                       // GA4 — formato "G-XXXXXXXXXX"
GOOGLE_ADS_ID: null,                            // formato "AW-XXXXXXXXX"
GOOGLE_ADS_LEAD_CONVERSION_LABEL: null,
GOOGLE_ADS_CONTACT_CONVERSION_LABEL: null,
```

### Quando você tiver os IDs
1. Abra `lib/tracking-config.ts`
2. Troque os `null` pelos valores reais
3. Rode `npm run build` de novo e suba o novo `out/` na Hostinger

Nenhum outro arquivo precisa mudar. `trackPageView`, `trackViewContent`,
`trackContact` e `trackLead` já chamam as funções do Google automaticamente
— elas só ficam "desligadas" até os IDs existirem.

| Evento Meta | Evento GA4 futuro | Conversão Google Ads futura |
|---|---|---|
| PageView | `page_view` | — |
| ViewContent | `view_item` | — |
| Contact | `contact` | Contact (se label configurado) |
| Lead | `generate_lead` | Lead (conversão principal) |

**PII (nome, e-mail, telefone) nunca é enviada ao GA4** — nem quando
configurado.

---

## Banner de cookies e consentimento — ATIVO

O site tem um mini banner de aviso de cookies (`components/tracking/CookieConsent.tsx`,
aparece uma vez, fixo no rodapé da tela) com dois botões: **Aceitar** e
**Recusar**. A decisão fica salva em `localStorage` (`lib/consent.ts`,
chave `prosat_cookie_consent`) e **trava de verdade**, não é só um aviso
decorativo:

- Enquanto não houver "Aceitar": `MetaPixel.tsx` e `GoogleTags.tsx` não
  renderizam nenhum `<script>` — nenhum cookie (`_fbp`/`_fbc`) é criado,
  nenhuma chamada à Meta/Google acontece.
- `lib/meta.ts` e `lib/google.ts` checam `hasMarketingConsent()` em toda
  função antes de disparar qualquer evento (navegador ou CAPI/servidor).
- `lib/attribution.ts` (`captureAttribution()` e `getVisitorId()`) só
  grava UTMs/first-touch/last-touch/visitor_id no `localStorage` depois
  do aceite — antes disso, nada é persistido.
- Clicar em "Aceitar" recarrega a página, pra já iniciar a mensuração
  naquela mesma visita. "Recusar" só fecha o banner, sem recarregar.
- A página `/privacidade` tem um link **"Gerenciar minhas preferências de
  cookies"** que limpa a decisão salva e reabre o banner.

**O que continua funcionando mesmo com "Recusar":** o envio dos
formulários em si (`submitLead()` → Supabase) — isso é a função essencial
do site, não depende de mensuração/marketing, e não passa por nenhum
desses gates.

### Consent Mode do Google (futuro)

Quando GA4/Google Ads forem ativados, o gate acima já cobre o
carregamento do `gtag.js`. Se quiser também implementar o **Google
Consent Mode v2** formal (sinalizar `analytics_storage`, `ad_storage`,
`ad_user_data`, `ad_personalization` explicitamente pro Google, em vez de
só não carregar o script), `GoogleTags.tsx` é o lugar certo pra adicionar
`gtag('consent', 'default'/'update', {...})` — a estrutura de único
carregamento do `gtag.js` já está pronta pra isso.

---

## ATRIBUIÇÃO, ORIGEM E QUALIDADE DE LEAD

Tudo nesta seção é implementado em `lib/attribution.ts` e usado
automaticamente por `trackContact()` e `trackLead()` — nenhum componente do
site precisa passar UTM, click ID ou touch manualmente.

### Captura de UTMs e click IDs

A cada carregamento de página (`TrackingProvider` chama
`captureAttribution()`), o site lê a query string atual procurando por:

```
utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, gclid
```

Se **nenhum** desses parâmetros estiver presente (navegação interna do site,
ou visita direta), nada é sobrescrito — a origem capturada anteriormente
continua valendo. Se **algum** estiver presente, é tratado como uma "origem
identificada" e dispara a lógica de first/last touch abaixo.

### First touch e last touch

- **first_touch**: gravado **só na primeira vez** que uma origem
  identificada aparece (primeira visita com UTM/fbclid/gclid). Depois
  disso, **nunca é sobrescrito** — mesmo que a pessoa volte semanas depois
  por outra campanha.
- **last_touch**: atualizado **toda vez** que uma nova origem identificada
  aparece. Uma visita direta (sem parâmetros) não mexe nele.
- Cada touch guarda: `source, medium, campaign, content, term,
  landing_page, timestamp`.
- Persistidos em `localStorage` (`prosat_first_touch`, `prosat_last_touch`),
  sobrevivem entre páginas e entre sessões (não expiram sozinhos hoje —
  se quiser um prazo de expiração no futuro, é um ajuste pontual em
  `lib/attribution.ts`).

### Click IDs (fbclid / gclid)

Guardados separadamente (`prosat_click_ids`), atualizados sempre que um novo
valor aparece na URL, preservando o anterior quando não aparece um novo. A
arquitetura (`ClickIds` interface) já está pronta para adicionar outros
identificadores de mídia no futuro (ex: `ttclid` do TikTok) sem mudar nada
fora de `lib/attribution.ts`.

Importante: isso é **separado** dos cookies `_fbp`/`_fbc` que o próprio
Meta Pixel já gerencia sozinho no navegador (esses continuam funcionando
exatamente como antes, sem relação com este `fbclid` persistido).

### visitor_id (identificador anônimo)

Gerado uma única vez por navegador (`crypto.randomUUID()`), guardado em
`localStorage` (`prosat_visitor_id`) e reutilizado para sempre. Não é
derivado de nenhum dado pessoal. É enviado à Meta CAPI como `external_id`
(hasheado em SHA-256 no PHP, igual email/telefone) para melhorar o Event
Match Quality, e é o campo que conecta um Lead a um futuro
QualifiedLead/Opportunity/Sale do mesmo visitante.

### O que o Contact (WhatsApp e Orçamento) ganhou

Todo `trackContact()` — WhatsApp, telefone ou orçamento — agora carrega
automaticamente, quando disponíveis:

```
utm_source, utm_medium, utm_campaign, utm_content, utm_term,
first_touch_source, last_touch_source, landing_page
```

Mais os campos que já existiam (`contact_method`, `cta_name`,
`cta_location`, `page_path`) e, opcionalmente, `service_name` e
`vehicle_type` quando o componente sabe o veículo/serviço (hoje: cards de
plano e páginas `/instalacao/*`).

**Continua não indo pro Contact:** nome, telefone, e-mail, mensagem — nada
disso muda.

### O que o Lead ganhou

Além do que já existia (Pixel + CAPI com o mesmo `event_id`, dedup
automática), todo `trackLead()` agora inclui:

```
service_name, vehicle_type, lead_id, conversion_page, landing_page,
utm_source, utm_medium, utm_campaign,
first_touch_source, first_touch_medium, first_touch_campaign,
last_touch_source, last_touch_medium, last_touch_campaign,
fbclid, gclid, referrer
```

E no `user_data` enviado à CAPI: `external_id` (visitor_id hasheado), além
de email/telefone/nome que já existiam (hasheados como antes).

`trackLead()` agora retorna `{ eventId, leadId }` em vez de só uma string —
`eventId` continua sendo o identificador de deduplicação Meta;
`leadId` é o novo identificador interno (independente do Meta) pra ligar
esse Lead a um QualifiedLead/Opportunity/Sale ou a um CRM no futuro.

### Contexto comercial (service_name / vehicle_type)

`vehicle_type` só é preenchido quando a página/componente sabe o veículo
com certeza — nunca é adivinhado. Hoje isso acontece em: cards de plano
(`PricingCard`), páginas `/instalacao/[veículo]` e no formulário de
Orçamento (`QuoteModal`, que herda o plano selecionado). A normalização
(`lib/attribution.ts → normalizeVehicleType()`) mapeia os 4 nomes de
exibição para slugs estáveis:

| Exibição | vehicle_type |
|---|---|
| Carro Leve | `carro` |
| Moto | `moto` |
| Caminhão | `caminhao` |
| Utilitário | `utilitario` |

### Eventos de funil avançado (preparados, NÃO ativos)

`trackQualifiedLead()`, `trackOpportunity()` e `trackSale()` existem em
`lib/tracking.ts` e funcionam corretamente se chamados — mas **nenhum
componente do site os chama hoje**. Todos os três:

- disparam evento **custom** na Meta (`trackCustom`, não `track` — porque
  não são nomes de evento padrão da Meta);
- mandam pra CAPI também, com o mesmo padrão de `event_id`;
- recebem `lead_id` como parâmetro obrigatório, pra ligar ao Lead original;
- o endpoint PHP (`meta-capi.php`) já aceita os 3 nomes na allowlist (sem
  afrouxar validação/sanitização — é a mesma regra pra todos os eventos).

Quando existir um fluxo real pra chamá-los (painel interno, automação,
integração de CRM), é só chamar `trackQualifiedLead({ lead_id, ... })` /
`trackOpportunity(...)` / `trackSale(...)` de onde fizer sentido.

### CRM (preparado, sem integração)

`lib/crm.ts` define o formato (`CrmLeadPayload`) e uma função pura
(`buildCrmLeadPayload()`) que monta esse objeto com tudo que um CRM
provavelmente vai pedir: `lead_id`, `visitor_id`, dados de contato,
`first_touch`/`last_touch` completos, UTMs, `fbclid`/`gclid`,
`landing_page`, `conversion_page`, `created_at`. Não existe nenhum envio de
rede — quando houver um CRM real, o ponto de entrada é essa função, e o
envio deve passar por um endpoint PHP próprio (mesma lógica de segurança do
`meta-capi.php`: nenhuma credencial de CRM no navegador).

### Google Ads futuro (Enhanced/Offline Conversions)

Quando o Google Ads for ativado, os dados que o Enhanced Conversions for
Leads e o Offline Conversions Import precisam **já estão disponíveis**:
`gclid`, `lead_id`, `first_touch`, `last_touch` — tudo passa por
`trackLead()` e fica acessível em `getAttributionSnapshot()`. Não foi
implementada nenhuma chamada real a essas APIs do Google ainda (nem
poderia — não temos os IDs).

### Privacidade — o que fica no navegador

**Vai para `localStorage`:** `visitor_id` (uuid aleatório), `first_touch`/
`last_touch` (source/medium/campaign/content/term/landing_page/timestamp —
nada disso é pessoal), `fbclid`/`gclid` (identificadores de clique de
anúncio).

**Nunca vai para `localStorage` nem para nenhum cookie próprio:** nome,
e-mail, telefone, mensagem. Esses dados só existem em memória, no momento
do envio do formulário, e vão hasheados (email/telefone/nome) direto pra
Meta CAPI — nunca ficam salvos no navegador do visitante.

---

## Como testar

### 1. Pixel no navegador
- Instale a extensão **Meta Pixel Helper** (Chrome)
- Abra o site — deve mostrar o Pixel `1596095051343969` disparando `PageView`
- Navegue entre páginas (usando os links do menu) — cada troca dispara um
  novo `PageView`
- Clique num WhatsApp/Orçamento — deve mostrar `Contact`
- Envie um formulário com sucesso — deve mostrar `Lead`

> **Nota sobre o ambiente de desenvolvimento (`npm run dev`):** o projeto usa
> `React.StrictMode`, que roda os efeitos de montagem **duas vezes** só em
> desenvolvimento (é comportamento esperado do React, não um bug). Isso pode
> fazer o `ViewContent` das páginas de instalação aparecer duplicado no Pixel
> Helper durante `npm run dev`. **Isso não acontece no site publicado**
> (build de produção).

### 2. Test Events (Meta Events Manager)
- Gerenciador de Eventos → seu Pixel → **Testar eventos**
- Copie o "Test Event Code" da tela e adicione temporariamente no payload
  do `sendMetaCapiEvent` (em `lib/meta.ts`) — ou teste direto pelo Pixel
  Helper, que já aparece ali sem precisar de código de teste
- Dispare os eventos no site e confira se aparecem na lista em tempo real

### 3. Browser + Server (deduplicação)
Na aba **Testar eventos**, envie um `Lead` pelo site (formulário) e observe:
- Duas entradas devem aparecer com o **mesmo Event ID**: uma com origem
  "Navegador" (Pixel) e outra "Servidor" (CAPI)
- A Meta deve marcar como **"Deduplicado"**

Se só a entrada do navegador aparecer (sem a do servidor), o motivo mais
provável é o token/config ainda não estar configurado na Hostinger (veja
seção acima) — o site continua funcionando normalmente mesmo assim, só a
CAPI que fica muda.

### 4. Event Match Quality
Gerenciador de Eventos → seu Pixel → **Qualidade da correspondência de
eventos**. Melhora conforme mais Leads reais forem enviados com
email/telefone preenchidos (o formulário de Orçamento e o de Contato pedem
os dois; o pop-up de saída e o de parceiro têm campos opcionais).

### 5. GA4 / Google Ads (quando configurados)
- GA4: **Relatórios → Tempo real** ou **DebugView** (com a extensão
  Google Analytics Debugger)
- Google Ads: **Ferramentas → Conversões** → "Diagnóstico de tags"

### 6. Atribuição (UTMs, first/last touch)
- Abra o site com parâmetros de teste, ex:
  `https://prosatmonitoramento.com/?utm_source=teste&utm_medium=cpc&utm_campaign=teste-atribuicao`
- No DevTools → Application → Local Storage, confira `prosat_first_touch`
  e `prosat_last_touch` — ambos devem ter `source: "teste"`, `medium: "cpc"` etc.
- Navegue pra outra página do site (sem UTM na URL) e confirme que os dois
  campos **continuam iguais** (não foram sobrescritos por uma navegação
  "direta" interna)
- Envie um Lead nesse estado e confira no evento de teste da Meta (aba
  "Testar eventos") se `first_touch_source`/`last_touch_source` aparecem
  no `custom_data` do evento

---

## Build e deploy

O processo de build/deploy **não muda** com o tracking:

```bash
npm run build
```

Gera a pasta `out/`, que já inclui `out/api/meta-capi.php` automaticamente
(porque ele vive em `public/api/meta-capi.php` no código-fonte, e tudo que
está em `public/` é copiado pro `out/` na raiz).

**O que sobe pra Hostinger (`public_html`):** todo o conteúdo de `out/`,
igual já era antes — incluindo agora a pasta `api/` com o `meta-capi.php`.

**O que NÃO sobe pra `public_html`:** o arquivo `hostinger-privado/meta-config.php`
— esse vai pra uma pasta `private/` **fora** da `public_html` (ver seção
"Onde colocar o token real" acima). É o único arquivo extra do processo.

---

## Checklist de ativação

- [x] Meta Pixel instalado e disparando PageView
- [x] Eventos Contact e Lead instrumentados em todos os CTAs comerciais
- [x] Deduplicação Browser + Server implementada (event_id)
- [x] Endpoint PHP da Conversions API criado e no build
- [x] Token de produção real confirmado em `hostinger-privado/meta-config.php`
- [ ] `hostinger-privado/meta-config.php` enviado pra `private/` na Hostinger
      (até isso ser feito, a CAPI fica muda — o resto do site funciona normal)
- [ ] GA_MEASUREMENT_ID preenchido em `lib/tracking-config.ts` (quando tiver)
- [ ] GOOGLE_ADS_ID + labels preenchidos em `lib/tracking-config.ts` (quando tiver)

---

## Mapa completo de CTAs e eventos por página

| Página | Elemento / CTA | Evento Meta | GA4 futuro | Google Ads futuro |
|---|---|---|---|---|
| Todas | Qualquer visita de página | PageView | page_view | — |
| Home (Hero) | Botão "Cotação Online" / "Ver Planos" (desktop + mobile) | Contact | contact | Contact |
| Home (Hero) | Botão WhatsApp de Vendas (desktop + mobile) | Contact | contact | Contact |
| Home (Hero) | "Saiba Mais" / "Soluções para Frotas" | — (navegação informativa) | — | — |
| Home (Aplicativo) | Selos App Store / Google Play | — (não clicáveis) | — | — |
| Home (Prosat para você) | "Fale conosco" (WhatsApp) | Contact | contact | Contact |
| Home (Prosat para você) | "Veja planos" | Contact | contact | Contact |
| Home (Frotas) | "Fale conosco" (WhatsApp) | Contact | contact | Contact |
| Home (Frotas) | "Veja planos" | Contact | contact | Contact |
| Home (Planos) | Card de plano → "Contrate Online" (abre modal) | Contact | contact | Contact |
| Home (Planos) | Card de plano → "WhatsApp de Vendas" | Contact | contact | Contact |
| Home (Planos) | Card de plano → "Saiba Mais" | — (navegação) | — | — |
| Home (Planos) | Modal de Orçamento enviado com sucesso | **Lead** (+ CAPI) | generate_lead | **Lead** |
| Home | Pop-up de saída enviado com sucesso | **Lead** (+ CAPI) | generate_lead | **Lead** |
| Header (todas as páginas) | Botão "Orçamento" | Contact | contact | Contact |
| Header (todas as páginas) | Ícone WhatsApp | Contact | contact | Contact |
| Header (todas as páginas) | Ícone Instagram | — | — | — |
| Menu mobile | "Orçamento" | Contact | contact | Contact |
| Menu mobile | "WhatsApp de Vendas" | Contact | contact | Contact |
| Menu mobile | Ícone WhatsApp (redes sociais) | Contact | contact | Contact |
| Rodapé (todas as páginas) | "Falar no WhatsApp" | Contact | contact | Contact |
| Rodapé (todas as páginas) | Ícone WhatsApp (redes sociais) | Contact | contact | Contact |
| /instalacao/caminhao | Visita à página | **ViewContent** | view_item | — |
| /instalacao/caminhao | "Ver planos e preços" | Contact | contact | Contact |
| /instalacao/caminhao | "Fale no WhatsApp" | Contact | contact | Contact |
| /instalacao/caminhao | CTA final "Ver planos — a partir de R$X" | Contact | contact | Contact |
| /instalacao/utilitario | (mesmos 4 acima) | ViewContent + Contact ×3 | view_item + contact | Contact |
| /instalacao/carro-leve | (mesmos 4 acima) | ViewContent + Contact ×3 | view_item + contact | Contact |
| /instalacao/moto | (mesmos 4 acima) | ViewContent + Contact ×3 | view_item + contact | Contact |
| /contato | "Falar pelo WhatsApp" | Contact | contact | Contact |
| /contato | Formulário enviado com sucesso | **Lead** (+ CAPI) | generate_lead | **Lead** |
| /como-podemos-ajudar | Cards de solução → "Ver plano" / "Ver soluções" | — (navegação pras páginas de serviço) | — | — |
| /como-podemos-ajudar | CTA final "Ver Planos e Preços" | Contact | contact | Contact |
| /como-podemos-ajudar | CTA final "Falar no WhatsApp" | Contact | contact | Contact |
| /o-grupo-tracker | Botão hero "Conheça nosso rastreamento" | Contact | contact | Contact |
| /o-grupo-tracker | CTA final "Solicitar orçamento" | Contact | contact | Contact |
| /seja-parceiro | "Falar pelo WhatsApp" | Contact | contact | Contact |
| /seja-parceiro | Formulário enviado com sucesso | **Lead** (+ CAPI) | generate_lead | **Lead** |

**Observação:** não existem links `tel:` no site hoje (só campos de
formulário `type="tel"`, que não são links clicáveis). Se um link de
telefone for adicionado no futuro, use `trackContact({ contact_method:
'phone', cta_name: '...' })` no `onClick`, igual aos demais.
