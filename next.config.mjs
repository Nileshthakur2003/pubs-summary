/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Enable experimental suspense handling only when properly implemented
      missingSuspenseWithCSRBailout: false,
    },
  };
  
  export default nextConfig;