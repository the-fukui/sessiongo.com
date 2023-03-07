/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: [
      'pages',
      'components',
      'lib',
      'src',
      'features',
      'infrastructures',
      'utils',
      'state',
      'test',
      'types',
    ],
  },
}

module.exports = nextConfig
