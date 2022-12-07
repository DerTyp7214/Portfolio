/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  compress: true,
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
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  }
}

module.exports = nextConfig
