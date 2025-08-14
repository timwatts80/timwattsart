/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/links',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default nextConfig
