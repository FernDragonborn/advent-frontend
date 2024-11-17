/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.API_DOMAIN,
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: process.env.API_DOMAIN,
        pathname: '**',
      },
    ],
  },
  sassOptions: {
    prependData: `@import "@/styles/_variables.scss"; @import "@/styles/_mixins.scss";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            dimensions: false,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
