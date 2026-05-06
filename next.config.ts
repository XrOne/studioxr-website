import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    taint: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
