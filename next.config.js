/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Демонстрационные фото блюд берём из открытого стока Unsplash.
    // На следующем этапе заменяются на собственные фотографии бренда.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
