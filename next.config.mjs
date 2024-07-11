/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      GEOCODING_API_KEY: process.env.GEOCODING_API_KEY,
      },
};

export default nextConfig;
