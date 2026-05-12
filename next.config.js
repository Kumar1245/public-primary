/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "public-primary.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ad-listing.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },

    ],
  },
};

module.exports = nextConfig;
