/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // ✅ যোগ করলাম
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // ✅ Google photos
      },
    ],
  },
};

export default nextConfig;