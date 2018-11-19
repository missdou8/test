module.exports = {
  devServer: {
    port: 8081,
    disableHostCheck: true
  },
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: "web/front",
  baseUrl:
  process.env.NODE_ENV === "production"
    ? "https://cdn.didabisai.com/merchant/front/"
    : "front",
  configureWebpack: (config) => {
    config.entry = ["@babel/polyfill", "./src/main.js"]
  },
};
