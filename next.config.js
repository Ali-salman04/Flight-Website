// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint errors ignore karega build time par
  },
};

module.exports = nextConfig;
