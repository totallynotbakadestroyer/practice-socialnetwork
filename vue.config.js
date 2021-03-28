module.exports = {
  transpileDependencies: ['vuetify'],
  outputDir: './public',
  assetsDir: 'static',
  devServer: {
    proxy: 'http://localhost:8889',
  },
};
