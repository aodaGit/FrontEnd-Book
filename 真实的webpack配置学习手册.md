# 记一次真实项目webpack打包优化

> webpack已成为所有前端项目必备的打包工具，真实在项目中配置，不仅可以让自己对webpack的打包做一个全面了解，也对自己技术有很大提升，本文档会根据webpack最新的api进行真实打包配置，请需要学习的同学务必亲自配置！

### 依赖包

> 配置webpack打包前，先安装webapck打包的对应依赖包

- ```js
  npm i -D  webpack@latest webpack-cli     webpack5基础打包脚手架
  ```

- ```
  npm i --save-dev html-webpack-plugin   	html文件动态注入js
  ```

- ```js
  npm i -D clean-webpack-plugin   //清除上一次的打包文件
  ```

- ```js
  npm i -D style-loader css-loader  //解析加载css文件
  ```

- ```
   npm i -D postcss-scss   解决css单行注释问题
   ```

- ```js
  npm i -D less less-loader  //解析加载less文件
  ```

- ```js
  npm i postcss-loader postcss-preset-env -D   //css自动添加不同浏览器前缀
  ```

- ```js
  npm i -D mini-css-extract-plugin    //拆分css文件
  ```
  
- ```js
  npm i -D webpack-dev-server  //热更新js
  ```

- ```js
  npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin   //webpack合并  静态文件复制  css压缩  js压缩
  ```

- ```js
  npm i -D cache-loader  打包缓存配置
  ```

- ```js
  npm install -D  @babel/plugin-transform-runtime  @babel/runtime-corejs3  @babel/preset-env //js的es6转换为es5兼容写法以及部分浏览器不支持的写法使用polyfill进行模拟
  ```

- ```js
  npm install --save-dev cross-env  //环境变量统一设置，支持mac window linux系统
  ```

- ```
  npm install speed-measure-webpack-plugin --save-dev  //打包时间分析
  ```

- ```js
  npm install webpack-bundle-analyzer --save-dev  //分析打包内容
  ```
  
- ```
   npm i -D progress-bar-webpack-plugin  //打包进度条
   ```

- ```js
   npm install @babel/preset-react -D  //react文件打包支持  
  ```

- ```js
   npm install friendly-errors-webpack-plugin --save-dev   //webpack打包提示优化配置
   ```

- ```js
   npm i  thread-loader -D   //多进程打包，开销较大，慎用
   ```

- ```
   npm install @babel/plugin-proposal-private-methods  @babel/plugin-proposal-class-properties  --save-dev   "@babel/plugin-proposal-private-methods", { "loose": true }]报错时引入
   ```

- ```js
   npm i -D vue-loader vue-template-compiler vue-style-loader  //vue文件打包支持
   ```

### webpack基础配置

#### mode

> 打包环境设置，一般默认为production生产环境，通过此环境来配置不同的打包选项

#### entry入口设置

> webpack是一个以入口文件为准，检索所有依赖项，进而打包整个项目的打包工具，正如webpack官网所言“打包一切！”

- 单入口文件打包

  - ```js
    entry: path.resolve(__dirname, "./src/index.js")  //第二个为项目的具体入口文件路径
    ```

- 多入口文件

  - ```js
     entry: {
          main: path.resolve(__dirname, "../src/main.js"),
          sub: path.resolve(__dirname, "../src/sub.js"),
        }  //以对象形式，设置每个入口属性，与静态文件相配合
    ```

#### output出口

> 出口用来设置webpack具体的出口文件夹，以及打包出口文件名字

- 出口配置

  - ```js
    output: {
          filename: "[name].[hash:8].js", // 根据入口文件，生成添加哈希值的动态出口文件
          path: path.resolve(__dirname, "../dist"), // 打包后的目录文佳夹
        },
    ```

#### plugins插件

> webpack自身只能打包js文件，plugins主要为webpack处理其他的事务，诸如清理上一次打包结果，分析打包体积和打包时间，复制静态文件到指定目录等

- 清理上一次打包结果

  - ```
    new CleanWebpackPlugin()
    ```

