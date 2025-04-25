/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  // 当你创建仓库后，如果需要，取消下面两行的注释并替换'van-gogh-3d-gallery'为你的实际仓库名
  basePath: '/van-gogh-3d-gallery',
  assetPrefix: '/van-gogh-3d-gallery/',
}

export default nextConfig