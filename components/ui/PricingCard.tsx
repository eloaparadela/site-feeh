'use client'

import { type PricingPlan } from '@/data/siteData'
import { whatsapp } from '@/data/siteData'
import Link from 'next/link'
import SmartImage from '@/components/ui/SmartImage'
import { trackContact } from '@/lib/tracking'
import { normalizeVehicleType } from '@/lib/attribution'

const vehicleIconSrc: Record<PricingPlan['icon'], string> = {
  truck: '/images/icons/truck.png',
  van: '/images/icons/van.png',
  motorcycle: '/images/icons/motorcycle.png',
  car: '/images/icons/car.png',
}

function VehicleIcon({ type }: { type: PricingPlan['icon'] }) {
  return (
    <SmartImage
      src={vehicleIconSrc[type]}
      alt=""
      width={112}
      height={72}
      className="h-9 w-auto max-w-[120px] object-contain"
      placeholderText=""
      placeholderClassName="w-14 h-9"
    />
  )
}

interface PricingCardProps {
  plan: PricingPlan
  onContractClick: (plan: PricingPlan) => void
}

export default function PricingCard({ plan, onContractClick }: PricingCardProps) {
  const waLink = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(plan.whatsappMessage)}`

  return (
    <article
      className="bg-[#100c10] border border-camel/15 hover:border-camel/40 rounded-lg flex flex-col p-6 lg:p-7 transition-all duration-300 group"
      aria-label={`Plano ${plan.vehicleType}`}
    >
      {/* Ícone + Tipo */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="opacity-80 group-hover:opacity-100 transition-opacity mb-3">
          <VehicleIcon type={plan.icon} />
        </div>
        <h3 className="text-white-smoke font-bold text-lg tracking-wide">
          {plan.vehicleType}
        </h3>
      </div>

      {/* Descrição */}
      <p className="text-prosat-grey text-sm leading-relaxed text-center mb-6 flex-1">
        {plan.description}
      </p>

      {/* Preço */}
      <div className="text-center mb-2">
        <p className="text-xs text-prosat-grey uppercase tracking-wider mb-1">A partir de</p>
        <div className="flex items-start justify-center gap-1">
          <span className="text-camel text-lg font-bold mt-1">R$</span>
          <span className="text-camel text-5xl font-black leading-none">
            {plan.monthlyPrice.split(',')[0]}
          </span>
          <div className="flex flex-col justify-start mt-1">
            <span className="text-camel text-lg font-bold">,{plan.monthlyPrice.split(',')[1]}</span>
            <span className="text-prosat-grey text-xs">/mês</span>
          </div>
        </div>
      </div>

      {/* Taxa de instalação */}
      <p className="text-prosat-grey text-xs text-center mb-6 leading-relaxed">
        {plan.installationNote}
      </p>

      {/* Linha divisória */}
      <div className="border-t border-camel/10 mb-5" aria-hidden="true" />

      {/* CTAs */}
      <div className="space-y-2.5">
        {/* Contrate Online */}
        <button
          onClick={() => {
            trackContact({ contact_method: 'quote', cta_name: 'pricing_card_contratar', cta_location: 'pricing_card', service_name: plan.vehicleType, vehicle_type: normalizeVehicleType(plan.vehicleType) })
            onContractClick(plan)
          }}
          className="w-full bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm py-3 px-4 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
        >
          Contrate Online
        </button>

        {/* WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact({ contact_method: 'whatsapp', cta_name: 'pricing_card_whatsapp', cta_location: 'pricing_card', service_name: plan.vehicleType, vehicle_type: normalizeVehicleType(plan.vehicleType) })}
          className="w-full inline-flex items-center justify-center gap-2 border border-[#25D366]/30 hover:border-[#25D366]/60 hover:bg-[#25D366]/5 text-[#25D366] text-sm py-2.5 px-4 rounded transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp de Vendas
        </a>

        {/* Saiba Mais */}
        <div className="text-center pt-1">
          <Link
            href={plan.learnMoreLink}
            className="text-xs text-prosat-grey hover:text-camel transition-colors inline-flex items-center gap-1"
          >
            Saiba Mais
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
