'use client'

// ─────────────────────────────────────────────
// CAMADA CENTRALIZADA DE TRACKING — API PÚBLICA
// ─────────────────────────────────────────────
// Os componentes do site SÓ importam daqui (nunca de lib/meta.ts,
// lib/google.ts ou lib/attribution.ts diretamente, e nunca chamam
// fbq()/gtag() direto).
//
// ATIVOS HOJE:
//   trackPageView()    → visita de página
//   trackViewContent() → visita a página de produto/serviço relevante
//   trackContact()     → clique em WhatsApp / telefone / CTA de orçamento
//   trackLead()        → formulário enviado com sucesso
//
// PREPARADOS PRA FUTURO — existem e funcionam se chamados, mas NADA no
// site chama automaticamente ainda (ver TRACKING_SETUP.md):
//   trackQualifiedLead()
//   trackOpportunity()
//   trackSale()
//
// Cada função decide sozinha quais canais disparar (Meta sempre;
// Google só quando configurado). O componente que chama não precisa
// saber nada sobre pixels, gtag, atribuição ou APIs — só descreve O
// QUE aconteceu.

import { metaPageView, metaViewContent, metaContact, metaLead, metaCustomEvent, sendMetaCapiEvent } from './meta'
import {
  ga4PageView,
  ga4ViewContent,
  ga4Contact,
  ga4Lead,
  ga4CustomEvent,
  googleAdsLeadConversion,
  googleAdsContactConversion,
} from './google'
import { getAttributionSnapshot, getVisitorId } from './attribution'

function currentUrl(): string {
  return typeof window !== 'undefined' ? window.location.href : ''
}

function currentPath(): string | undefined {
  return typeof window !== 'undefined' ? window.location.pathname : undefined
}

function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

/** PageView — disparado automaticamente pelo TrackingProvider a cada navegação. Não chamar manualmente. */
export function trackPageView() {
  metaPageView()
  ga4PageView()
}

export interface ViewContentParams {
  /** Nome do produto/serviço, ex: "Rastreamento de Moto" */
  content_name: string
  /** Categoria, ex: "Rastreamento Veicular" */
  content_category?: string
  /** IDs internos coerentes, se existirem (ex: id do plano) */
  content_ids?: string[]
}

/** Visita a uma página de produto/serviço relevante (ex: /instalacao/moto). */
export function trackViewContent(params: ViewContentParams) {
  metaViewContent(params)
  ga4ViewContent(params)
  void sendMetaCapiEvent({
    event_name: 'ViewContent',
    event_id: newEventId(),
    event_source_url: currentUrl(),
    custom_data: { ...params },
  })
}

export interface ContactParams {
  /** Como o usuário tentou entrar em contato */
  contact_method: 'whatsapp' | 'phone' | 'quote' | 'button'
  /** Identificador curto do botão/link, ex: "header_orcamento" */
  cta_name: string
  /** Onde na página, ex: "header", "hero", "footer", "pricing_card" */
  cta_location?: string
  /** Nome do serviço relacionado, se aplicável */
  service_name?: string
  /** carro | moto | caminhao | utilitario — só quando a página/componente deixa claro */
  vehicle_type?: string
  /** Preenchido automaticamente com a página atual se não for passado */
  page_path?: string
}

/**
 * Intenção de contato: clique em WhatsApp, telefone ou qualquer CTA
 * comercial (orçamento, "fale conosco" etc). NUNCA chamar isso a
 * partir do sucesso de um formulário — isso é trackLead().
 *
 * Enriquecido automaticamente com UTMs atuais + origem (first/last
 * touch) + landing page — os componentes não precisam saber nada
 * disso, é tudo lido de lib/attribution.ts internamente.
 */
export function trackContact(params: ContactParams) {
  const attribution = getAttributionSnapshot()
  const payload = {
    ...params,
    page_path: params.page_path ?? currentPath(),
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    first_touch_source: attribution.first_touch_source,
    last_touch_source: attribution.last_touch_source,
    landing_page: attribution.landing_page,
  }
  metaContact(payload)
  ga4Contact(payload)
  googleAdsContactConversion()
  void sendMetaCapiEvent({
    event_name: 'Contact',
    event_id: newEventId(),
    event_source_url: currentUrl(),
    custom_data: payload,
  })
}

export interface LeadParams {
  /** Qual formulário, ex: "contato", "orcamento", "popup_saida", "parceiro" */
  form_name: string
  /** Nome do serviço relacionado, se o formulário já souber (ex: plano escolhido) */
  service_name?: string
  /** carro | moto | caminhao | utilitario — só quando houver correspondência clara */
  vehicle_type?: string
  email?: string
  phone?: string
  first_name?: string
}

