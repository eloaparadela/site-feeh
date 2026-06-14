'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { heroSlides } from '@/data/siteData'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const total = heroSlides.length
  const slide = heroSlides[current]

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])
  const goTo = (i: number) => { setCurrent(i); setPaused(true) }

  // Autoplay 3s
  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [paused, next])

  // Retoma autoplay 8s após interação manual
  useEffect(() => {
    if (!paused) return
    const resume = setTimeout(() => setPaused(false), 8000)
    return () => clearTimeout(resume)
  }, [paused, current])

  // ── Suporte a swipe / touch ──
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
    // Só processa swipe horizontal (evita conflito com scroll)
    if (Math.abs(dx) > 50 && dy < 60) {
      if (dx > 0) { next(); setPaused(true) }
      else { prev(); setPaused(true) }
    }
  }

  return (
    <section id="hero" aria-label="Apresentação Prosat">

      {/* ═══════════════════════════════════════
          ÁREA DA IMAGEM — Carrossel deslizante
      ══════════════════════════════════════ */}
      <div
        className="relative w-full h-[58vh] md:h-[calc(100vh-120px)] overflow-hidden bg-[#0F0A0F] select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Track deslizante */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className="min-w-full h-full relative flex-shrink-0"
              aria-hidden={i !== current}
            >
              {/*
                SUBSTITUIR IMAGEM: Troque por:
                <Image src={s.image} alt={s.imageAlt} fill className="object-cover" priority={i===0} />
              */}
              <ImagePlaceholder text={s.imagePlaceholder} className="w-full h-full" />

              {/* Overlay escuro — não afeta o header */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A0F]/80 via-[#0F0A0F]/50 to-[#0F0A0F]/25" />

              {/* Moldura decorativa — apenas desktop */}
              <div
                className="hidden md:block absolute inset-x-8 inset-y-6 lg:inset-x-12 lg:inset-y-8 border border-[#B4995A]/18 rounded-[2.5rem] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* ── Bloco de texto flutuante — desktop ── */}
        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
          <div className="absolute bottom-24 left-8 lg:left-16 xl:left-24 max-w-[420px] lg:max-w-[480px] bg-white/50 backdrop-blur-md border-l-4 border-[#B4995A] p-6 lg:p-8 pointer-events-auto">
            <h1 className="text-lg lg:text-xl xl:text-2xl font-bold text-[#0F0A0F] leading-snug mb-3">
              {slide.title}
            </h1>
            <p className="text-sm lg:text-base text-[#0F0A0F]/80 leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* ── Setas de navegação — desktop ── */}
        <button
          onClick={() => { prev(); setPaused(true) }}
          aria-label="Slide anterior"
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/30 hover:bg-[#B4995A]/80 border border-white/20 hover:border-[#B4995A] text-white transition-all duration-200 focus-ring"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => { next(); setPaused(true) }}
          aria-label="Próximo slide"
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/30 hover:bg-[#B4995A]/80 border border-white/20 hover:border-[#B4995A] text-white transition-all duration-200 focus-ring"
        >
          <ChevronRight />
        </button>

        {/* ── Dots — desktop (dentro da imagem) ── */}
        <div
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 items-center gap-2"
          role="tablist"
          aria-label="Slides do carrossel"
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir para slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 focus-ring ${
                i === current ? 'w-7 bg-[#B4995A]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          TEXTO ABAIXO DA IMAGEM — mobile
      ══════════════════════════════════════ */}
      <div className="md:hidden bg-[#0F0A0F] px-4 py-5">
        <div className="border-l-4 border-[#B4995A] bg-white/[0.08] p-4 rounded-r">
          <h1 className="text-base font-bold text-[#F2F2F2] leading-snug mb-2">{slide.title}</h1>
          <p className="text-sm text-[#F2F2F2]/70 leading-relaxed">{slide.subtitle}</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTÕES DE AÇÃO
      ══════════════════════════════════════ */}
      <div className="bg-[#0d0a0d] border-t border-[#B4995A]/10 px-4 md:px-8 lg:px-16 py-5">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Cotação Online */}
          <a
            href={slide.primaryButtonLink}
            className="inline-flex items-center justify-center gap-2 bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold text-sm px-6 py-3 rounded transition-colors focus-ring sm:w-auto w-full"
          >
            {slide.primaryButtonLabel}
          </a>

          {/* WhatsApp de Vendas */}
          <a
            href={slide.secondaryButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/50 text-[#F2F2F2] hover:bg-white/5 font-medium text-sm px-6 py-3 rounded transition-colors focus-ring sm:w-auto w-full"
          >
            <WhatsAppIcon />
            {slide.secondaryButtonLabel}
          </a>

          {/* Saiba Mais / CTA secundário */}
          <a
            href={slide.tertiaryButtonLink}
            className="inline-flex items-center justify-center gap-2 bg-[#B4995A]/10 hover:bg-[#B4995A]/20 border border-[#B4995A]/30 hover:border-[#B4995A]/60 text-[#B4995A] font-medium text-sm px-6 py-3 rounded transition-colors focus-ring sm:ml-auto sm:w-auto w-full"
          >
            {slide.tertiaryButtonLabel}
          </a>
        </div>
      </div>

      {/* ── Dots + setas mobile ── */}
      <div className="md:hidden bg-[#0d0a0d] flex items-center justify-center gap-4 pb-5 pt-1">
        <button
          onClick={() => { prev(); setPaused(true) }}
          aria-label="Slide anterior"
          className="p-1.5 text-white/40 hover:text-[#B4995A] transition-colors focus-ring rounded"
        >
          <ChevronLeft />
        </button>

        <div role="tablist" aria-label="Slides" className="flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${
                i === current ? 'w-5 bg-[#B4995A]' : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => { next(); setPaused(true) }}
          aria-label="Próximo slide"
          className="p-1.5 text-white/40 hover:text-[#B4995A] transition-colors focus-ring rounded"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
