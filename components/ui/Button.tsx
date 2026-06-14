'use client'

import Link from 'next/link'
import { type ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'whatsapp' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  external?: boolean
  className?: string
  ariaLabel?: string
  disabled?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-camel hover:bg-soft-fawn text-onyx font-bold border-2 border-camel hover:border-soft-fawn',
  outline:
    'bg-transparent border-2 border-white-smoke text-white-smoke hover:bg-white-smoke hover:text-onyx',
  ghost:
    'bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white-smoke',
  whatsapp:
    'bg-[#25D366] hover:bg-[#1ebe5d] border-2 border-[#25D366] hover:border-[#1ebe5d] text-white font-bold',
  dark:
    'bg-onyx hover:bg-onyx/80 border-2 border-camel/40 hover:border-camel text-white-smoke',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm lg:text-base',
  lg: 'px-8 py-4 text-base lg:text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  external = false,
  className = '',
  ariaLabel,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    transition-all duration-200 ease-in-out
    focus-ring rounded
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
    ${className}
  `.trim()

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
