//开发环境打包配置
// webpack.dev.js
const Webpack = require('webpack')
//引入基础打包配置
const webpackConfig = require('./webpack.common.js')
//合并打包配置
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(webpackConfig, {
  mode: "development",
  //设置代码sorce-map
  devtool: "inline-source-map",

  //设置代码热更新
  devServer: {
    port: 3000, //端口
    hot: true,
    contentBase: "../dist", //热更新目录
    proxy: {   //代理配置
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    },
    plugins: [
      //设置热更新
      new Webpack.HotModuleReplacementPlugin(),
    ],
  }
})
