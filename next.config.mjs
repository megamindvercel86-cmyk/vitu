/** @type {import('next').NextConfig} */
const isStrictBuild = process.env.STRICT_BUILD === "true";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "react-icons/fa",
      "react-icons/md",
      "react-icons/io",
      "react-icons/bs",
      "react-icons/ri",
      "framer-motion"
    ],
  },
  eslint: {
    ignoreDuringBuilds: !isStrictBuild,
  },
  typescript: {
    ignoreBuildErrors: !isStrictBuild,
  },
};

export default nextConfig;
