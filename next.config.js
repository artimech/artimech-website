/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/meet',
        destination: 'https://cal.com/artimech/15min',
        permanent: false, // set to true if you want a 308 permanent redirect
      },
    ]
  },
}

module.exports = nextConfig Dehradun