- 静态html文件打包注入

  > 项目中的根html，每次打包手动引入js文件非常麻烦，此插件用于将静态的根html注入对应的js文件

  - ```js
    new HtmlWebpackPlugin({
            // 打包基础路径
            template: path.resolve(__dirname, "../public/index.html"),
    
            // 指定生成的文件名称
            filename: "index.[hash:8].html",
    
            // 指定js脚本存放的位置，头部还是脚部
            inject: "head",
    
            // 多入口时，对应的入口模块名
            // chunks: ["main"],  //单入口无需配置此项，多入口为入口设置的对象属性名
    
            // 压缩设置
            minify: false, //默认生产环境压缩，开发环境不压缩
          })
    ```

- css文件独立提取

  >  此插件主要用于将webpack打包的css从js中独立抽出，打包结构更为清晰

  - ```js
    new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',  //根据当前开发环境，切换打包文件命名
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
          })
    ```

- 静态文件拷贝

  > 使用webpack打包中，会有一些静态文件，需要整体打包到出口文件夹中，针对此类文件，可以使用此插件将静态文件从指定的文件夹，拷贝到指定的打包文件夹下

  - ```js
    new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, '../static'),   //需要拷贝的静态文件路径
                to: path.resolve(__dirname, '../dist/static')  //静态文件被拷贝到的文件出口路径
              },
            ],
          })
    ```

- 热更新

  - ```js
    new Webpack.HotModuleReplacementPlugin()  // devserver配合使用
    ```

#### optimization 代码压缩

> 开发环境中我们期望代码不压缩，方便调试查看，生产环境中，我们期望代码能够压缩，减少代码体积

- ```js
   optimization: {
      minimizer: [
        //js压缩
        new UglifyJsPlugin({
          cache: true,js
          parallel: true,
          sourceMap: true,
        }),
        //css压缩
        new OptimizeCssAssetsPlugin({}),
      ]
  ```

#### module不同文件类型打包设置

> webpack本身只能打包js一种类别的文件，对于css，图片，字体等文件，需要提供不同的loader加载器进行解析打包

- ```js
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
  ```


#### polyfill垫片设置

> webpack在打包中，能够使用babel对高版本js转换为低版本，从而提供兼容处理，但也有部分功能在低版本浏览器无法实现，使用polyfill可以对低版本的浏览器进行垫片填充，从而实现相对应的功能

- ```js
   // js转义 ES6及以上转为ES5，js解析打包
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../node_modules/@yulintu/")
          ],
          use: [
            {
              loader: "thread-loader",
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
        
  ```

#### 不同环境webpack配置

> 理想状态下，我们期望能够通过设置不同的环境变量，提供不同的base_url。同时运行不同的打包命令
>
> 具体做法就是通过在pack.json中统一设置环境变量，同时分配不同的打包命令来实现

- 开发环境

  > 开发过程中，我们期望代码不压缩，方便调试，支持热更新，同时本地loachost可以访问

  - ```js
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
        // publicPath: '/',
        hot: true,
        // host: '',   //特定域名启动 --host 0.0.28.26.
        // historyApiFallback:"",   //404特定页面  
        contentBase: path.resolve(__dirname, "../public"), //默认打开的目录
        inline:true,    //实时刷新
        // proxy: {   //代理配置
        //   "/api": {
        //     target: "http://localhost:3000",
        //     pathRewrite: { "^/api": "" }
        //   }
        // },
      },
      plugins: [
        //设置热更新
        new Webpack.HotModuleReplacementPlugin(),
      ],
    })
    
    ```

- 生产环境

  > 生产环境，我们期望代码可以压缩，减小打包体积

  - ```js
    //生产环境打包配置
    // webpack.prod.js
    
    const path = require('path')
    const webpackConfig = require('./webpack.config.js')
    const WebpackMerge = require('webpack-merge')
    
    //css压缩
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    
    //静态文件赋值
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    
    //js压缩
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    
    module.exports = WebpackMerge.merge(webpackConfig, {
      mode: "production",
      plugins: [
        //拷贝指定静态资源到指定目录
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "../public"),
              to: path.resolve(__dirname, "../dist"),
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
            sourceMap: true,
          }),
          //css压缩
          new OptimizeCssAssetsPlugin({}),
        ],
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            libs: {
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial", // 只打包初始时依赖的第三方
            },
          },
        },
      },
    });
    
    ```
  
