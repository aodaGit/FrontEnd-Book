//webpack基础配置

//webpack实例
// const Webpack = require("webpack");

//静态文件赋值
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

// html自动引入js
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 清除上一次的打包缓存
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// css切割
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//vue文件处理器
// const vueLoaderPlugin = require("vue-loader/lib/plugin");

// 命令行提示美化
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 打包进度
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')

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
  },
  //   与html相关的配置
  plugins: [
    // 清除上一次的打包缓存
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      // 打包基础路径
      template: path.resolve(__dirname, "../public/index.html"),

      // 指定生成的文件名称
      filename: "index.[hash:8].html",

      // 指定js脚本存放的位置，头部还是脚部
      inject: "head",

      // 多入口时，对应的入口模块名
      // chunks: ["main"],

      // 压缩设置
      minify: false, //默认生产环境压缩，开发环境不压缩 
    }),
    // new HtmlWebpackPlugin({
    //   // 打包基础路径
    //   template: path.resolve(__dirname, "../public/sub.html"),

    //   // 指定生成的文件名称
    //   filename: "sub.[hash:8].html",

    //   // 指定js脚本存放的位置，头部还是脚部
    //   inject: "head",

    //   // 多入口时，对应的入口模块名
    //   chunks: ["sub"],

    //   // 压缩设置
    //   minify: false, //默认生产环境压缩，开发环境不压缩
    // }),

    // 打包友好提示
    new FriendlyErrorsWebpackPlugin(),

    // 打包进度提示
    new ProgressBarWebpackPlugin(),


    // css分割
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    //vue模版渲染
    // new vueLoaderPlugin(),
    // 复制特定文件到指定文件夹下
    // new CopyWebpackPlugin({
    //   patterns: [
    //     // 将抽离的第三方文件拷贝到压缩文档中
    //     {
    //       from: path.resolve(__dirname, "../static"),
    //       to: path.resolve(__dirname, "../dist/static"),
    //     },
    //   ],
    // }),
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
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                  },
                  corejs: {
                    version: "3",
                  },//新版本需要指定核⼼库版本
                  modules: false, // 推荐
                  useBuiltIns: "usage"//按需注⼊
                }
              ],

            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 3 // 指定 runtime-corejs 版本，目前3为最新版本
                }
              ]
            ]
          },
        }
      },
      //css样式文件打包
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,   //css-module
      //         importLoaders: 1,
      //         localIdentName: "[name]__[local]___[hash:base64:5]"     //5位哈希命名
      //       },
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             require("postcss-preset-env")(),
      //           ]
      //         }
      //       }
      //     },
      //   ],
      // },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {   //css-module
                localIdentName: "[name]__[local]___[hash:base64:5]"     //5位哈希命名
              },
              // importLoaders: 1,
            },
          },
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-preset-env")()
                ]
              }
            }
          },
        ],
      },
      //图片打包
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "images/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 //超过10kb不转base64
          }
        }
      },
      // 媒体文件打包
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "media/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 //超过10kb不转base64
          }
        }
      },
      // 字体文件打包
      {
        test: /\.(eot|ttf|woff|)$/, // 字体
        type: "asset/resource",
        generator: {
          // 输出文件位置以及文件名
          filename: "fonts/[name].[hash:6][ext]"
        }
      },
    ],
  },
  // CDN引入第三方包
  externals: {
    "react": "React",  //属性为包名，值为项目中使用的命名
    "react-dom": "ReactDOM",
    "moment": "moment",
    lodash: {
      commonjs: "lodash",
      amd: "lodash",
      root: "_"
    }
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
