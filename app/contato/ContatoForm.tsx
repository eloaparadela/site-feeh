'use client'

import { useState } from 'react'
import Link from 'next/link'
import { contatoPagina } from '@/data/siteData'

export default function ContatoForm() {
  const { form } = contatoPagina
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-[#B4995A]/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#B4995A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="theme-text-primary font-bold text-lg mb-2">{form.successMessage}</p>
        <Link href="/" className="text-[#B4995A] text-sm hover:underline mt-4 inline-block">Voltar à página inicial</Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold theme-text-muted mb-1.5 uppercase tracking-wider">Nome *</label>
          <input
            type="text"
            required
            placeholder={form.namePlaceholder}
            className="w-full theme-surface border theme-border-color rounded px-4 py-3 text-sm theme-text-primary placeholder:text-[#828282] focus:outline-none focus:border-[#B4995A] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold theme-text-muted mb-1.5 uppercase tracking-wider">Telefone *</label>
          <input
            type="tel"
            required
            placeholder={form.phonePlaceholder}
            className="w-full theme-surface border theme-border-color rounded px-4 py-3 text-sm theme-text-primary placeholder:text-[#828282] focus:outline-none focus:border-[#B4995A] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold theme-text-muted mb-1.5 uppercase tracking-wider">E-mail</label>
          <input
            type="email"
            placeholder={form.emailPlaceholder}
            className="w-full theme-surface border theme-border-color rounded px-4 py-3 text-sm theme-text-primary placeholder:text-[#828282] focus:outline-none focus:border-[#B4995A] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold theme-text-muted mb-1.5 uppercase tracking-wider">Assunto</label>
          <input
            type="text"
            placeholder={form.subjectPlaceholder}
            className="w-full theme-surface border theme-border-color rounded px-4 py-3 text-sm theme-text-primary placeholder:text-[#828282] focus:outline-none focus:border-[#B4995A] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold theme-text-muted mb-1.5 uppercase tracking-wider">Mensagem *</label>
        <textarea
          required
          rows={5}
          placeholder={form.messagePlaceholder}
          className="w-full theme-surface border theme-border-color rounded px-4 py-3 text-sm theme-text-primary placeholder:text-[#828282] focus:outline-none focus:border-[#B4995A] transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center bg-[#B4995A] hover:bg-[#C8AF72] text-[#0F0A0F] font-bold text-sm px-8 py-3.5 rounded transition-colors"
        >
          {form.submitLabel}
        </button>
        <p className="text-xs theme-text-muted opacity-60 pt-1 sm:pt-3">
          * Integração com backend pendente.
        </p>
      </div>
    </form>
  )
}
