'use client'

import { type PricingPlan } from '@/data/siteData'
import { whatsapp } from '@/data/siteData'
import Link from 'next/link'

function TruckIcon() {
  return (
    <svg viewBox="0 0 56 36" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-14 h-9" aria-hidden="true">
      {/* Carroceria / trailer */}
      <rect x="17" y="5" width="36" height="20" rx="1.5" />
      {/* Cabine */}
      <path d="M2 25 L2 13 L7 5 L17 5 L17 25" />
      {/* Para-brisa (preenchimento suave) */}
      <path d="M3.5 16.5 L7 7 L17 7 L17 16.5 Z" fill="currentColor" fillOpacity="0.15" stroke="none" />
      {/* Para-brisa borda */}
      <path d="M3.5 16.5 L7 7 L17 7 L17 16.5" />
      {/* Escapamento */}
      <line x1="9.5" y1="5" x2="9.5" y2="1.5" strokeWidth={2} />
      {/* Chassi */}
      <line x1="2" y1="25" x2="53" y2="25" strokeWidth={1.4} />
      {/* Rodas */}
      <circle cx="9" cy="29" r="4.5" />
      <circle cx="34" cy="29" r="4.5" />
      <circle cx="44" cy="29" r="4.5" />
      {/* Cubos */}
      <circle cx="9" cy="29" r="1.3" fill="currentColor" />
      <circle cx="34" cy="29" r="1.3" fill="currentColor" />
      <circle cx="44" cy="29" r="1.3" fill="currentColor" />
      {/* Divisória cabine-carroceria */}
      <line x1="17" y1="5" x2="17" y2="25" />
    </svg>
  )
}

function VanIcon() {
  return (
    <svg viewBox="0 0 56 36" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-14 h-9" aria-hidden="true">
      {/* Corpo principal */}
      <path d="M3 25 L3 9 L9 4 L51 4 L53 8 L53 25" />
      {/* Para-brisa inclinado */}
      <path d="M5 19 L9 5 L22 5 L22 19" />
      {/* Para-brisa preenchido */}
      <path d="M5 19 L9 5 L22 5 L22 19 Z" fill="currentColor" fillOpacity="0.13" stroke="none" />
      {/* Janela lateral dianteira */}
      <rect x="24" y="7" width="9" height="9" rx="1" />
      <rect x="24" y="7" width="9" height="9" rx="1" fill="currentColor" fillOpacity="0.12" stroke="none" />
      {/* Janela lateral traseira */}
      <rect x="35" y="7" width="9" height="9" rx="1" />
      <rect x="35" y="7" width="9" height="9" rx="1" fill="currentColor" fillOpacity="0.12" stroke="none" />
      {/* Divisória (porta deslizante) */}
      <line x1="22" y1="5" x2="22" y2="25" strokeWidth={1.4} />
      {/* Chassi */}
      <line x1="3" y1="25" x2="53" y2="25" strokeWidth={1.4} />
      {/* Rodas */}
      <circle cx="13" cy="29" r="4.5" />
      <circle cx="43" cy="29" r="4.5" />
      {/* Cubos */}
      <circle cx="13" cy="29" r="1.3" fill="currentColor" />
      <circle cx="43" cy="29" r="1.3" fill="currentColor" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 56 34" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-14 h-9" aria-hidden="true">
      {/* Corpo inferior */}
      <path d="M2 22 L3 17 L8 17 L50 17 L53 22" />
      {/* Teto e para-brisa */}
      <path d="M9 17 L14 8 L40 8 L46 17" />
      {/* Pilar A (dianteiro) */}
      <line x1="14" y1="8" x2="14" y2="17" />
      {/* Pilar B (central) */}
      <line x1="28" y1="8.5" x2="28" y2="17" strokeWidth={1.4} />
      {/* Pilar C (traseiro) */}
      <line x1="40" y1="8" x2="40" y2="17" />
      {/* Para-brisa dianteiro (preenchido) */}
      <path d="M14.5 8.5 L14.5 17 L28 17 L28 8.5 Z" fill="currentColor" fillOpacity="0.13" stroke="none" />
      {/* Vidro traseiro (preenchido) */}
      <path d="M28.5 8.5 L28.5 17 L39.5 17 L39.5 8.5 Z" fill="currentColor" fillOpacity="0.13" stroke="none" />
      {/* Capô */}
      <path d="M50 17 L54 17 L53 22" strokeWidth={1.4} />
      {/* Porta-malas */}
      <path d="M2 22 L3 17" strokeWidth={1.4} />
      {/* Chassi */}
      <line x1="6" y1="22" x2="50" y2="22" strokeWidth={1.4} />
      {/* Rodas */}
      <circle cx="14" cy="26" r="4.5" />
      <circle cx="41" cy="26" r="4.5" />
      {/* Cubos */}
      <circle cx="14" cy="26" r="1.3" fill="currentColor" />
      <circle cx="41" cy="26" r="1.3" fill="currentColor" />
    </svg>
  )
}

function MotorcycleIcon() {
  return (
    <svg viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-14 h-9" aria-hidden="true">
      {/* Garfo dianteiro */}
      <path d="M15 21 L10 32" />
      {/* Braço traseiro (swing arm) */}
      <path d="M38 23 L44 32" />
      {/* Quadro principal */}
      <path d="M16 21 L22 14 L34 14 L40 23" />
      {/* Tanque de combustível */}
      <path d="M22 14 L24 10 L32 10 L34 14" />
      {/* Tanque preenchido */}
      <path d="M22 14 L24 10 L32 10 L34 14 Z" fill="currentColor" fillOpacity="0.15" stroke="none" />
      {/* Motor / bloco */}
      <rect x="23" y="18" width="12" height="9" rx="1.5" />
      <rect x="23" y="18" width="12" height="9" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="none" />
      {/* Assento */}
      <path d="M26 13.5 L36 13 L40 15" strokeWidth={1.4} />
      {/* Guidão */}
      <path d="M15 21 L15 15 L10 14 M15 15 L20 13.5" />
      {/* Escapamento */}
      <path d="M35 25 L43 28 L48 28" />
      {/* Roda dianteira */}
      <circle cx="10" cy="34" r="6" />
      {/* Roda traseira */}
      <circle cx="44" cy="34" r="6" />
      {/* Cubos */}
      <circle cx="10" cy="34" r="1.5" fill="currentColor" />
      <circle cx="44" cy="34" r="1.5" fill="currentColor" />
      {/* Raios dianteiros (simplificados) */}
      <line x1="10" y1="28" x2="10" y2="34" strokeWidth={1} />
      <line x1="4" y1="34" x2="10" y2="34" strokeWidth={1} />
      {/* Raios traseiros */}
      <line x1="44" y1="28" x2="44" y2="34" strokeWidth={1} />
      <line x1="38" y1="34" x2="44" y2="34" strokeWidth={1} />
    </svg>
  )
}

function VehicleIcon({ type }: { type: PricingPlan['icon'] }) {
  if (type === 'truck') return <TruckIcon />
  if (type === 'van') return <VanIcon />
  if (type === 'motorcycle') return <MotorcycleIcon />
  return <CarIcon />
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
        <div className="text-camel/60 group-hover:text-camel transition-colors mb-3">
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
          onClick={() => onContractClick(plan)}
          className="w-full bg-camel hover:bg-soft-fawn text-onyx font-bold text-sm py-3 px-4 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel"
        >
          Contrate Online
        </button>

        {/* WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
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
