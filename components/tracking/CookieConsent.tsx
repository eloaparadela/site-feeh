'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getConsent, setConsent } from '@/lib/consent'

/**
 * Mini banner de aviso de cookies. Some quando o visitante já decidiu
 * (aceitar ou recusar) — a decisão fica salva em localStorage
 * (lib/consent.ts) e é isso que lib/meta.ts e lib/attribution.ts
 * checam antes de carregar o Pixel, enviar eventos à Meta CAPI ou
 * gravar qualquer dado de atribuição.
 *
 * "Aceitar" recarrega a página pra já iniciar a mensuração nessa mesma
 * visita. "Recusar" só fecha o banner — nada de mensuração roda.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getConsent() === null)
  }, [])

  if (!visible) return null

  const accept = () => {
    setConsent('accepted')
    window.location.reload()
  }

  const decline = () => {
    setConsent('declined')
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0F0A0F] border-t border-camel/20 px-4 py-4 md:px-6"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-white-smoke/80 text-xs md:text-sm leading-relaxed flex-1 text-center sm:text-left">
          Usamos cookies e ferramentas de mensuração para melhorar sua experiência e entender como você
          chegou até aqui. Você pode aceitar ou recusar — saiba mais na nossa{' '}
          <Link href="/privacidade" className="text-camel hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={decline}
            className="text-xs md:text-sm text-white-smoke/60 hover:text-white-smoke px-4 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="text-xs md:text-sm bg-camel hover:bg-soft-fawn text-onyx font-bold px-5 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
