'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/tracking'

/**
 * Observa a navegação do Next.js (client-side, via <Link>) e dispara
 * PageView a cada troca de página. A PRIMEIRA PageView já é disparada
 * pelo <MetaPixel /> (fbq('track','PageView') roda junto com o init),
 * então aqui ignoramos a primeira renderização para não duplicar.
 */
export default function TrackingProvider() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView()
  }, [pathname])

  return null
}
