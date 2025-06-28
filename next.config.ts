import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // TODO: Set production url to image bucket
        protocol: "https",
        hostname: "gerddjgwavrjqoobbihh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
