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

    let redirectRoutes = []

    if (process.env.NEXT_PUBLIC_BASE_PATH) {
      redirectRoutes = [
        {
          source: '/',
          destination: process.env.NEXT_PUBLIC_BASE_PATH,
          permanent: true,
          basePath: false
        },
        ...redirectRoutes
      ]
    }
    return redirectRoutes;
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = nextConfig
