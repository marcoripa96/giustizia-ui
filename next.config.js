/** @type {import('next').NextConfig} */

const prodConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/documents',
        permanent: true,
      }
    ]
  },
}

const devConfig = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/documents',
        permanent: true,
      }
    ]
  },
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    emotion: true
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  ...(process.env.NODE_ENV === 'production' && prodConfig),
  ...(process.env.NODE_ENV === 'development' && devConfig)
}

module.exports = nextConfig
