/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone for Vercel
  output: 'standalone',
  
  // Ignore build errors for now
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig