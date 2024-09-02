/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy requests from /api/* to the backend
        destination: 'http://localhost:7000/:path*' // Your backend URL
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  env: {
    PILOT_BASE_URL: process.env.PILOT_BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    AWS_URL: process.env.AWS_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trexoprouatnew.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};


module.exports = withNextIntl(nextConfig);