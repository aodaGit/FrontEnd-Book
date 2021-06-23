const path = require("path");
// 这一步必须在此引入，否则下面的使用会报错
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 清除上一次的打包缓存
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 环境切换
  mode: "development", // 默认生产模式
  // 入口文件设置

  // 单文件入口
  // entry: path.resolve(__dirname, "./src/main.js"),

  // 多文件入口，对应多出口文件
  entry: {
    main: path.resolve(__dirname, "./src/main.js"),
    sub: path.resolve(__dirname, "./src/sub.js"),
  },

  //   出口文件设置
  output: {
    filename: "[name].[hash:8].js", // 根据入口文件，生成添加哈希值的动态出口文件
    path: path.resolve(__dirname, "./dist"), // 打包后的目录文佳夹
  },
  //   自动引入打包后的js文件到html
  plugins: [
    // 清除上一次的打包缓存
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 打包基础路径
      template: path.resolve(__dirname, "./public/index.html"),

      // 指定生成的文件名称
      filename: "index.[hash:8].html",

      // 指定js脚本存放的位置，头部还是脚部
      inject: "head",

      // 多入口时，对应的入口模块名
      chunks: ["main"],

      // 压缩设置
      minify: false, //默认生产环境压缩，开发环境不压缩
    }),
    new HtmlWebpackPlugin({
      // 打包基础路径
      template: path.resolve(__dirname, "./public/sub.html"),

      // 指定生成的文件名称
      filename: "sub.[hash:8].html",

      // 指定js脚本存放的位置，头部还是脚部
      inject: "head",

      // 多入口时，对应的入口模块名
      chunks: ["sub"],

      // 压缩设置
      minify: false, //默认生产环境压缩，开发环境不压缩
    }),
  ],
};
