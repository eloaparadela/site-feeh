'use client'

// ─────────────────────────────────────────────
// CAMADA CENTRALIZADA DE TRACKING — API PÚBLICA
// ─────────────────────────────────────────────
// Os componentes do site SÓ importam daqui (nunca de lib/meta.ts ou
// lib/google.ts diretamente, e nunca chamam fbq()/gtag() direto).
//
// trackPageView()    → visita de página
// trackViewContent() → visita a página de produto/serviço relevante
// trackContact()     → clique em WhatsApp / telefone / CTA de orçamento
// trackLead()        → formulário enviado com sucesso
//
// Cada função decide sozinha quais canais disparar (Meta sempre;
// Google só quando configurado). O componente que chama não precisa
// saber nada sobre pixels, gtag ou APIs — só descreve O QUE aconteceu.

import { metaPageView, metaViewContent, metaContact, metaLead, sendMetaCapiEvent } from './meta'
import { ga4PageView, ga4ViewContent, ga4Contact, ga4Lead, googleAdsLeadConversion, googleAdsContactConversion } from './google'

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
  /** Preenchido automaticamente com a página atual se não for passado */
  page_path?: string
}

/**
 * Intenção de contato: clique em WhatsApp, telefone ou qualquer CTA
 * comercial (orçamento, "fale conosco" etc). NUNCA chamar isso a
 * partir do sucesso de um formulário — isso é trackLead().
 */
export function trackContact(params: ContactParams) {
  const payload = { ...params, page_path: params.page_path ?? currentPath() }
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
  email?: string
  phone?: string
  first_name?: string
}

/**
 * Conversão principal: formulário concluído com SUCESSO (resposta ok
 * da API de leads). Nunca chamar em clique de botão, abertura de
 * formulário ou erro de envio.
 *
 * Dispara Lead no Pixel (navegador) e na CAPI (servidor) com o MESMO
 * event_id, para a Meta deduplicar os dois eventos automaticamente.
 */
export function trackLead(params: LeadParams): string {
  const eventId = newEventId()
  const metaParams = { form_name: params.form_name }

  metaLead(eventId, metaParams)
  ga4Lead(metaParams)
  googleAdsLeadConversion()

  void sendMetaCapiEvent({
    event_name: 'Lead',
    event_id: eventId,
    event_source_url: currentUrl(),
    user_data: {
      email: params.email,
      phone: params.phone,
      first_name: params.first_name,
    },
    custom_data: metaParams,
  })

  return eventId
}
