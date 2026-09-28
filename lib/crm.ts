// ─────────────────────────────────────────────
// CRM — estrutura preparada, SEM integração ativa
// ─────────────────────────────────────────────
// Não existe nenhum endpoint de CRM configurado ainda. Este arquivo só
// define o FORMATO que um payload de lead teria e uma função pura que
// monta esse objeto — nada aqui faz requisição de rede.
//
// Quando houver um CRM real pra integrar, o ponto de entrada é
// `buildCrmLeadPayload()`: ela já recebe tudo que o CRM provavelmente
// vai precisar (dados de contato + atribuição completa + IDs internos),
// então o único trabalho nessa hora é escrever a chamada HTTP de envio
// (ex: dentro de lib/crm.ts, uma função `sendLeadToCrm(payload)`).

import type { AttributionSnapshot } from './attribution'

export interface CrmTouch {
  source: string | null
  medium: string | null
  campaign: string | null
  content: string | null
  term: string | null
  landing_page: string | null
  timestamp: number | null
}

export interface CrmLeadPayload {
  /** Igual ao leadId retornado por trackLead() — liga esse registro ao evento de tracking. */
  lead_id: string
  /** visitor_id anônimo (lib/attribution.ts) — mesmo valor enviado como external_id pra Meta. */
  visitor_id: string

  name?: string
  phone?: string
  email?: string

  service_name?: string
  vehicle_type?: string

  first_touch: CrmTouch
  last_touch: CrmTouch

  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null

  fbclid: string | null
  gclid: string | null

  landing_page: string | null
  conversion_page: string

  /** ISO 8601 */
  created_at: string
}

export interface BuildCrmLeadPayloadInput {
  leadId: string
  visitorId: string
  attribution: AttributionSnapshot
  conversionPage: string
  name?: string
  phone?: string
  email?: string
  serviceName?: string
  vehicleType?: string
}

/**
 * Monta o payload no formato que um CRM futuro provavelmente vai
 * pedir. Pura função — não envia nada, não persiste nada. Quando
 * existir um endpoint de CRM de verdade, chame isso e envie o
 * resultado pra lá (de preferência também via um endpoint PHP próprio,
 * pelo mesmo motivo do meta-capi.php: nenhuma credencial de CRM deve
 * ir pro navegador).
 */
export function buildCrmLeadPayload(input: BuildCrmLeadPayloadInput): CrmLeadPayload {
  const a = input.attribution
  return {
    lead_id: input.leadId,
    visitor_id: input.visitorId,
    name: input.name,
    phone: input.phone,
    email: input.email,
    service_name: input.serviceName,
    vehicle_type: input.vehicleType,
    first_touch: {
      source: a.first_touch_source,
      medium: a.first_touch_medium,
      campaign: a.first_touch_campaign,
      content: a.first_touch_content,
      term: a.first_touch_term,
      landing_page: a.first_touch_landing_page,
      timestamp: a.first_touch_timestamp,
    },
    last_touch: {
      source: a.last_touch_source,
      medium: a.last_touch_medium,
      campaign: a.last_touch_campaign,
      content: a.last_touch_content,
      term: a.last_touch_term,
      landing_page: a.last_touch_landing_page,
      timestamp: a.last_touch_timestamp,
    },
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
    utm_term: a.utm_term,
    fbclid: a.fbclid,
    gclid: a.gclid,
    landing_page: a.landing_page,
    conversion_page: input.conversionPage,
    created_at: new Date().toISOString(),
  }
}
