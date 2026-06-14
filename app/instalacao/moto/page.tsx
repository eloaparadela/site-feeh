import type { Metadata } from 'next'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata: Metadata = {
  title: 'Rastreamento para Moto — Prosat',
  description: 'Solução completa de rastreamento para motos. Proteção discreta e monitoramento 24h.',
}

export default function InstalacaoMotoPage() {
  return (
    <main className="min-h-screen theme-page-bg">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24">

        <nav className="mb-10 text-sm theme-text-muted" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-[#B4995A] transition-colors">Início</Link></li>
            <li aria-hidden="true"><span className="text-[#B4995A]/30">/</span></li>
            <li className="text-[#B4995A]">Rastreamento para Moto</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
          <div className="lg:w-1/2">
            <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">Instalação</p>
            <h1 className="theme-text-primary text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Rastreamento para<br /><span className="text-[#B4995A]">Moto</span>
            </h1>
            <p className="theme-text-muted leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/#orcamento" className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold text-sm px-6 py-3 rounded transition-colors">Ver planos e preços</a>
              <a href={`https://wa.me/5500000000000?text=${encodeURIComponent('Olá, gostaria de saber mais sobre o rastreamento para Moto.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-[#B4995A]/30 hover:border-[#B4995A] theme-text-muted hover:text-[#B4995A] text-sm px-6 py-3 rounded transition-colors">Fale no WhatsApp</a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <ImagePlaceholder text="Imagem moto com rastreador • 700×450" className="w-full rounded-lg" aspectRatio="16/10" dark={false} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Alta precisão', desc: 'Lorem ipsum dolor sit amet. Rastreador de precisão específico para motos.' },
            { title: 'Baixo consumo', desc: 'Lorem ipsum dolor sit amet. Tecnologia que não drena a bateria da sua moto.' },
            { title: 'Recuperação rápida', desc: 'Lorem ipsum dolor sit amet. Central de operações 24h para recuperação veicular.' },
          ].map((b) => (
            <div key={b.title} className="theme-surface border theme-border-color rounded-lg p-6">
              <div className="w-8 h-8 rounded bg-[#B4995A]/10 flex items-center justify-center mb-4">
                <span className="w-3 h-3 rounded-full bg-[#B4995A] block" aria-hidden="true" />
              </div>
              <h2 className="theme-text-primary font-bold mb-2">{b.title}</h2>
              <p className="theme-text-muted text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center py-12 border theme-border-color rounded-xl theme-surface">
          <h2 className="theme-text-primary text-2xl font-bold mb-3">Pronto para proteger sua moto?</h2>
          <p className="theme-text-muted text-sm mb-6 max-w-md mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <a href="/#orcamento" className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold px-8 py-4 rounded transition-colors">Ver planos — a partir de R$ 60,00/mês</a>
        </div>
      </div>
    </main>
  )
}
