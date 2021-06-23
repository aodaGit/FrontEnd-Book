const path = require("path");
// html自动引入js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清除上一次的打包缓存
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// css切割
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
  //   与html相关的配置
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
    // css分割
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    })
  ],

  // 不同类型的文件打包配置
  module: {
    //css样式文件打包
    rules: [
      //css样式文件打包
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'] // 先将less解析为css，再转换为css AST树，挂载到dom
      },
      //图片打包
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader', //url-load与file-loa配置使用，小于限制大小，转为base64，大于后，直接输出到相关文件目录中
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // 媒体文件打包
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // 字体文件打包
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      // js转义 ES6及以上转为ES5
      {
        test:/\.js$/,//支持js jsx ts tsx
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      },
    ]
  }
};
