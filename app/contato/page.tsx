import type { Metadata } from 'next'
import Link from 'next/link'
import { contatoPagina, whatsapp } from '@/data/siteData'
import ContatoForm from './ContatoForm'

export const metadata: Metadata = {
  title: contatoPagina.meta.title,
  description: contatoPagina.meta.description,
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[#B4995A] text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="theme-text-primary text-sm font-medium">{value}</p>
    </div>
  )
}

export default function ContatoPage() {
  const { hero, info, form, whatsappMessage } = contatoPagina

  return (
    <main className="min-h-screen theme-page-bg">

      {/* ── Hero ── */}
      <div className="bg-[#0F0A0F] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-white/40">
              <li><Link href="/" className="hover:text-[#B4995A] transition-colors">Início</Link></li>
              <li aria-hidden="true"><span className="text-[#B4995A]/30">/</span></li>
              <li className="text-[#B4995A]">Contato</li>
            </ol>
          </nav>

          <div className="max-w-[600px]">
            <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">{hero.label}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F2F2] leading-tight mb-6">
              {hero.headline}
            </h1>
            <p className="text-[#828282] leading-relaxed">{hero.description}</p>
          </div>
        </div>
      </div>

      {/* ── Corpo: info + formulário ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Coluna esquerda — informações de contato */}
          <div className="lg:w-[36%]">
            <div className="theme-surface border theme-border-color rounded-xl p-6 md:p-8 space-y-6 mb-6">
              <InfoItem label="WhatsApp" value={info.whatsappDisplay} />
              <InfoItem label="E-mail" value={info.email} />
              <InfoItem label="Endereço" value={info.address} />
              <InfoItem label="Horário de atendimento" value={info.hours} />
            </div>

            <a
              href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-sm py-3.5 px-6 rounded transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar pelo WhatsApp
            </a>
          </div>

          {/* Coluna direita — formulário */}
          <div className="lg:w-[64%]">
            <div className="theme-surface border theme-border-color rounded-xl p-6 md:p-10">
              <h2 className="theme-text-primary text-xl font-bold mb-6">{form.headline}</h2>
              <ContatoForm />
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
