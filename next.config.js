/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'your-image-cdn.com'],
  },
  experimental: {
    serverActions: true,
  },
};