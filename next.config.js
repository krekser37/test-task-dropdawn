/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
      config.module.rules.push({
          test: /\.svg$/,
          issuer: /\.(js|jsx|ts)x?$/,
          use: [
              {
                  loader: "@svgr/webpack",
                  options: {
                      svgoConfig: {
                          plugins: [
                              {
                                  name: "removeViewBox",
                                  active: false,
                              },
                          ],
                      },
                  },
              },
          ],
      });

      return config;
  },
};

module.exports = nextConfig
