import type { Metadata } from 'next'
import Link from 'next/link'
import { grupoTrackerPage } from '@/data/siteData'
import TrackedLink from '@/components/tracking/TrackedLink'

export const metadata: Metadata = {
  title: grupoTrackerPage.meta.title,
  description: grupoTrackerPage.meta.description,
}

export default function GrupoTrackerPage() {
  const { hero, blocks, stats, about, cta } = grupoTrackerPage

  return (
    <main className="min-h-screen theme-page-bg">

      {/* ── Hero interno ── */}
      <div className="bg-[#0F0A0F] py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-white/40">
              <li><Link href="/" className="hover:text-[#B4995A] transition-colors">Início</Link></li>
              <li aria-hidden="true"><span className="text-[#B4995A]/30">/</span></li>
              <li className="text-[#B4995A]">O Grupo PROSAT</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div>
              <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">{hero.label}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F2F2] leading-tight mb-6">
                {hero.headline}
              </h1>
              <p className="text-[#F2F2F2] font-semibold text-base md:text-lg mb-4 leading-snug">
                {hero.subheadline}
              </p>
              <p className="text-[#828282] leading-relaxed mb-8">
                {hero.description}
              </p>
              <TrackedLink
                href={hero.buttonLink}
                contact={{ contact_method: 'quote', cta_name: 'grupo_prosat_hero_cta', cta_location: 'grupo_prosat_hero' }}
                className="inline-flex items-center justify-center gap-2 bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold text-sm px-6 py-3 rounded transition-colors"
              >
                {hero.buttonLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="theme-section-bg border-y theme-border-color">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.value} className="py-4">
                <p className="text-3xl lg:text-4xl font-black text-[#B4995A] mb-1">{s.value}</p>
                <p className="text-sm theme-text-muted uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Missão / Visão / Valores ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {blocks.map((b) => (
            <div key={b.title} className="theme-surface border theme-border-color rounded-lg p-6 lg:p-8">
              <div className="w-10 h-10 rounded bg-[#B4995A]/10 flex items-center justify-center mb-5">
                <span className="w-4 h-4 rounded-full bg-[#B4995A] block" aria-hidden="true" />
              </div>
              <h2 className="theme-text-primary font-bold text-lg mb-3">{b.title}</h2>
              <p className="theme-text-muted text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        {/* ── Texto sobre a empresa ── */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="w-10 h-1 bg-[#B4995A] rounded-full inline-block mb-5" aria-hidden="true" />
          <h2 className="theme-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight">
            {about.headline}
          </h2>
          <p className="theme-text-muted leading-relaxed">
            {about.body}
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#0F0A0F] py-16">
        <div className="max-w-[700px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2F2F2] mb-3">{cta.headline}</h2>
          <p className="text-[#828282] text-sm mb-8">{cta.description}</p>
          <TrackedLink
            href={cta.buttonLink}
            contact={{ contact_method: 'quote', cta_name: 'grupo_prosat_cta_final', cta_location: 'grupo_prosat_bottom' }}
            className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold px-8 py-4 rounded transition-colors"
          >
            {cta.buttonLabel}
          </TrackedLink>
        </div>
      </div>

    </main>
  )
}
