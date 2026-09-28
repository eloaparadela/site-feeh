'use client'

// ─────────────────────────────────────────────
// META PIXEL (navegador) + META CONVERSIONS API (servidor)
// ─────────────────────────────────────────────
// Este arquivo só sabe falar com a Meta. Os componentes do site nunca
// chamam fbq() diretamente — sempre passam por lib/tracking.ts.

import { TRACKING_CONFIG } from './tracking-config'
import { hasMarketingConsent } from './consent'

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] }
    _fbq?: unknown
  }
}

// Toda função deste arquivo é travada por hasMarketingConsent() — sem
// consentimento aceito no banner de cookies, nada é disparado nem
// enviado à Meta (nem pelo navegador, nem pela CAPI no servidor).
function fbqReady(): boolean {
  return hasMarketingConsent() && typeof window !== 'undefined' && typeof window.fbq === 'function'
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : undefined
}

/** Cookie _fbp — criado pelo próprio Pixel no navegador. */
export function getFbp(): string | undefined {
  return getCookie('_fbp')
}

/** Cookie _fbc — só existe se o usuário chegou via anúncio (fbclid). Nunca inventar. */
export function getFbc(): string | undefined {
  return getCookie('_fbc')
}

export function metaPageView() {
  if (!fbqReady()) return
  window.fbq!('track', 'PageView')
}

export function metaViewContent(params: object) {
  if (!fbqReady()) return
  window.fbq!('track', 'ViewContent', params)
}

export function metaContact(params: object) {
  if (!fbqReady()) return
  window.fbq!('track', 'Contact', params)
}

/** Lead usa eventID para deduplicar com a chamada equivalente na CAPI (mesmo event_id). */
export function metaLead(eventId: string, params: object) {
  if (!fbqReady()) return
  window.fbq!('track', 'Lead', params, { eventID: eventId })
}

/**
 * Eventos que NÃO são padrão da Meta (QualifiedLead, Opportunity, Sale)
 * usam trackCustom em vez de track — é assim que a Meta diferencia
 * evento padrão de evento com nome próprio do negócio.
 */
export function metaCustomEvent(eventName: string, eventId: string, params: object) {
  if (!fbqReady()) return
  window.fbq!('trackCustom', eventName, params, { eventID: eventId })
}

// Lead/Contact/ViewContent são eventos padrão da Meta (track). QualifiedLead,
// Opportunity e Sale são nomes de negócio (trackCustom) — preparados pra uso
// futuro, mas hoje NADA no site chama trackQualifiedLead/Opportunity/Sale.
export type MetaCapiEventName = 'Lead' | 'Contact' | 'ViewContent' | 'QualifiedLead' | 'Opportunity' | 'Sale'

interface MetaCapiInput {
  event_name: MetaCapiEventName
  event_id: string
  event_source_url: string
  user_data?: {
    email?: string
    phone?: string
    first_name?: string
    /** ID anônimo do visitante (lib/attribution.ts) — hasheado no PHP antes de ir pra Meta. */
    external_id?: string
  }
  custom_data?: object
}

/**
 * Envia o evento para o endpoint PHP (meta-capi.php), que repassa pra
 * Graph API da Meta do lado do servidor. Nunca lança erro — a CAPI é
 * secundária e não pode travar o fluxo principal (formulário, clique).
 */
export async function sendMetaCapiEvent(input: MetaCapiInput): Promise<void> {
  if (!hasMarketingConsent()) return
  try {
    await fetch(TRACKING_CONFIG.META_CAPI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: input.event_name,
        event_id: input.event_id,
        event_source_url: input.event_source_url,
        user_data: input.user_data ?? {},
        custom_data: input.custom_data ?? {},
        fbp: getFbp() ?? null,
        fbc: getFbc() ?? null,
      }),
      keepalive: true,
    })
  } catch {
    // Silencioso de propósito — ver comentário acima.
  }
}
