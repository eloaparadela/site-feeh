'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { TRACKING_CONFIG } from '@/lib/tracking-config'
import { hasMarketingConsent } from '@/lib/consent'

/**
 * Injeta o Meta Pixel uma única vez (o próprio snippet da Meta já
 * protege contra reinicialização dupla via `if (f.fbq) return`).
 * Dispara o PageView inicial. Navegações seguintes (client-side, via
 * <Link>) são cobertas pelo TrackingProvider.
 *
 * SÓ carrega depois que o visitante aceita o banner de cookies
 * (components/tracking/CookieConsent.tsx) — antes disso, nem o script
 * do Pixel é inserido no DOM, então nenhum cookie (_fbp/_fbc) é
 * criado. O accept do banner recarrega a página, então checar isso só
 * no mount (sem listener) é suficiente.
 */
export default function MetaPixel() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    setConsented(hasMarketingConsent())
  }, [])

  const pixelId = TRACKING_CONFIG.META_PIXEL_ID
  if (!pixelId || !consented) return null

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
