var merge = require("webpack-merge");

// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var Visualizer = require("webpack-visualizer-plugin");

// Configs
var baseConfig = require("./webpack.base.config");

// prod setup , optimizations
const prodConfiguration = env => {
  return merge([
    {
    // Subject to investigation. why? 
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all"
            }
          }
        },
        // splits common code into chunks
        // and generates a vendor.js file
        minimizer: [new UglifyJsPlugin()]
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: "./statistics.html" })
      ]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};
