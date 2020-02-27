const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  css: { extract: false },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "true",
        generateStatsFile: false,
        statsOptions: { source: false }
      })
    ]
  }
};
