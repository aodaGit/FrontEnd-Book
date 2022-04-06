//生产环境打包配置
// webpack.prod.js

const webpackConfig = require("./webpack.common.js");
const WebpackMerge = require("webpack-merge");

//css压缩
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 命令行提示美化
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

//静态文件赋值
// const CopyWebpackPlugin = require("copy-webpack-plugin");
//js压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = WebpackMerge.merge(webpackConfig, {
  stats: 'errors-only',
  mode: "production",
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["项目正在打包，请稍等..."],
      },
      clearConsole: true,
    }),
  ],
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
  // CDN引入第三方包
  externals: {
    'react': 'React',   //属性为包名，值为项目中使用的命名
    'react-dom': 'ReactDOM',
    lodash: {
      commonjs: "lodash",
      amd: "lodash",
      root: "_" // 指向全局变量
    }
  },
});
