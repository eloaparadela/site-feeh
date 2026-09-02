/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/site-feeh' : '',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
