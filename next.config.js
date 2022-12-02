const withBundleAnalyzer = process.env.ANALYZE ? require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
}) : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  headers: async () => {
    return [
      {
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=86400, immutable',
          },
        ],
        source: '/(.*)',
      },
    ]
  },
  images: {
    unoptimized: true,
    domains: [
      'icon-widget.codersrank.io',
      'www.gstatic.com',
      'github.githubassets.com',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
      'play-lh.googleusercontent.com',
      'profile.codersrank.io',
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
