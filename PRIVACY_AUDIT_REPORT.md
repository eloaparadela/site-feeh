# Relatório de Auditoria de Privacidade — Prosat

Relatório técnico que sustenta o texto publicado em `/privacidade`. Feito a
partir de leitura direta do código do projeto (não é um checklist genérico).
Serve para a Prosat (e/ou o time jurídico da empresa) decidir o que precisa
ser preenchido, corrigido ou implementado antes de considerar o site
formalmente conforme à LGPD.

Data da auditoria: 27 de setembro de 2026.

---

## 1. Dados que o site realmente coleta

### Via formulário (fornecidos pelo usuário)

| Formulário | Rota/local | Campos |
|---|---|---|
| Contato | `/contato` | nome, telefone, e-mail, assunto, mensagem |
| Orçamento | Modal "Contrate Online" (home, `/#orcamento`) | nome, tipo de veículo, modelo, ano, **placa do veículo**, telefone, e-mail, estado |
| Pop-up de saída | Aparece ao mover o mouse pra fora da janela (desktop) | tipo de uso, nome, e-mail, telefone, quantidade de veículos |
| Seja Parceiro | `/seja-parceiro` | nome, empresa, telefone, cidade/estado, mensagem |

Nenhum dos 4 formulários coleta CPF, dados bancários ou dados sensíveis
(saúde, biometria, orientação etc.) — só dados de contato e do veículo.

### Automaticamente (navegação/técnicos)

- IP e user agent (capturados apenas no momento de um evento Contact/Lead, no servidor, para repassar à Meta — não gravados em banco próprio)
- Páginas visitadas, landing page, página de conversão
- Cliques em CTAs comerciais (WhatsApp, orçamento) com identificador do botão
- UTMs (`utm_source/medium/campaign/content/term`), `fbclid`, `gclid`
- Um identificador anônimo de visitante (`visitor_id`, gerado no navegador)
- Primeira e última origem de campanha identificada (first touch / last touch)

---

## 2. Cookies e localStorage encontrados

| Nome | Onde | Definido por | Categoria |
|---|---|---|---|
| `_fbp` | Cookie | Script do Meta Pixel (`fbevents.js`) | Publicidade/marketing |
| `_fbc` | Cookie | Script do Meta Pixel (só quando há `fbclid` na URL) | Publicidade/marketing |
| `prosat_visitor_id` | localStorage | Código próprio (`lib/attribution.ts`) | Mensuração |
| `prosat_first_touch` | localStorage | Código próprio | Mensuração/atribuição |
| `prosat_last_touch` | localStorage | Código próprio | Mensuração/atribuição |
| `prosat_click_ids` | localStorage | Código próprio | Mensuração/atribuição |
| `prosat-theme` | localStorage | Código próprio (`ThemeProvider.tsx`) | Essencial/funcional (não é dado pessoal) |

**Não existem cookies de terceiros além dos dois da Meta.** O site não
grava nenhum cookie próprio (`document.cookie`) — só lê `_fbp`/`_fbc` pra
reenviar à Meta CAPI.

---

## 3. Terceiros que recebem dados

| Terceiro | O que recebe | Finalidade |
|---|---|---|
| **Meta Platforms, Inc.** | Dados de navegação, IP, user agent, cookies `_fbp`/`_fbc`, e-mail/telefone/nome hasheados (só quando há lead) | Mensuração e otimização de campanhas de anúncio |
| **Supabase** (`vrgdodtixssqqpdpwnys.supabase.co`) | Nome, e-mail, telefone e todos os campos específicos de cada formulário (modelo, placa, empresa, mensagem etc.) | Armazenamento do lead (tabela `prosat.leads`) + disparo de e-mail de notificação à equipe |
| **Hostinger** | Todo o tráfego do site (é quem hospeda); processa o endereço IP/user agent no momento em que o endpoint PHP repassa dados à Meta | Hospedagem/infraestrutura |
| **WhatsApp / Meta** | Nada enviado pelo site em si — o usuário é levado à conversa no WhatsApp e decide o que enviar por conta própria | Canal de atendimento comercial |

⚠️ **Ponto de atenção:** o Supabase é o terceiro que recebe o **maior volume
de dados pessoais identificáveis** (é para lá que vai o conteúdo completo
de todo formulário) e não havia sido mencionado em nenhuma documentação
anterior do projeto até esta auditoria. Vale confirmar formalmente com a
Prosat se existe um contrato de operador de dados (DPA) com esse provedor,
e em qual região os dados ficam armazenados.

---

## 4. Finalidades identificadas

Responder contato · elaborar orçamento · dar andamento a negociação ·
avaliar parceria comercial · medir desempenho de campanha Meta Ads ·
atribuição de origem de contatos/leads.

Não identifiquei no código nenhuma finalidade de: newsletter, e-mail
marketing recorrente, venda/cessão de dados a terceiros, ou perfilamento
automatizado com efeitos jurídicos sobre o usuário.

---

## 5. Bases legais que precisam de validação

Nenhuma base legal foi "escolhida" nesta auditoria — só sugeridas hipóteses
(tabela completa na seção 6 da política publicada). As que mais precisam de
decisão formal da empresa:

- **Contato/orçamento/parceria**: procedimento pré-contratual é o mais
  provável, mas depende de confirmar se todo contato tem intenção comercial
  real ou se parte é só dúvida/curiosidade (o que mudaria a base pra
  legítimo interesse).
