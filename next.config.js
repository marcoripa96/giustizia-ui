/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  experimental: {
    emotion: true
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: process.env.NEXT_PUBLIC_BASE_PATH,
        permanent: true,
        basePath: false
      },
      {
        source: '/',
        destination: '/infer',
        permanent: true,
      },
    ]
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = nextConfig
