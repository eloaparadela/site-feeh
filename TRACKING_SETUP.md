# Tracking — Prosat

Documentação da estrutura de tracking do site: Meta Pixel + Meta Conversions API (ativos), Google Analytics 4 e Google Ads (preparados, aguardando IDs).

## Visão geral da arquitetura

```
components/tracking/
  MetaPixel.tsx        → injeta o Pixel (base code) uma vez, no <body>
  GoogleTags.tsx        → injeta o gtag.js — só carrega quando GA4/Ads tiverem ID
  TrackingProvider.tsx  → observa navegação (Next Router) e dispara PageView
  TrackedLink.tsx        → <a> com tracking, para usar em Server Components

lib/
  tracking-config.ts    → ÚNICO lugar com os IDs (Pixel, GA4, Google Ads)
  tracking.ts            → API pública: trackPageView / trackViewContent /
                            trackContact / trackLead — é só isso que os
                            componentes do site usam
  meta.ts                → fala com o Meta Pixel (fbq) e a Meta CAPI
  google.ts               → fala com o gtag (GA4 + Google Ads), com early
                            return enquanto não houver ID configurado

public/api/meta-capi.php → endpoint da Meta Conversions API (PHP, roda na
                            Hostinger). Vira /api/meta-capi.php depois do build.

hostinger-privado/meta-config.php → Pixel ID + Access Token real. NUNCA vai
                            para public_html nem para o Git (está no
                            .gitignore). É o único lugar com o token.
```

Nenhum componente do site (Header, Footer, formulários, botões) chama `fbq()`
ou `gtag()` diretamente — todos chamam `trackPageView()`, `trackViewContent()`,
`trackContact()` ou `trackLead()` de `lib/tracking.ts`. Essas 4 funções são
quem decide o que mandar pra cada canal.

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

## Consent Mode (futuro)

Ainda não implementado. Quando for necessário, `GoogleTags.tsx` é o lugar
certo para adicionar `gtag('consent', 'default', {...})` com
`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` —
a estrutura de um único carregamento de `gtag.js` já está pronta pra isso.

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
