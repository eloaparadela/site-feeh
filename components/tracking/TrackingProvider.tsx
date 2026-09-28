'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/tracking'
import { captureAttribution } from '@/lib/attribution'

/**
 * Observa a navegação do Next.js (client-side, via <Link>) e dispara
 * PageView a cada troca de página. A PRIMEIRA PageView já é disparada
 * pelo <MetaPixel /> (fbq('track','PageView') roda junto com o init),
 * então aqui ignoramos a primeira renderização para não duplicar.
 *
 * captureAttribution() roda em TODAS as renderizações (inclusive a
 * primeira) — é ela quem lê UTMs / fbclid / gclid da URL e persiste
 * first touch / last touch, então precisa rodar sempre, mesmo quando
 * o PageView é pulado.
 */
export default function TrackingProvider() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    captureAttribution()

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView()
  }, [pathname])

  return null
}
