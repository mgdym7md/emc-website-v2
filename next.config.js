/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
      },
      // Production Strapi domain - set STRAPI_HOSTNAME in .env
      ...(process.env.STRAPI_HOSTNAME ? [{
        protocol: 'https',
        hostname: process.env.STRAPI_HOSTNAME,
      }] : []),
    ],
  },
  output: 'standalone',
  env: {
    STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
  },
}

module.exports = nextConfig
