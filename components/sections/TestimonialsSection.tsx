'use client'

import { useState, useEffect, useCallback } from 'react'
import { testimonials } from '@/data/siteData'

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-3" aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-camel" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [paused, setPaused] = useState(false)

  // Detectar breakpoint para número de itens visíveis
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3)
      else if (window.innerWidth >= 768) setItemsPerView(2)
      else setItemsPerView(1)
    }
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const maxIndex = testimonials.length - itemsPerView
  const clampedCurrent = Math.min(current, maxIndex)

  const prev = useCallback(() => { setCurrent((c) => Math.max(0, c - 1)); setPaused(true) }, [])
  const next = useCallback(() => setCurrent((c) => Math.min(maxIndex, c + 1)), [maxIndex])

  // Autoplay com loop 3s
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((c) => {
        const next = c + 1
        return next > maxIndex ? 0 : next
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [paused, maxIndex])

  // Retoma 8s após interação manual
  useEffect(() => {
    if (!paused) return
    const resume = setTimeout(() => setPaused(false), 8000)
    return () => clearTimeout(resume)
  }, [paused, current])

  const translateX = clampedCurrent * (100 / itemsPerView)

  return (
    <section
      id="depoimentos"
      className="bg-[#0a070a] py-16 lg:py-24"
      aria-label="Depoimentos de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">

        {/* Cabeçalho */}
        <div className="mb-10 lg:mb-14">
          <p className="text-camel text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Depoimentos
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white-smoke mb-3">
            O que nossos{' '}
            <span className="text-camel">clientes dizem</span>
          </h2>
          <p className="text-prosat-grey text-sm lg:text-base max-w-xl">
            Clientes de todo o Brasil que já protegem seus veículos com a Prosat.
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${translateX}%)` }}
          >
            {testimonials.map((t) => (
              <article
                key={t.id}
                style={{ minWidth: `${100 / itemsPerView}%` }}
                className="px-2 md:px-3"
                aria-label={`Depoimento de ${t.name}`}
              >
                <div className="bg-[#130e13] border border-camel/10 hover:border-camel/25 rounded-lg p-5 lg:p-6 h-full flex flex-col transition-colors duration-200">
                  <StarRating count={t.stars} />
                  <blockquote className="text-prosat-grey text-sm leading-relaxed mb-5 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer>
                    <p className="text-white-smoke font-bold text-sm">{t.name}</p>
                    <p className="text-prosat-grey/70 text-xs mt-0.5">
                      {t.role} — {t.city}
                    </p>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between mt-8">
          {/* Setas */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={clampedCurrent === 0}
              aria-label="Depoimento anterior"
              className="w-10 h-10 rounded-full border border-camel/20 hover:border-camel/60 flex items-center justify-center text-prosat-grey hover:text-camel transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={clampedCurrent >= maxIndex}
              aria-label="Próximo depoimento"
              className="w-10 h-10 rounded-full border border-camel/20 hover:border-camel/60 flex items-center justify-center text-prosat-grey hover:text-camel transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Depoimentos">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === clampedCurrent}
                aria-label={`Página ${i + 1}`}
                onClick={() => { setCurrent(i); setPaused(true) }}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none ${
                  i === clampedCurrent ? 'w-5 bg-camel' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
