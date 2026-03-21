import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      },
    },
  },
  redirects: async () => {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: false,
      },
      {
        source: "/staff",
        destination: "/staff/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
