'use client'

// ─────────────────────────────────────────────
// GOOGLE ANALYTICS 4 + GOOGLE ADS (preparado, ainda inativo)
// ─────────────────────────────────────────────
// Enquanto TRACKING_CONFIG.GA_MEASUREMENT_ID / GOOGLE_ADS_ID forem null,
// TODAS as funções abaixo fazem early return — nada é carregado, nada é
// disparado, nenhum erro é gerado. Quando os IDs forem preenchidos em
// lib/tracking-config.ts, essas funções passam a funcionar sem precisar
// mudar nenhum componente do site.

import { TRACKING_CONFIG } from './tracking-config'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GOOGLE_ADS_LEAD_CONVERSION_LABEL,
  GOOGLE_ADS_CONTACT_CONVERSION_LABEL,
} = TRACKING_CONFIG

export const isGA4Configured = Boolean(GA_MEASUREMENT_ID)
export const isGoogleAdsConfigured = Boolean(GOOGLE_ADS_ID)

/** true assim que houver pelo menos um ID do Google configurado — usado pra decidir se carrega o gtag.js. */
export const shouldLoadGtag = isGA4Configured || isGoogleAdsConfigured

function gtagReady(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export function ga4PageView() {
  if (!isGA4Configured || !gtagReady()) return
  window.gtag!('event', 'page_view')
}

export function ga4ViewContent(params: { content_name: string; content_category?: string }) {
  if (!isGA4Configured || !gtagReady()) return
  window.gtag!('event', 'view_item', {
    item_name: params.content_name,
    item_category: params.content_category,
  })
}

export function ga4Contact(params: object) {
  if (!isGA4Configured || !gtagReady()) return
  window.gtag!('event', 'contact', params)
}

export function ga4Lead(params: object) {
  if (!isGA4Configured || !gtagReady()) return
  window.gtag!('event', 'generate_lead', params)
}

export function googleAdsLeadConversion() {
  if (!isGoogleAdsConfigured || !GOOGLE_ADS_LEAD_CONVERSION_LABEL || !gtagReady()) return
  window.gtag!('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_CONVERSION_LABEL}`,
  })
}

export function googleAdsContactConversion() {
  if (!isGoogleAdsConfigured || !GOOGLE_ADS_CONTACT_CONVERSION_LABEL || !gtagReady()) return
  window.gtag!('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONTACT_CONVERSION_LABEL}`,
  })
}
