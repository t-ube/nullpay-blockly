/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/api/notion/:path*',
        destination: 'https://api.notion.com/:path*',
        permanent: true
      },
    ]
  },
};

export default nextConfig;
