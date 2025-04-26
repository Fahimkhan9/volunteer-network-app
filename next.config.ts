import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   // !! WARN !!
   ignoreBuildErrors: true,
  //  images:{
  //   remotePatterns:[new URL('https://portfolio-website-snowy.vercel.app/_next/image?url=%2Fheroimg.svg&w=1080&q=75'),new URL('https://res.cloudinary.com/dswzdpmqj/image/upload/')]
  //  }
  images: {
    domains: ['portfolio-website-snowy.vercel.app','res.cloudinary.com'],
  },
};

export default nextConfig;
