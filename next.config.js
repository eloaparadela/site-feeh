/** @type {import('next').NextConfig} */

// basePath define a "subpasta" em que o site é servido.
//  - GitHub Pages: o workflow define PAGES_BASE_PATH=/site-feeh
//  - Hostinger / domínio próprio (raiz): não defina nada -> basePath vazio
const basePath = process.env.PAGES_BASE_PATH ?? ''

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
