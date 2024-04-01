/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Modify the Webpack configuration for both server and client builds
    if (!isServer) {
      // Enable exception catching for OpenCV.js
      config.module.rules.push({
        test: /\/opencv\.js$/,
        loader: 'exports-loader',
        options: {
          // Add the DISABLE_EXCEPTION_CATCHING flag to enable exception catching
          disable_exception_catching: 2, // Change this value as needed
        },
      });
    }

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
module.exports = nextConfig
