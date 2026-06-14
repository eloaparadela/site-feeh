'use client'

import { useState, useEffect, useCallback } from 'react'
import { appSlides, appSection } from '@/data/siteData'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

function AppStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M3.18 23.76c.34.18.73.19 1.1.04L14.82 12 4.28.2C3.91.05 3.52.06 3.18.24 2.55.58 2.17 1.27 2.17 2.07v19.86c0 .8.38 1.49 1.01 1.83zm15.1-11.65l-2.58-2.58-9.44 5.28 12.02-2.7zM5.26 2.36l9.44 5.28 2.58-2.58L5.26 2.36zm12.52 8.2L5.26 7.91 14.7 13.2l3.08-2.64z" />
    </svg>
  )
}

export default function AppSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = appSlides.length
  const slide = appSlides[current]

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <section
      id="aplicativo"
      className="relative min-h-screen flex flex-col bg-onyx"
      aria-label="Aplicativo Prosat"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Imagem de fundo com fade ── */}
      <div className="absolute inset-0">
        {appSlides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== current}
          >
            {/*
              SUBSTITUIR IMAGEM: Troque por:
              <Image src={s.image} alt={s.imageAlt} fill className="object-cover" />
            */}
            <ImagePlaceholder text={s.imagePlaceholder} className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-onyx/60 via-onyx/50 to-onyx/80 md:bg-gradient-to-r md:from-onyx/85 md:via-onyx/50 md:to-onyx/20" />
          </div>
        ))}
      </div>

      {/* ── Conteúdo ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-16 py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 lg:gap-16">

            {/* Coluna esquerda — Texto */}
            <div className="md:w-[45%] lg:w-[40%]">
              {/* Label de seção */}
              <p className="text-camel text-xs font-bold uppercase tracking-[0.25em] mb-4">
                Aplicativo
              </p>

              {/* Título */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white-smoke leading-tight mb-5">
                {slide.title}
              </h2>

              {/* Descrição */}
              <p className="text-prosat-grey text-sm lg:text-base leading-relaxed mb-8">
                {slide.description}
              </p>

              {/* Botões de download */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <a
                  href={slide.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white-smoke px-5 py-3 rounded transition-colors"
                  aria-label="Baixar na App Store"
                >
                  <AppStoreIcon />
                  <div className="text-left">
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Baixar na</p>
                    <p className="text-sm font-semibold leading-none">App Store</p>
                  </div>
                </a>

                <a
                  href={slide.googlePlayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white-smoke px-5 py-3 rounded transition-colors"
                  aria-label="Disponível no Google Play"
                >
                  <PlayStoreIcon />
                  <div className="text-left">
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Disponível no</p>
                    <p className="text-sm font-semibold leading-none">Google Play</p>
                  </div>
                </a>
              </div>

              <a
                href={slide.learnMoreLink}
                className="inline-flex items-center gap-2 bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm px-6 py-3 rounded transition-colors"
              >
                Saiba Mais
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Coluna direita — Arte do app (placeholder) */}
            <div className="md:w-[45%] lg:w-[40%] flex justify-center md:justify-end">
              {/*
                SUBSTITUIR ARTE: Troque ImagePlaceholder pelo logo/arte final do app.
                O campo appArtPlaceholder no siteData.ts controla o texto do placeholder.
              */}
              <ImagePlaceholder
                text={appSection.appArtPlaceholder}
                className="w-full max-w-[320px] md:max-w-[380px] rounded-2xl border-camel/20"
                aspectRatio="4/5"
                dark
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Dots de navegação ── */}
      <div
        className="relative z-10 flex justify-center gap-2 pb-8"
        role="tablist"
        aria-label="Slides do aplicativo"
      >
        {appSlides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel ${
              i === current ? 'w-6 bg-camel' : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
