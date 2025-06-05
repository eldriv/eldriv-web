/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing SVG configuration
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },

  // Production optimizations for Railway
  reactStrictMode: true,
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    // Add domains if you're loading external images
    // domains: ['example.com'],
  },
  
  // Bundle analyzer (optional - for development only)
  // Uncomment to analyze bundle size
  // ...(process.env.ANALYZE === 'true' && {
  //   experimental: {
  //     bundleAnalyzer: {
  //       enabled: true,
  //     },
  //   },
  // }),

  // Optional: Enable standalone output for better performance
  // output: 'standalone',
  
  // Optional: Custom headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
};

export default nextConfig;