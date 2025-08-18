import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,

  // Image optimization settings
  images: {
    // For Docker, disable optimization. For Vercel, keep it enabled
    unoptimized: process.env.DOCKER_BUILD === "true",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
