/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gogocdn.net"],
  },
  assetPrefix: "/animelux",
  rewrites() {
    return [
      {
        source: "/animelux/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
  env: {
    server: "http://localhost:4001",
  },
};

module.exports = nextConfig;
