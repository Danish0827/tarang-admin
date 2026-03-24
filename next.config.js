/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['n9aid9d4s8.ufs.sh'],
  },
};

module.exports = nextConfig;