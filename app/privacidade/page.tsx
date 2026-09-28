import type { Metadata } from 'next'
import Link from 'next/link'
import { policySections, LAST_UPDATED } from './content'
import ManageCookiesButton from '@/components/tracking/ManageCookiesButton'

export const metadata: Metadata = {
  title: 'Política de Privacidade e Uso de Dados — Prosat',
  description:
    'Como a Prosat coleta, usa e compartilha dados no site, e quais direitos você tem sobre eles, conforme a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen theme-page-bg">
      {/* ── Hero ── */}
      <div className="bg-[#0F0A0F] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-white/40">
              <li><Link href="/" className="hover:text-[#B4995A] transition-colors">Início</Link></li>
              <li aria-hidden="true"><span className="text-[#B4995A]/30">/</span></li>
              <li className="text-[#B4995A]">Privacidade e Uso de Dados</li>
            </ol>
          </nav>

          <div className="max-w-[700px]">
            <p className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">Transparência</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F2F2] leading-tight mb-6">
              Política de Privacidade e Uso de Dados
            </h1>
            <p className="text-[#828282] text-base leading-relaxed">
              Este documento explica, de forma clara, quais dados o site da Prosat coleta e como usamos
              essas informações.
            </p>
          </div>
        </div>
      </div>

      {/* ── Corpo ── */}
      <div className="max-w-[760px] mx-auto px-4 md:px-8 py-16 lg:py-20 space-y-10">
        {policySections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className="theme-text-primary text-lg md:text-xl font-bold mb-4 leading-tight">
              {s.title}
            </h2>

            {s.paragraphs?.map((p, i) => (
              <p key={i} className="theme-text-muted text-sm md:text-base leading-relaxed mb-3">
                {p}
              </p>
            ))}

            {s.list && (
              <ul className="space-y-2 list-disc list-outside pl-5 mb-3">
                {s.list.map((item, i) => (
                  <li key={i} className="theme-text-muted text-sm md:text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {s.id === 'cookies' && (
              <div className="mt-1">
                <ManageCookiesButton />
              </div>
            )}
          </section>
        ))}

        <section id="ultima-atualizacao" className="pt-6 border-t theme-border-color">
          <p className="theme-text-muted text-sm">
            Última atualização: <strong className="theme-text-primary">{LAST_UPDATED}</strong>
          </p>
        </section>
      </div>
    </main>
  )
}
