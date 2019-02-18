module.exports = {
  devServer: {
    port: 8081,
    disableHostCheck: true
  },
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: 'web/front',
  transpileDependencies: ['lputils'],
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://cdn.didabisai.com/merchant/front/'
      : 'front'
}
