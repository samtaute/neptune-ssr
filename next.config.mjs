/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    softboxKey: "fb529d256155b9c6",
    softboxBaseUrl: "https://fotoscapes.com/wp/v1/"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.fotoscapes.com',
        port: '',
        pathname: '/imgs/**'
      },
    ],
  },
};

export default nextConfig;
