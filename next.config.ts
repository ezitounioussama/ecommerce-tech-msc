import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  output: "standalone",
  serverExternalPackages: ["@aws-sdk/client-s3", "mongodb", "bson", "stripe"],
};

export default nextConfig;
