//开发环境打包配置
const Webpack = require('webpack')
//引入基础打包配置
const webpackConfig = require('./webpack.config.js')

//合并打包配置
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge(webpackConfig,{
  mode:'development',
  //设置代码sorce-map
  devtool:'cheap-module-eval-source-map',

  //设置代码热更新
  devServer:{
    port:3000,  //端口
    hot:true,
    contentBase:'../dist'  //热更新目录
  },
  plugins:[
      //设置热更新
    new Webpack.HotModuleReplacementPlugin()
  ]
})
