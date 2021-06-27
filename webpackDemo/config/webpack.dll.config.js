// 第三方依赖包抽离

const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: {
        // 想要抽离的第三方包
        vendor: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../static'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
        // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            //生成的mainfest文件路径
            path: path.resolve(__dirname, '../static/[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        })
    ]
};
