import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['portfolio-website-snowy.vercel.app','res.cloudinary.com'],
  },
};

export default nextConfig;
