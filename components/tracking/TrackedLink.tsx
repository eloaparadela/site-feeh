'use client'

import type { AnchorHTMLAttributes } from 'react'
import { trackContact, type ContactParams } from '@/lib/tracking'

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  contact: ContactParams
}

/**
 * Link/âncora comum (<a>) que dispara trackContact() no clique antes de
 * navegar. Usado dentro de páginas que são Server Components (têm
 * `export const metadata`) e por isso não podem ter onClick direto —
 * este componente isola o único pedaço que precisa ser client-side.
 */
export default function TrackedLink({ contact, onClick, children, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackContact(contact)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
