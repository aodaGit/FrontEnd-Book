//webpack基础配置

//webpack实例
const Webpack = require("webpack");

//静态文件复制
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

// html自动引入js
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 打包进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 清除上一次的打包缓存
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// css切割
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//vue文件处理器
// const vueLoaderPlugin = require("vue-loader/lib/plugin");

// 命令行提示美化
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

//当前开发环境
const devMode = process.argv.indexOf("--mode=production") === -1;

module.exports = {
  // 环境切换
  // mode: "development", // 默认生产模式
  // mode: "production", // 默认生产模式

  // 入口文件设置

  // 单文件入口
  entry: path.resolve(__dirname, "../src/index.js"),

  // 多文件入口，对应多出口文件
  // entry: {
  //   main: path.resolve(__dirname, "../src/main.js"),
  //   sub: path.resolve(__dirname, "../src/sub.js"),
  // },

  //   出口文件设置
  output: {
    filename: "[name].[hash:8].js", // 根据入口文件，生成添加哈希值的动态出口文件
    path: path.resolve(__dirname, "../dist"), // 打包后的目录文佳夹
    // 打包时，在包中不包含所属模块的信息的注释
    pathinfo: false
  },
  //   与html相关的配置
  plugins: [
    // 清除上一次的打包缓存
    new CleanWebpackPlugin(),

    // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
    new Webpack.optimize.ModuleConcatenationPlugin(),

    new HtmlWebpackPlugin({
      // 打包基础路径
      template: path.resolve(__dirname, "../public/index.html"),

      // 指定js脚本存放的位置，头部还是脚部
      inject: "head",

      // 指定生成的文件名称  慎用hash值，会使得打包无法检索
      filename: "index.html",

      // 多入口时，对应的入口模块名
      // chunks: ["main"],

      // 压缩设置
      minify: false, //默认生产环境压缩，开发环境不压缩
    }),
    // 打包友好提示
    new FriendlyErrorsWebpackPlugin(),

    new ProgressBarPlugin(),
    // css分割
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    //vue模版渲染
    // new vueLoaderPlugin(),

    // 复制特定文件到指定文件夹下
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public/favicon.ico"),
          to: path.resolve(__dirname, "../dist/static"),
        },
        {
          from: path.resolve(__dirname, "../public/manifest.json"),
          to: path.resolve(__dirname, "../dist/static"),
        },
      ],
    }),
  ],

  // 不同类型的文件打包配置
  module: {
    rules: [
      //打包缓存配置
      {
        test: /\.ext$/,
        use: ["cache-loader"],
        include: path.resolve(__dirname, "src"),
      },
      //vue文件解析打包
      // {
      //   test: /\.vue$/,
      //   use: [
      //     {
      //       loader: "vue-loader",
      //       options: {
      //         compilerOptions: {
      //           preserveWhitespace: false,
      //         },
      //       },
      //     },
      //   ],
      //   // 减少loder搜索范围
      //   include: [path.resolve(__dirname, 'src')],
      //   exclude: '/node_modules/'
      // },
      // js转义 ES6及以上转为ES5，js解析打包
      {
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,

        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"]
          },
        },
      },
      //css样式文件打包
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                // postcss-preset-env插件：帮postcss找到package.json中的browserslist配置，根据配置加载指定的兼容性样式      
                plugins: [require("postcss-preset-env")()],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
        exclude: /node_modules/,
      },
      //图片打包
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "url-loader", //url-load与file-loa配置使用，小于限制大小，转为base64，大于后，直接输出到相关文件目录中
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      // 媒体文件打包
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      // 字体文件打包
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  //vue文件处理
  // resolve: {
  //   alias: {
  //     vue$: "vue/dist/vue.runtime.esm.js",
  //     " @": path.resolve(__dirname, "../src"),
  //   },
  //   extensions: ["*", ".js", ".json", "css", ".vue"],
  // },
};
