//生产环境打包配置

const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')

//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

//js压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        //拷贝指定静态资源到指定目录
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist')
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            //js压缩
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            //css压缩
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        }
    }
})
