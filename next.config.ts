/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Removed 'output: export' to enable server-side functionality for database
  images: {
    unoptimized: true
  },
}

export default nextConfig
