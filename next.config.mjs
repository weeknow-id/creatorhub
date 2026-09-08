/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export untuk GitHub Pages (project page di /creatorhub/).
  // next/image otomatis ikut prefix; <img> biasa & url() CSS harus manual.
  output: "export",
  basePath: "/creatorhub",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
