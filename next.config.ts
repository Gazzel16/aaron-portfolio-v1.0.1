import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/Dashboard-v3",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
