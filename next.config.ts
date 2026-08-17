import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Memaksa Next.js mengabaikan pembungkusan internal pdf-parse
  serverExternalPackages: ["pdf-parse"],

  // 2. Memberi tahu webpack untuk mengabaikan modul opsional bawaan pdf-parse (canvas) yang merusak build Vercel
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "canvas", "pdfjs-dist"];
    }
    return config;
  },
};

export default nextConfig;
