//开发环境打包配置
// webpack.dev.js
const path = require('path')

const Webpack = require('webpack')

//引入基础打包配置
const webpackConfig = require('./webpack.common.js')

//合并打包配置
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(webpackConfig, {
  mode: "development",
  stats: 'minimal',
  //设置代码sorce-map
  devtool: "inline-source-map",
  //设置代码热更新
  devServer: {
    open:true,
    port: 3000, //端口
    compress: true,    //是否启用gzip压缩
    host: 'localhost',
    hot: true,
    // host: '',   //特定域名启动 --host 0.0.28.26.
    historyApiFallback: true,   //404特定页面
    contentBase: '../dist/', //默认打开的目录
    inline:true,    //实时刷新
    proxy: {   //代理配置
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    },
  },
  plugins: [
    //设置热更新
    new Webpack.HotModuleReplacementPlugin(),
  ],
  // 热更新必须配这个！！！，不配不会热更新
  target: 'web'
})
