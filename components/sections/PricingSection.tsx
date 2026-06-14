'use client'

import { useState } from 'react'
import { pricingPlans, pricingSection, installationFees, type PricingPlan } from '@/data/siteData'
import PricingCard from '@/components/ui/PricingCard'
import QuoteModal from '@/components/modals/QuoteModal'

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)

  return (
    <section id="orcamento" className="theme-section-bg py-16 lg:py-24" aria-label="Planos e orçamento">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">

        {/* Cabeçalho da seção */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-start gap-3 mb-4">
            <span className="w-1 min-h-[2.5rem] bg-[#B4995A] rounded-full shrink-0" aria-hidden="true" />
            <div>
              <h2 className="theme-text-primary text-xl md:text-2xl lg:text-3xl font-bold leading-tight uppercase">
                {pricingSection.headline}
              </h2>
              <p className="text-[#B4995A] text-base md:text-lg lg:text-xl font-bold uppercase mt-1">
                {pricingSection.subheadline}
              </p>
            </div>
          </div>
          <p className="theme-text-muted text-sm lg:text-base ml-4 max-w-2xl">
            {pricingSection.supportText}
          </p>
        </div>

        {/* Grid de cards — 1 col mobile | 2×2 tablet | 4 em linha xl+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onContractClick={setSelectedPlan} />
          ))}
        </div>

        {/* Taxas de instalação */}
        <div className="mt-10 p-5 lg:p-6 border theme-border-color rounded-lg theme-surface">
          <h3 className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-4">
            Taxas de Instalação e Ativação
          </h3>
          <ul className="space-y-2">
            {installationFees.map((fee) => (
              <li key={fee.id} className="flex items-start justify-between gap-4 text-sm">
                <span className="theme-text-muted">{fee.label}</span>
                <span className="theme-text-primary font-semibold shrink-0">{fee.value}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs theme-text-muted mt-4 opacity-70">
            * Os valores podem sofrer alteração de acordo com o perfil e localização do cliente.
          </p>
        </div>
      </div>

      {selectedPlan && (
        <QuoteModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  )
}