- pack.json打包命令配置

  > 将打包命名直接配置在pack.json中，方便我们对其进行打包优化

  - ```js
    "scripts": {
        "start": "cross-env NODE_ENV=development webpack serve --inline --config config/webpack.dev.js",
        "build": "cross-env NODE_ENV=production webpack --config config/webpack.prod.js",
        "analyz": "cross-env NODE_ENV=production webpack --config config/webpack.analyz.js"
      },
    ```

#### 开发环境热更新问题

> 开发环境中，我们期望在更改代码后，浏览器能够马上得到响应，不过webpack5中，不默认热更新,需要我们配置target的值

- ```js
  //与插件module等同级
  target: 'web'
  ```

#### 上线环境代码压缩

> 上线环境中，我们期望代码能够压缩，减小打包体积

- ```js
   optimization: {
      minimizer: [
        //js压缩
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        //css压缩
        new OptimizeCssAssetsPlugin({}),
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // 只打包初始时依赖的第三方
            minChunks: 2  //模块被引用2次以上的抽离
          },
          vendors: {  //拆分第三方库（通过npm|yarn安装的库）
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            priority: -10
          }
        },
      },
    },
  ```


#### postcss冲突

> webpack5中的postcss与autofix会有版本冲突问题，报错内容
>
> 解决此问题可以升级postcss版本即可

- ```
  npm i --save autoprefixer@^10.0.2
   npm i --save postcss@8.1.7 
   npm i --save postcss-loader@4.0.4
  ```

#### ["@babel/plugin-proposal-private-methods", { "loose": true }]报错解决

> 打包时，如果遇到此类错误，则是需要引入babel/plugin-proposal-class-properties包，注意，引入时调用

- ```js
  {
    "plugins": [["@babel/plugin-proposal-private-methods", { "loose": true }]]
  }
  ```

#### vue打包注意事项

### 配置优化

- 多进程打包

  > 对于耗时较多的文件，如果我们可以开启多进程打包，充分利用cpu，将会大大提高我们的打包速度
  >
  > 实际配置中，我们的前端大部分的文件在于解析js，因此，我们对js文件，开启多线程打包

  - ```js
    //module中配置js
    {
                loader: "thread-loader",
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
    ```

- 缩小文件检索范围

  >  我们在实际打包中，期望能够对需要转义的文件进行转义打包，这样可以降低打包体积，减小打包耗时
  >
  > webpack提供了两种缩小文件检索范围的api，include和exlude，inlude为包含解析那些文件，exlude为排除解析那些文件，一般情况下，两者选一即可

  以下为js配置了文件范围后的打包真实测试

  ```js
   include: [
  ​     path.resolve(__dirname, "../src"),   //项目主文件
  ​     path.resolve(__dirname, "../node_modules/@yulintu/")  //公司node_modelue 组件库
  ​    ],
  ```

  - **<u>优化前</u>**

    - 打包体积分析

    - <img src="D:\Users\zhangqi\AppData\Roaming\Typora\typora-user-images\image-20210709151426859.png" alt="image-20210709151426859" style="zoom:150%;" />

    - 各个阶段打包耗时分析

      ![image-20210709151516822](D:\Users\zhangqi\AppData\Roaming\Typora\typora-user-images\image-20210709151516822.png)

  - **<u>优化后</u>**

    - 打包总体积减小**70%**
      - ![image-20210709151900631](D:\Users\zhangqi\AppData\Roaming\Typora\typora-user-images\image-20210709151900631.png)
      - 总耗时降低**57%**   打包文件减少**31%**
        - ![image-20210709151935870](D:\Users\zhangqi\AppData\Roaming\Typora\typora-user-images\image-20210709151935870.png)



