import type { Metadata } from 'next'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { grupoTrackerPage } from '@/data/siteData'

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
              <li className="text-[#B4995A]">O Grupo Tracker</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2">
              <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">{hero.label}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F2F2] leading-tight mb-6">
                {hero.headline}
              </h1>
              <p className="text-[#B4995A] font-semibold text-base md:text-lg mb-4 leading-snug">
                {hero.subheadline}
              </p>
              <p className="text-[#828282] leading-relaxed mb-8">
                {hero.description}
              </p>
              <Link
                href={cta.buttonLink}
                className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold text-sm px-6 py-3 rounded transition-colors"
              >
                {cta.buttonLabel}
              </Link>
            </div>
            <div className="lg:w-1/2">
              <ImagePlaceholder
                text="Foto institucional do Grupo Tracker • 700×450"
                className="w-full rounded-lg"
                aspectRatio="16/10"
              />
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
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <ImagePlaceholder
              text="Foto da equipe / sede • 700×450"
              className="w-full rounded-lg"
              aspectRatio="16/10"
              dark={false}
            />
          </div>
          <div className="lg:w-1/2">
            <span className="w-1 h-8 bg-[#B4995A] rounded-full inline-block mb-5" aria-hidden="true" />
            <h2 className="theme-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight">
              {about.headline}
            </h2>
            <p className="theme-text-muted leading-relaxed">
              {about.body}
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#0F0A0F] py-16">
        <div className="max-w-[700px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2F2F2] mb-3">{cta.headline}</h2>
          <p className="text-[#828282] text-sm mb-8">{cta.description}</p>
          <Link
            href={cta.buttonLink}
            className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold px-8 py-4 rounded transition-colors"
          >
            {cta.buttonLabel}
          </Link>
        </div>
      </div>

    </main>
  )
}
