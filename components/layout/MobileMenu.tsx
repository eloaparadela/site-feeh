'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { menuLinks, whatsapp } from '@/data/siteData'
import SocialIcons from '@/components/ui/SocialIcons'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-onyx border-l border-camel/20 z-50 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Header do menu */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-camel/10">
          <span className="text-camel font-bold text-sm tracking-widest uppercase">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-camel transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel rounded"
            aria-label="Fechar menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links de navegação */}
        <ul className="flex flex-col py-4 flex-1 overflow-y-auto">
          {menuLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 px-6 py-4 text-white/80 hover:text-camel hover:bg-camel/5 transition-colors text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-camel"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Rodapé do menu */}
        <div className="border-t border-camel/10 px-6 py-5 space-y-4">
          <a
            href="#orcamento"
            onClick={onClose}
            className="block w-full bg-camel hover:bg-soft-fawn text-onyx font-bold text-center py-3 px-4 rounded transition-colors text-sm"
          >
            Orçamento
          </a>
          <a
            href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.salesMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-center py-3 px-4 rounded transition-colors text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp de Vendas
          </a>
          <SocialIcons className="justify-center pt-2" />
        </div>
      </nav>
    </>
  )
}
