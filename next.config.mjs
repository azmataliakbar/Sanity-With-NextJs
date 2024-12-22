// /** @type {import('next').NextConfig} */
/* const nextConfig = {};

export default nextConfig; */


// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'another-domain.com'], // Add your domains here
  },
};

export default nextConfig;



