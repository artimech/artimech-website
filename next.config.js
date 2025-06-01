/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Enable optimizations for production
    optimizeCss: true,
  },
}

module.exports = nextConfig 