import type { Metadata } from 'next'
import Link from 'next/link'
import { comoAjudarPage, whatsapp } from '@/data/siteData'

export const metadata: Metadata = {
  title: comoAjudarPage.meta.title,
  description: comoAjudarPage.meta.description,
}

const iconMap: Record<string, JSX.Element> = {
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  motorcycle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h7.5M6.75 15a3 3 0 100-6 3 3 0 000 6zm10.5 0a3 3 0 100-6 3 3 0 000 6zm-4.5-3h-3m3 0V9.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75V12" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  van: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  fleet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
    </svg>
  ),
}

export default function ComoPodemoAjudarPage() {
  const { hero, solutions, proText, cta } = comoAjudarPage

  return (
    <main className="min-h-screen theme-page-bg">

      {/* ── Hero ── */}
      <div className="bg-[#0F0A0F] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-white/40">
              <li><Link href="/" className="hover:text-[#B4995A] transition-colors">Início</Link></li>
              <li aria-hidden="true"><span className="text-[#B4995A]/30">/</span></li>
              <li className="text-[#B4995A]">Como podemos ajudar?</li>
            </ol>
          </nav>

          <div className="max-w-[700px]">
            <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">{hero.label}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F2F2] leading-tight mb-6">
              {hero.headline}
            </h1>
            <p className="text-[#828282] text-base leading-relaxed">{hero.description}</p>
          </div>
        </div>
      </div>

      {/* ── Grid de soluções ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {solutions.map((s) => (
            <div key={s.title} className="theme-surface border theme-border-color rounded-lg p-6 flex flex-col">
              <div className="w-10 h-10 rounded bg-[#B4995A]/10 flex items-center justify-center mb-4 text-[#B4995A]">
                {iconMap[s.icon]}
              </div>
              <h2 className="theme-text-primary font-bold text-lg mb-2">{s.title}</h2>
              <p className="theme-text-muted text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t theme-border-color">
                <span className="text-[#B4995A] text-sm font-semibold">{s.price}</span>
                <Link
                  href={s.link}
                  className="text-sm font-bold text-[#B4995A] hover:text-[#C8AF72] underline-offset-2 hover:underline transition-colors"
                >
                  {s.linkLabel} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Destaque de texto Prosat ── */}
        <div className="bg-[#0F0A0F] rounded-xl p-8 lg:p-12 border border-[#B4995A]/15 mb-16">
          <div className="flex items-start gap-4 max-w-[800px]">
            <span className="w-1 min-h-[3rem] bg-[#B4995A] rounded-full shrink-0 mt-1" aria-hidden="true" />
            <p className="text-[#F2F2F2] text-base md:text-lg leading-relaxed italic">
              &ldquo;{proText}&rdquo;
            </p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-12 border theme-border-color rounded-xl theme-surface">
          <h2 className="theme-text-primary text-2xl font-bold mb-3">{cta.headline}</h2>
          <p className="theme-text-muted text-sm mb-8 max-w-md mx-auto">{cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={cta.orcamentoLink}
              className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold text-sm px-6 py-3 rounded transition-colors"
            >
              {cta.orcamentoLabel}
            </Link>
            <a
              href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(cta.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#B4995A]/30 hover:border-[#B4995A] theme-text-muted hover:text-[#B4995A] text-sm px-6 py-3 rounded transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
