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
// 打包进度
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
//当前开发环境
const devMode = process.argv.indexOf("--mode=production") === -1;
module.exports = {
  // 环境切换
  // 入口文件设置
  // 单文件入口
  entry: path.resolve(__dirname, "../src/index.js"),
  //   出口文件设置
  output: {
    filename: devMode ? "[name].bundle.js" : "[name].[chunkhash:8].js", // 开发环境与chunkhash冲突，根据入口文件，生成添加哈希值的动态出口文件
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
      filename: "index.html",
      // 指定js脚本存放的位置，头部还是脚部
      inject: "head",
      // 多入口时，对应的入口模块名
      // chunks: ["main"],
      // 压缩设置
      minify: {
        removeComments: true,//移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    // 打包进度提示
    new ProgressBarWebpackPlugin(),
    // css分割
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
    }),

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
      // js转义 ES6及以上转为ES5，js解析打包
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "../src"),
        ],
        use: [
          {
            loader: "thread-loader",   //多进程打包，文件较少时不建议使用，自身有耗时开销
            options: {
              // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
              workers: 2,
              workerParallelJobs: 50,

              // 额外的 node.js 参数
              workerNodeArgs: ['--max-old-space-size=1024'],
              poolRespawn: false,

              // 闲置时定时删除 worker 进程
              // 默认为 500（ms）
              // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,

              // 池分配给 worker 的工作数量
              // 默认为 200
              // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,
              name: "my-pool"
            },
          },
          {
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
                    modules: "umd", // 推荐
                    useBuiltIns: "usage"//按需注⼊
                  }
                ],

              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                ["@babel/plugin-proposal-private-methods", { "loose": true }],
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "corejs": 3 // 指定 runtime-corejs 版本，目前3为最新版本
                  }
                ]
              ],
              compact: false
            }
          }

        ]
      },
      //css样式文件打包
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,   //css-module
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-preset-env")(),
                ]
              }
            }
          },
        ],
      },
      // less打包
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,   //css-module
              importLoaders: 1,
            },
          },
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
          "less-loader",
        ],
      },
      //图片打包
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "images/[name].[contenthash:6][ext]"
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
          filename: "media/[name].[contenthash:6][ext]"
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
          filename: "fonts/[name].[contenthash:6][ext]"
        }
      },
    ],
  },
  resolve: {
    fallback: {
      util: require.resolve("util/")
    }
  }
};
