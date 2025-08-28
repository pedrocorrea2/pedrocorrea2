const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/pedrocorrea2' : '',
  assetPrefix: isProd ? '/pedrocorrea2/' : '',
};
