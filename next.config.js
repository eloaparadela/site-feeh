/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/site-feeh',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
