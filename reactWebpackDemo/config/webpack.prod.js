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
      //js压缩优化
      new UglifyJsPlugin({
        exclude: /\.min\.js$/,
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      //css压缩优化
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ],
    splitChunks: {
      chunks: "all",  //同时分割同步和异步代码
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
        },
        //公共组件，方法等隔离打包
        commons: {
          test: /[\\/]src[\\/]common[\\/]/, //根据实际情况修改公共文件目录
          name: 'commons',
          minSize: 30000,
          minChunks: 2,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      },
    },
  },
});
