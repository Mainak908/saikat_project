import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Cross-Origin-Opener-Policy", value: "unsafe-none" }],
      },
    ];
  },
  experimental: {
    ppr: "incremental",
  },
  images: {
    domains: ["res.cloudinary.com"], // Add the Cloudinary domain here
  },
};

export default nextConfig;
