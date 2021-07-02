//生产环境打包配置
// webpack.prod.js

const webpackConfig = require("./webpack.common.js");
const WebpackMerge = require("webpack-merge");

//css压缩
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//静态文件赋值
// const CopyWebpackPlugin = require("copy-webpack-plugin");

//js压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = WebpackMerge.merge(webpackConfig, {
  stats: 'errors-only',
  mode: "production",
  plugins: [],
  optimization: {
    minimizer: [
      //js压缩
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      //css压缩
      new OptimizeCssAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // 只打包初始时依赖的第三方
          minChunks: 2  //模块被引用2次以上的抽离
        },
        vendors: {  //拆分第三方库（通过npm|yarn安装的库）
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: -10
        }
      },
    },
  },
});
