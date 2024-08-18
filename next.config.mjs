/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      GEOCODING_API_KEY: process.env.GEOCODING_API_KEY,
      SECRET: process.env.SECRET,
      BASE_URL: process.env.BASE_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      },
};

export default nextConfig;
