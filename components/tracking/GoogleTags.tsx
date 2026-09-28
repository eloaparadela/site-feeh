'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { TRACKING_CONFIG } from '@/lib/tracking-config'
import { shouldLoadGtag, isGA4Configured, isGoogleAdsConfigured } from '@/lib/google'
import { hasMarketingConsent } from '@/lib/consent'

/**
 * Carrega UMA ÚNICA instância do gtag.js, compartilhada entre GA4 e
 * Google Ads. Enquanto nenhum dos dois estiver configurado em
 * lib/tracking-config.ts, este componente não renderiza nada — não
 * carrega script, não cria cookies, não polui o console.
 *
 * Também só carrega depois que o visitante aceita o banner de cookies
 * (mesmo gate do MetaPixel.tsx) — vale desde já e continua valendo
 * quando o GA4/Ads forem ativados no futuro.
 *
 * Quando GA_MEASUREMENT_ID e/ou GOOGLE_ADS_ID forem preenchidos, basta
 * gerar um novo build: este componente passa a carregar sozinho.
 */
export default function GoogleTags() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    setConsented(hasMarketingConsent())
  }, [])

  if (!shouldLoadGtag || !consented) return null

  const { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } = TRACKING_CONFIG
  // O primeiro ID é usado para carregar o script gtag.js (qualquer um serve).
  const bootstrapId = GA_MEASUREMENT_ID ?? GOOGLE_ADS_ID

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${bootstrapId}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${isGA4Configured ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
          ${isGoogleAdsConfigured ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
          window.gtag = gtag;
        `}
      </Script>
    </>
  )
}
