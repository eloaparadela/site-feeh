import Link from 'next/link'
import { brand, footerLinks, whatsapp } from '@/data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="theme-section-bg border-t theme-border-color" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Coluna 1 — Logo + descrição */}
          <div className="lg:col-span-1">
            {/*
              SUBSTITUIR AQUI: Troque pelo logo real.
              Exemplo:
              <Image src="/logo-prosat.svg" alt="Prosat" width={160} height={44} />
            */}
            <div className="mb-4">
              <span className="font-black text-xl tracking-widest text-[#B4995A] uppercase">
                {brand.logoPlaceholder}
              </span>
              <p className="text-[9px] tracking-[0.25em] theme-text-muted uppercase mt-0.5">
                {brand.tagline}
              </p>
            </div>
            <p className="theme-text-muted text-sm leading-relaxed max-w-xs">
              {brand.legalText}
            </p>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm text-[#25D366] hover:text-[#1ebe5d] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <h3 className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-5">
              Navegação
            </h3>
            <nav aria-label="Navegação do rodapé">
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm theme-text-muted hover:text-[#B4995A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Coluna 3 — Planos */}
          <div>
            <h3 className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-5">
              Planos
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Rastreamento de Caminhão', href: '/instalacao/caminhao' },
                { label: 'Rastreamento de Utilitário', href: '/instalacao/utilitario' },
                { label: 'Rastreamento de Carro Leve', href: '/instalacao/carro-leve' },
                { label: 'Rastreamento de Moto', href: '/instalacao/moto' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm theme-text-muted hover:text-[#B4995A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Redes sociais */}
          <div>
            <h3 className="text-[#B4995A] text-xs font-bold uppercase tracking-widest mb-5">
              Redes Sociais
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com/prosat' },
                { label: 'Facebook', href: 'https://facebook.com/prosat' },
                { label: 'WhatsApp', href: `https://wa.me/${whatsapp.number}` },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm theme-text-muted hover:text-[#B4995A] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-12 pt-8 border-t theme-border-color flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs theme-text-muted text-center sm:text-left">
            © {year} {brand.name} Sistema de Rastreamento. Todos os direitos reservados.
          </p>
          <p className="text-xs theme-text-muted opacity-60 text-center">
            Desenvolvido por Hubble Agency
          </p>
        </div>
      </div>
    </footer>
  )
}
