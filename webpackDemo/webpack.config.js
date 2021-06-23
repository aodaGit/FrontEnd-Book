const path = require("path");
module.exports = {
  // 环境切换
  mode: "development", // 默认生产模式
  // 入口文件设置
  entry: path.resolve(__dirname, "./src/main.js"),
  //   出口文件设置
  output: {
    filename: "[name].[hash:8].js", // 根据入口文件，生成添加哈希值的动态出口文件
    path: path.resolve(__dirname, "./dist"), // 打包后的目录文佳夹
  },
  //   自动引入打包后的js文件到html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