- **Meta Pixel/CAPI e atribuição**: base de **consentimento explícito**
  (opt-in), já implementada via banner de cookies — ver item 10 abaixo.
  Continua precisando de validação jurídica formal sobre o texto exato do
  banner e se essa é mesmo a base legal mais adequada.

---

## 6. Prazos de retenção indefinidos

Não existe, em nenhum lugar do projeto (código, Supabase, documentação),
um prazo definido de quanto tempo os leads ficam armazenados. Também não
existe expiração automática para os dados de atribuição salvos no
navegador (`localStorage`). **Recomendação:** a Prosat deve definir esses
prazos formalmente — a política publicada usa linguagem genérica de
"tempo necessário para a finalidade" até essa definição existir.

---

## 7. Canal LGPD

**Não existe** um e-mail ou canal formal para solicitações de titulares de
dados hoje. A política publicada deixa marcado como
`[E-MAIL PARA EXERCÍCIO DE DIREITOS LGPD A CONFIRMAR]`. Recomendação:
criar um e-mail dedicado (ex: `privacidade@dominio-da-empresa`).

---

## 8. Encarregado (DPO)

**Não existe** nenhuma menção a um encarregado de dados em nenhum lugar do
projeto. Marcado como `[ENCARREGADO / CANAL DE PRIVACIDADE A CONFIRMAR]`
na política. A empresa precisa avaliar se se enquadra como agente de
tratamento de pequeno porte e quais regras se aplicam nesse caso — isso
não foi presumido nesta auditoria.

---

## 9. Necessidade de banner/CMP de cookies — ✅ RESOLVIDO

Era necessário, e agora está implementado. O site tem um banner de aviso
de cookies (`components/tracking/CookieConsent.tsx`) com "Aceitar" e
"Recusar", com decisão salva em `localStorage` (`lib/consent.ts`). Antes
do aceite explícito, nem o script do Meta Pixel nem o do Google
(`MetaPixel.tsx`/`GoogleTags.tsx`) são inseridos no DOM — ou seja, os
cookies `_fbp`/`_fbc` não chegam a ser criados, e nenhuma chamada de
mensuração acontece. Detalhes técnicos completos em `TRACKING_SETUP.md`,
seção "Banner de cookies e consentimento".

A empresa ainda deve validar formalmente com assessoria jurídica se o
texto do banner e a base legal adotada (consentimento explícito, opt-in)
atendem à expectativa da LGPD/ANPD pro contexto específico do negócio —
esta auditoria implementou o mecanismo técnico, não substitui essa
validação.

---

## 10. Meta Pixel/CAPI disparando antes de consentimento — ✅ RESOLVIDO

Este era o item mais crítico do relatório anterior. Hoje o Pixel, a CAPI
e a captura de atribuição (UTMs/first-touch/last-touch/visitor_id) só
rodam depois que o visitante aceita o banner descrito no item 9 — antes
disso, nada é carregado, disparado ou persistido no navegador. O envio
dos formulários (Supabase) continua funcionando normalmente mesmo com
"Recusar", porque é a função essencial do site e não depende de
mensuração/marketing.

---

## 11. Outros riscos/inconsistências observados

- **GitHub Pages ainda ativo em paralelo**: o projeto também está publicado em `https://eloaparadela.github.io/site-feeh/` (deploy automático via GitHub Actions), além do domínio principal `prosatmonitoramento.com` na Hostinger. Se esse espelho não for uma cópia intencional (ex: ambiente de teste), ele está coletando os mesmos dados (Meta Pixel, formulários) sob uma URL não mencionada na política. Vale decidir se ele continua no ar, fica restrito, ou é mencionado explicitamente.
- **Evento automático `SubscribedButtonClick`**: identificado anteriormente (fora desta tarefa) como um evento automático gerado pelo próprio Meta Pixel (Automatic Events), não por código nosso. Não é um problema de privacidade em si, mas mostra que a Meta pode capturar interações no site por conta própria, além do que este projeto dispara explicitamente — vale saber disso ao avaliar o escopo real de dados que a Meta recebe.
- **Placa do veículo** é coletada no formulário de Orçamento — é um dado que pode ser considerado identificador em determinados contextos (associado a um veículo/pessoa). Não é tratado como dado sensível pela LGPD, mas merece atenção no inventário de dados da empresa.

---

## 12. Campos que precisam ser preenchidos manualmente antes de publicar

Em `app/privacidade/content.ts`, procure por `[..A CONFIRMAR]`:

1. Razão social
2. CNPJ
3. Endereço do controlador
4. E-mail de privacidade / contato LGPD (usado 3x na página — sempre o mesmo valor)
5. Encarregado de dados (DPO) ou canal equivalente
6. Prazo de retenção dos dados de leads (hoje a política usa linguagem genérica — vale a empresa definir um critério formal, mesmo que não vire um número fixo na página)

A seção de transferência internacional e a menção nominal a fornecedores
específicos (Meta, Supabase, Hostinger) foram removidas da página a
pedido — a seção 10 (Compartilhamento) descreve por categoria
("ferramentas de análise e publicidade", "prestadores de tecnologia",
"provedor de hospedagem"), sem nomear empresas. Isso significa que a
página em si não expõe mais o nome desses fornecedores — mas continuam
sendo os mesmos de antes (ver seção 3 deste relatório), e a Prosat deve
estar preparada para informá-los caso um titular solicite esse detalhe
(direito de acesso, seção 13 da política).

Depois de preencher os campos acima, é só rodar `npm run build` de novo —
não precisa mexer em mais nada.
