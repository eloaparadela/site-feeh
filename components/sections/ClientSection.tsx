'use client'

import { useState, useEffect, useCallback } from 'react'
import { clientSlides, clientSection } from '@/data/siteData'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export default function ClientSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = clientSlides.length
  const slide = clientSlides[current]

  const prev = useCallback(() => { setCurrent((c) => (c - 1 + total) % total); setPaused(true) }, [total])
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [paused, next])

  useEffect(() => {
    if (!paused) return
    const resume = setTimeout(() => setPaused(false), 8000)
    return () => clearTimeout(resume)
  }, [paused, current])

  return (
    <section
      id={clientSection.sectionId}
      aria-label="Prosat para você"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── CABEÇALHO DA SEÇÃO ── */}
      <div className="theme-page-bg px-6 md:px-12 lg:px-20 py-12 lg:py-16 text-center">
        <p className="text-camel text-xs font-bold uppercase tracking-[0.25em] mb-4">
          {clientSection.sectionLabel}
        </p>
        <h2 className="theme-text-primary text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 max-w-3xl mx-auto">
          {clientSection.sectionTitle}
        </h2>
        <p className="theme-text-muted text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
          {clientSection.sectionSubtitle}
        </p>
        <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
          <div className="h-px w-10 bg-camel/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-camel" />
          <div className="h-px w-10 bg-camel/30" />
        </div>
      </div>

      {/* ── LAYOUT: imagem escura (esq) + texto claro (dir) ── */}
      <div className="flex flex-col lg:flex-row">

        {/* COLUNA DA IMAGEM — esquerda no desktop, topo no mobile */}
        <div className="lg:w-[55%] relative h-[300px] lg:h-[560px] order-1 overflow-hidden bg-onyx">
          {clientSlides.map((s, i) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/60 via-transparent to-transparent" />
            </div>
          ))}

          {/* Overlay: número + título fixo da seção */}
          <div className="absolute bottom-8 left-8 right-8 z-10">
            <span className="text-camel font-black text-5xl leading-none block mb-2">
              {slide.number}.
            </span>
            <p className="text-white-smoke text-lg lg:text-xl font-bold max-w-xs leading-snug">
              {clientSection.mainTitle}
            </p>
          </div>
        </div>

        {/* COLUNA DE TEXTO — direita no desktop, baixo no mobile */}
        <div className="lg:w-[45%] bg-white-smoke flex flex-col justify-center px-6 md:px-10 lg:px-14 xl:px-20 py-12 lg:py-16 order-2">

          {/* Navegação + label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Slide anterior"
                className="w-9 h-9 rounded-full border border-onyx/20 hover:border-camel hover:bg-camel/10 flex items-center justify-center text-onyx/60 hover:text-camel transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => { next(); setPaused(true) }}
                aria-label="Próximo slide"
                className="w-9 h-9 rounded-full border border-onyx/20 hover:border-camel hover:bg-camel/10 flex items-center justify-center text-onyx/60 hover:text-camel transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1 h-5 bg-camel rounded-full" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-camel">
                {slide.label}
              </span>
            </div>
          </div>

          {/* Título do slide */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-onyx leading-tight mb-5">
            {slide.title}
          </h3>

          {/* Subtítulo */}
          <p className="text-sm font-semibold uppercase tracking-wider text-camel mb-4">
            {slide.subtitle}
          </p>

          {/* Descrição */}
          <p className="text-prosat-grey leading-relaxed text-sm lg:text-base mb-8 max-w-md">
            {slide.description}
          </p>

          {/* Frase de apoio */}
          <p className="text-xs text-onyx/50 italic mb-8 border-l-2 border-camel/40 pl-3">
            {clientSection.supportPhrase}
          </p>

          {/* Botão CTA */}
          <a
            href={slide.ctaLink}
            target={slide.ctaLink.startsWith('http') ? '_blank' : '_self'}
            rel={slide.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 bg-onyx hover:bg-onyx/80 text-white-smoke font-bold text-sm px-6 py-3 rounded self-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
          >
            {slide.ctaLink.startsWith('http') ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {slide.ctaLabel}
          </a>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-8" role="tablist" aria-label="Slides Prosat para você">
            {clientSlides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                onClick={() => { setCurrent(i); setPaused(true) }}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none ${
                  i === current ? 'w-5 bg-camel' : 'w-1.5 bg-onyx/20 hover:bg-onyx/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
