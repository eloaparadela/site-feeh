'use client'

import { useState, type ReactNode } from 'react'
import Image, { type ImageProps } from 'next/image'
import ImagePlaceholder from './ImagePlaceholder'

interface SmartImageProps extends ImageProps {
  /** Texto mostrado na caixa de referência enquanto o arquivo real não existir */
  placeholderText?: string
  placeholderClassName?: string
  placeholderAspectRatio?: string
  placeholderDark?: boolean
  /** Conteúdo alternativo customizado, no lugar da caixa de referência padrão */
  fallback?: ReactNode
  /**
   * Aplica o tratamento de cor central (filtro + véu semi-transparente)
   * definido em `app/globals.css` → bloco "TRATAMENTO DE COR DAS FOTOS".
   * Só vale para fotos full-bleed (com `fill`). Passe `treatment={false}`
   * para desligar numa imagem específica. Padrão: true.
   */
  treatment?: boolean
}

export default function SmartImage({
  placeholderText,
  placeholderClassName,
  placeholderAspectRatio,
  placeholderDark = true,
  fallback,
  treatment = true,
  className,
  onError,
  ...imgProps
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  // O next/image não prefixa o basePath no src (só nos assets de _next/).
  // No GitHub Pages o site fica em /site-feeh/, então precisamos adicionar
  // o prefixo à mão em caminhos internos (que começam com "/").
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const rawSrc = imgProps.src
  const src =
    typeof rawSrc === 'string' && rawSrc.startsWith('/') && !rawSrc.startsWith('//')
      ? `${basePath}${rawSrc}`
      : rawSrc

  if (failed) {
    if (fallback) return <>{fallback}</>
    return (
      <ImagePlaceholder
        text={placeholderText}
        className={placeholderClassName ?? (typeof className === 'string' ? className : 'w-full h-full')}
        aspectRatio={placeholderAspectRatio}
        dark={placeholderDark}
      />
    )
  }

  // O tratamento de cor só é aplicado em fotos full-bleed (fill),
  // deixando de fora a logo e outras imagens com tamanho fixo.
  const treated = treatment && Boolean(imgProps.fill)
  const imgClassName = treated
    ? [className, 'smart-photo'].filter(Boolean).join(' ')
    : className

  return (
    <>
      <Image
        {...imgProps}
        src={src}
        className={imgClassName}
        onError={(e) => {
          setFailed(true)
          onError?.(e)
        }}
      />
      {treated && <span className="smart-photo-veil" aria-hidden="true" />}
    </>
  )
}
