import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  metadata: {
    title: 'Best Real Estate in Mangalore - Vitu Realty',
    description: 'Find premium real estate properties in Mangalore with Vitu Realty. Trusted developers, best locations, and competitive prices.',
    metadataBase: new URL('https://www.viturealty.com'),
    alternates: { canonical: '/' },
    openGraph: {
      title: 'Vitu Realty - Best Real Estate in Mangalore',
      description: 'Explore top real estate projects in Mangalore. Verified listings, premium properties, and best prices.',
      url: 'https://www.viturealty.com',
      siteName: 'Vitu Realty',
      images: [{ url: 'https://www.viturealty.com/og-image.jpg', width: 1200, height: 630, alt: 'Vitu Realty' }],
      locale: 'en_IN',
      type: 'website',
    },
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/v0/b/viturealty.appspot.com/**' }],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: ['res.cloudinary.com'],
  },

  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemap' },
      { source: '/robots.txt', destination: '/api/robots' },
    ];
  },

  async redirects() {
    return [
      { source: '/properties', destination: '/projects', permanent: true },
      { source: '/mangalore-real-estate', destination: '/', permanent: true },
    ];
  },

  i18n: { locales: ['en-IN'], defaultLocale: 'en-IN' },

  compress: true,
  productionBrowserSourceMaps: false,

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Robots-Tag", value: "index, follow" }, 
      ],
    },
  ],
  
  webpack: (config) => {
    return config;
  },

  experimental: {
    serverActions: true,
    optimizePackageImports: ['framer-motion', 'swiper'],
    turbo: { resolveAlias: { '~': './src' } },
  },
};

export default bundleAnalyzer(nextConfig);
