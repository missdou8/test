module.exports = {
  devServer: {
    port: 8081,
    disableHostCheck: true
  },
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: "web/front",
  baseUrl: "front",
  configureWebpack: (config) => {
    config.entry = ["babel-polyfill", "./src/main.js"]
  },
};
