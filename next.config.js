/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
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

module.exports = nextConfig
