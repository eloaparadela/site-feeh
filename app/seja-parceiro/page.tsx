import type { Metadata } from 'next'
import Link from 'next/link'
import { sejaParceiroPagina, whatsapp } from '@/data/siteData'
import ParceiroForm from './ParceiroForm'

export const metadata: Metadata = {
  title: sejaParceiroPagina.meta.title,
  description: sejaParceiroPagina.meta.description,
}

export default function SejaParceiroPPage() {
  const { hero, benefits, form, whatsappMessage } = sejaParceiroPagina

  return (
    <main className="min-h-screen theme-page-bg">

      {/* ── Hero ── */}
      <div className="bg-[#0F0A0F] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-white/40">
              <li><Link href="/" className="hover:text-[#B4995A] transition-colors">Início</Link></li>
              <li aria-hidden="true"><span className="text-[#B4995A]/30">/</span></li>
              <li className="text-[#B4995A]">Seja Parceiro</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2">
              <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">{hero.label}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F2F2] leading-tight mb-6">
                {hero.headline}
              </h1>
              <p className="text-[#828282] leading-relaxed mb-8">{hero.description}</p>
              <a
                href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-sm px-6 py-3 rounded transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar pelo WhatsApp
              </a>
            </div>

            {/* Benefícios no hero */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <div className="w-7 h-7 rounded bg-[#B4995A]/15 flex items-center justify-center mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B4995A] block" aria-hidden="true" />
                  </div>
                  <h2 className="text-[#F2F2F2] font-bold text-sm mb-2">{b.title}</h2>
                  <p className="text-[#828282] text-xs leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Formulário ── */}
      <div className="max-w-[800px] mx-auto px-4 md:px-8 py-16 lg:py-24">
        <div className="theme-surface border theme-border-color rounded-xl p-6 md:p-10">
          <h2 className="theme-text-primary text-2xl font-bold mb-2">{form.headline}</h2>
          <p className="theme-text-muted text-sm mb-8">{form.description}</p>
          <ParceiroForm />
        </div>
      </div>

    </main>
  )
}
