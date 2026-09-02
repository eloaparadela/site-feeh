/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/site-feeh' : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  // Exposto para o cliente porque o next/image NÃO prefixa o basePath
  // automaticamente no src das imagens (ver components/ui/SmartImage.tsx).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
