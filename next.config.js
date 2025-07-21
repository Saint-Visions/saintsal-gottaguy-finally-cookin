/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['@builder.io/sdk-react'],
  images: {
    domains: ['cdn.builder.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/api/v1/image/assets/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BUILDER_API_KEY: process.env.NEXT_PUBLIC_BUILDER_API_KEY || '065997bd13e4442e888a06852fcd61ba',
  },
  async redirects() {
    return [
      {
        source: '/client/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
};

module.exports = nextConfig;
