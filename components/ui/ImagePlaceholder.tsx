interface ImagePlaceholderProps {
  text?: string
  className?: string
  dark?: boolean
  aspectRatio?: string
}

export default function ImagePlaceholder({
  text = 'Substituir imagem aqui',
  className = '',
  dark = true,
  aspectRatio,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`
        flex items-center justify-center
        border-2 border-dashed
        ${dark ? 'bg-[#1a1212] border-[#B4995A]/30' : 'bg-[#e8e4dc] border-[#B4995A]/40'}
        ${className}
      `}
      style={aspectRatio ? { aspectRatio } : undefined}
      role="img"
      aria-label={text}
    >
      <div className="text-center px-4 py-6 select-none pointer-events-none">
        <svg
          className={`mx-auto mb-3 w-10 h-10 ${dark ? 'text-camel/40' : 'text-camel/50'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p
          className={`text-xs font-medium tracking-wide uppercase ${
            dark ? 'text-camel/50' : 'text-camel/60'
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
