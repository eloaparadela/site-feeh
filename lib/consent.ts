'use client'

// ─────────────────────────────────────────────
// CONSENTIMENTO DE COOKIES — estado central
// ─────────────────────────────────────────────
// Único lugar que lê/escreve a decisão do visitante sobre cookies não
// essenciais (mensuração/publicidade). Usado pelo banner
// (components/tracking/CookieConsent.tsx) e verificado internamente
// por lib/meta.ts e lib/attribution.ts antes de qualquer coisa que não
// seja essencial ao funcionamento do site.
//
// Preferência de tema (prosat-theme) NÃO passa por aqui — é funcional/
// essencial, não depende de consentimento.

const KEY = 'prosat_cookie_consent'

export type ConsentValue = 'accepted' | 'declined'

function safeGet(): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(KEY) : null
  } catch {
    return null
  }
}

function safeSet(value: string): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, value)
  } catch {
    // Privado/bloqueado — o banner simplesmente reaparece na próxima visita.
  }
}

/** null = ainda não decidiu (banner deve aparecer). */
export function getConsent(): ConsentValue | null {
  const raw = safeGet()
  return raw === 'accepted' || raw === 'declined' ? raw : null
}

export function setConsent(value: ConsentValue): void {
  safeSet(value)
}

/** true só quando o visitante aceitou explicitamente. Usado pra decidir se mensuração/publicidade podem rodar. */
export function hasMarketingConsent(): boolean {
  return getConsent() === 'accepted'
}

/** Limpa a decisão salva — usado pelo link "Gerenciar cookies" na página de privacidade, pra reabrir o banner. */
export function resetConsent(): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
