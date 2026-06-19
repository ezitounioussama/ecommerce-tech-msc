import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@aws-sdk/client-s3"],
  },
};

export default nextConfig;
