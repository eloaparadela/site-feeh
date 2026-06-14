'use client'

import { useState, useEffect, useRef } from 'react'
import { exitPopupVariants } from '@/data/siteData'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

const VEHICLE_QUANTITIES = ['01 a 05', '06 a 15', '16 a 50', '51 a 250', 'Mais de 250']

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [useType, setUseType] = useState<'profissional' | 'pessoal'>('pessoal')
  const [vehicleQty, setVehicleQty] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const visibleRef = useRef(false)

  useEffect(() => { visibleRef.current = visible }, [visible])

  // Variante padrão (editável via siteData)
  const variant = exitPopupVariants.find((v) => v.isDefault) ?? exitPopupVariants[0]

  const close = () => setVisible(false)

  useEffect(() => {
    // Mobile: sem detecção confiável de saída real — não exibe
    if (window.innerWidth < 768) return

    // Desktop: dispara TODA VEZ que o mouse vai ao topo (rumo ao X ou barra de abas)
    // Só bloqueia se o popup já estiver aberto (evita disparo duplo)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || visibleRef.current) return
      setVisible(true)
    }

    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [])

  // ESC fecha
  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [visible])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    /*
      TODO: Integração com backend.
      Aqui conectar ao endpoint de captura de leads do pop-up de saída.
      ex: await fetch('/api/exit-leads', { method: 'POST', body: JSON.stringify(formData) })
    */
    setSubmitted(true)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      <div className="bg-white-smoke rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/70 relative">

        {/* Botão fechar */}
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 p-1.5 text-onyx/40 hover:text-onyx transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">

          {/* ── Lado esquerdo — Chamada ── */}
          <div className="md:w-[40%] bg-[#0F0A0F] flex flex-col justify-center items-start p-8 lg:p-10 rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
            <p className="text-camel text-xs font-bold uppercase tracking-widest mb-4">
              Prosat
            </p>
            <h2
              id="exit-popup-title"
              className="text-white-smoke text-xl lg:text-2xl font-bold leading-tight mb-4"
            >
              {variant.title}
            </h2>
            <p className="text-prosat-grey text-sm leading-relaxed mb-8">
              {variant.description}
            </p>

            {/*
              SUBSTITUIR ILUSTRAÇÃO: Troque ImagePlaceholder pela arte/ilustração final.
              Dimensão sugerida: 280x200px, fundo transparente ou escuro.
            */}
            <ImagePlaceholder
              text="Ilustração veículo rastreado • 280×200"
              className="w-full rounded-lg"
              aspectRatio="7/5"
              dark
            />
          </div>

          {/* ── Lado direito — Formulário ── */}
          <div className="md:w-[60%] p-7 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-camel/10 border border-camel flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-camel" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-onyx font-bold text-lg mb-2">Cadastro recebido!</h3>
                <p className="text-onyx/60 text-sm">
                  Integração pendente.
                  {/* TODO: Substituir por mensagem real após integração com backend */}
                </p>
                <button
                  onClick={close}
                  className="mt-6 bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm px-8 py-3 rounded transition-colors"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {/* Tipo de uso */}
                <fieldset className="mb-5">
                  <legend className="text-xs font-bold uppercase tracking-wider text-onyx/60 mb-3">
                    Tipo de uso
                  </legend>
                  <div className="flex gap-5">
                    {(['profissional', 'pessoal'] as const).map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="useType"
                          value={type}
                          checked={useType === type}
                          onChange={() => setUseType(type)}
                          className="accent-camel w-4 h-4"
                        />
                        <span className="text-sm text-onyx capitalize">
                          Uso {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Nome */}
                <div className="mb-4">
                  <label htmlFor="exit-name" className="block text-xs font-medium text-onyx/60 mb-1.5 uppercase tracking-wider">
                    Nome
                  </label>
                  <input
                    id="exit-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Insira seu nome"
                    className="w-full bg-white border border-onyx/15 focus:border-camel/60 text-onyx placeholder:text-onyx/30 text-sm px-4 py-3 rounded outline-none transition-colors"
                  />
                </div>

                {/* E-mail + Telefone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label htmlFor="exit-email" className="block text-xs font-medium text-onyx/60 mb-1.5 uppercase tracking-wider">
                      E-mail
                    </label>
                    <input
                      id="exit-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Insira seu e-mail"
                      className="w-full bg-white border border-onyx/15 focus:border-camel/60 text-onyx placeholder:text-onyx/30 text-sm px-4 py-3 rounded outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="exit-phone" className="block text-xs font-medium text-onyx/60 mb-1.5 uppercase tracking-wider">
                      Telefone
                    </label>
                    <input
                      id="exit-phone"
                      name="phone"
                      type="tel"
                      placeholder="(XX) XXXX-XXXX"
                      className="w-full bg-white border border-onyx/15 focus:border-camel/60 text-onyx placeholder:text-onyx/30 text-sm px-4 py-3 rounded outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Quantidade de veículos */}
                <fieldset className="mb-6">
                  <legend className="block text-xs font-medium text-onyx/60 mb-2.5 uppercase tracking-wider">
                    Quantidade de veículos
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {VEHICLE_QUANTITIES.map((qty) => (
                      <label
                        key={qty}
                        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded border text-sm transition-colors ${
                          vehicleQty === qty
                            ? 'border-camel bg-camel/10 text-onyx'
                            : 'border-onyx/15 text-onyx/70 hover:border-camel/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="vehicleQty"
                          value={qty}
                          checked={vehicleQty === qty}
                          onChange={() => setVehicleQty(qty)}
                          className="sr-only"
                        />
                        {qty}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm py-4 px-6 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
                >
                  Quero uma cotação
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
