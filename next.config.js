/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
