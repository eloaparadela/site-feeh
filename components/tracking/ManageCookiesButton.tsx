'use client'

import { resetConsent } from '@/lib/consent'

/**
 * Limpa a decisão de cookies salva e recarrega a página — o banner
 * (components/tracking/CookieConsent.tsx) volta a aparecer, como se
 * fosse a primeira visita.
 */
export default function ManageCookiesButton() {
  return (
    <button
      onClick={() => {
        resetConsent()
        window.location.reload()
      }}
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#B4995A] hover:text-[#C8AF72] underline-offset-2 hover:underline transition-colors"
    >
      Gerenciar minhas preferências de cookies
    </button>
  )
}
