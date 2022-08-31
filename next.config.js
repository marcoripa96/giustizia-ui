/** @type {import('next').NextConfig} */

const devRedirects = [
  {
    source: '/login',
    destination: '/infer',
    permanent: true,
  }
];

const getRedirects = () => {
  const dev = process.env.NODE_ENV === 'development' ? devRedirects : [];
  return [
    {
      source: '/',
      destination: '/infer',
      permanent: true,
    },
    // ...dev
  ]
}


const nextConfig = {
  reactStrictMode: true,
  experimental: {
    emotion: true
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  async redirects() {
    return getRedirects();
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = nextConfig