export interface LeadResult {
  /** ID usado pra deduplicar Pixel + CAPI na Meta (não confundir com lead_id). */
  eventId: string
  /** Identificador interno do lead — pra reconciliar com QualifiedLead/Opportunity/Sale e futura integração com CRM. */
  leadId: string
}

/**
 * Conversão principal: formulário concluído com SUCESSO (resposta ok
 * da API de leads). Nunca chamar em clique de botão, abertura de
 * formulário ou erro de envio.
 *
 * Dispara Lead no Pixel (navegador) e na CAPI (servidor) com o MESMO
 * event_id, para a Meta deduplicar os dois eventos automaticamente.
 * Também carrega atribuição (first/last touch, UTMs, fbclid/gclid,
 * landing/conversion page) e um external_id anônimo (visitor_id) pra
 * melhorar o Event Match Quality — nada disso é PII.
 */
export function trackLead(params: LeadParams): LeadResult {
  const eventId = newEventId()
  const leadId = newEventId()
  const attribution = getAttributionSnapshot()

  const contextParams = {
    form_name: params.form_name,
    service_name: params.service_name,
    vehicle_type: params.vehicle_type,
    lead_id: leadId,
    conversion_page: currentPath(),
    landing_page: attribution.landing_page,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    first_touch_source: attribution.first_touch_source,
    first_touch_medium: attribution.first_touch_medium,
    first_touch_campaign: attribution.first_touch_campaign,
    last_touch_source: attribution.last_touch_source,
    last_touch_medium: attribution.last_touch_medium,
    last_touch_campaign: attribution.last_touch_campaign,
    fbclid: attribution.fbclid,
    gclid: attribution.gclid,
    referrer: attribution.referrer,
  }

  metaLead(eventId, contextParams)
  ga4Lead(contextParams)
  googleAdsLeadConversion()

  void sendMetaCapiEvent({
    event_name: 'Lead',
    event_id: eventId,
    event_source_url: currentUrl(),
    user_data: {
      email: params.email,
      phone: params.phone,
      first_name: params.first_name,
      external_id: attribution.visitor_id,
    },
    custom_data: contextParams,
  })

  return { eventId, leadId }
}

// ─────────────────────────────────────────────
// EVENTOS DE FUNIL AVANÇADO — preparados, NÃO ativos
// ─────────────────────────────────────────────
// Estas 3 funções existem e funcionam corretamente se chamadas, mas
// NENHUM componente do site as chama hoje. Ficam prontas para quando
// houver um fluxo de qualificação/CRM/vendas que precise registrá-las
// (manualmente, por um painel interno, ou por uma futura integração).
//
// Hoje: Lead = formulário enviado com sucesso.
// Futuro:
//   QualifiedLead = lead validado/com potencial real pela equipe comercial
//   Opportunity   = oportunidade comercial/proposta em andamento
//   Sale          = venda concluída
//
// São eventos CUSTOM da Meta (não padrão), por isso usam trackCustom
// via metaCustomEvent() em vez de fbq('track', ...). O endpoint PHP já
// aceita os 3 nomes (ver public/api/meta-capi.php), mas continua tão
// restrito quanto antes — só esses 6 nomes (Lead, Contact, ViewContent,
// QualifiedLead, Opportunity, Sale) passam pela validação.

interface FunnelEventParams {
  /** lead_id retornado por trackLead() — é assim que se liga QualifiedLead/Opportunity/Sale ao Lead original. */
  lead_id: string
  service_name?: string
  vehicle_type?: string
}

export interface QualifiedLeadParams extends FunnelEventParams {}

export interface OpportunityParams extends FunnelEventParams {
  /** Valor estimado da oportunidade, se já houver. Não inventar. */
  value?: number
  currency?: string
}

export interface SaleParams extends FunnelEventParams {
  value?: number
  currency?: string
}

function trackFunnelEvent(eventName: 'QualifiedLead' | 'Opportunity' | 'Sale', params: FunnelEventParams): string {
  const eventId = newEventId()
  metaCustomEvent(eventName, eventId, params)
  ga4CustomEvent(eventName.toLowerCase(), params)
  void sendMetaCapiEvent({
    event_name: eventName,
    event_id: eventId,
    event_source_url: currentUrl(),
    custom_data: params,
  })
  return eventId
}

/** Preparado para uso futuro — hoje não é chamado por nenhum componente. */
export function trackQualifiedLead(params: QualifiedLeadParams): string {
  return trackFunnelEvent('QualifiedLead', params)
}

/** Preparado para uso futuro — hoje não é chamado por nenhum componente. */
export function trackOpportunity(params: OpportunityParams): string {
  return trackFunnelEvent('Opportunity', params)
}

/** Preparado para uso futuro — hoje não é chamado por nenhum componente. */
export function trackSale(params: SaleParams): string {
  return trackFunnelEvent('Sale', params)
}

export { getVisitorId }
