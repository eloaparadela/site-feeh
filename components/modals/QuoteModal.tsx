'use client'

import { useState, useEffect, useRef } from 'react'
import { type PricingPlan } from '@/data/siteData'

const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO',
  'MA','MT','MS','MG','PA','PB','PR','PE','PI',
  'RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

interface QuoteModalProps {
  plan: PricingPlan
  onClose: () => void
}

export default function QuoteModal({ plan, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Fechar com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    /*
      TODO: Integração com backend.
      Aqui conectar ao endpoint de criação de lead,
      ex: await fetch('/api/leads', { method: 'POST', body: JSON.stringify(formData) })
    */
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#130e13] border border-camel/20 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/60">

        {/* Header do modal */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-camel/10">
          <div>
            <h2 id="modal-title" className="text-white-smoke font-bold text-lg">
              Contratar Plano — {plan.vehicleType}
            </h2>
            <p className="text-prosat-grey text-xs mt-0.5">
              Preencha os dados abaixo para solicitar o serviço
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-2 text-prosat-grey hover:text-camel transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-6">
          {submitted ? (
            /* Estado de sucesso */
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-camel/10 border border-camel/30 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-camel" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white-smoke font-bold text-lg mb-2">Solicitação registrada!</h3>
              <p className="text-prosat-grey text-sm mb-1">
                Integração pendente.
              </p>
              <p className="text-prosat-grey/60 text-xs">
                {/* TODO: Após integração com backend, substituir por mensagem de confirmação real */}
                Em breve você receberá um retorno da nossa equipe.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm px-8 py-3 rounded transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">

                {/* Nome completo */}
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                    Nome completo *
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke placeholder:text-prosat-grey/50 text-sm px-4 py-3 rounded outline-none transition-colors"
                  />
                </div>

                {/* Tipo de veículo (pré-selecionado) */}
                <div>
                  <label htmlFor="quote-vehicle-type" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                    Tipo de veículo *
                  </label>
                  <select
                    id="quote-vehicle-type"
                    name="vehicleType"
                    defaultValue={plan.vehicleType}
                    required
                    className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke text-sm px-4 py-3 rounded outline-none transition-colors"
                  >
                    <option value="Caminhão">Caminhão</option>
                    <option value="Utilitário">Utilitário</option>
                    <option value="Carro Leve">Carro Leve</option>
                    <option value="Moto">Moto</option>
                  </select>
                </div>

                {/* Modelo + Ano */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="quote-model" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                      Modelo *
                    </label>
                    <input
                      id="quote-model"
                      name="model"
                      type="text"
                      required
                      placeholder="Ex: HB20"
                      className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke placeholder:text-prosat-grey/50 text-sm px-4 py-3 rounded outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-year" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                      Ano *
                    </label>
                    <input
                      id="quote-year"
                      name="year"
                      type="number"
                      required
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      placeholder="2023"
                      className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke placeholder:text-prosat-grey/50 text-sm px-4 py-3 rounded outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Placa */}
                <div>
                  <label htmlFor="quote-plate" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                    Placa do veículo *
                  </label>
                  <input
                    id="quote-plate"
                    name="plate"
                    type="text"
                    required
                    placeholder="AAA-0000 ou AAA0A00"
                    maxLength={8}
                    className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke placeholder:text-prosat-grey/50 text-sm px-4 py-3 rounded outline-none transition-colors uppercase"
                  />
                </div>

                {/* Telefone + E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="quote-phone" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke placeholder:text-prosat-grey/50 text-sm px-4 py-3 rounded outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-email" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                      E-mail *
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke placeholder:text-prosat-grey/50 text-sm px-4 py-3 rounded outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Estado de instalação */}
                <div>
                  <label htmlFor="quote-state" className="block text-xs font-medium text-prosat-grey mb-1.5 uppercase tracking-wider">
                    Estado de instalação *
                  </label>
                  <select
                    id="quote-state"
                    name="state"
                    required
                    defaultValue=""
                    className="w-full bg-[#1a141a] border border-camel/10 focus:border-camel/50 text-white-smoke text-sm px-4 py-3 rounded outline-none transition-colors"
                  >
                    <option value="" disabled>Selecione o estado</option>
                    {BRAZILIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Botão de envio */}
                <button
                  type="submit"
                  className="w-full bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm py-4 px-6 rounded transition-colors mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
                >
                  Enviar solicitação
                </button>

                <p className="text-prosat-grey/50 text-xs text-center">
                  Ao enviar, você concorda com nossa política de privacidade.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
