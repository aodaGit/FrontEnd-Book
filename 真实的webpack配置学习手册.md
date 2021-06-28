# 记一次真实项目webpack打包优化

> webpack已成为所有前端项目必备的打包工具，真实在项目中配置，不仅可以让自己对webpack的打包做一个全面了解，也对自己技术有很大提升。

### 依赖包

> 配置webpack打包前，先安装webapck打包的对应依赖包

- ```js
  npm i -D webpack webpack-cli     webpack基础打包脚手架
  ```

- ```
  npm i -D html-webpack-plugin   	html文件动态注入js
  ```

- ```
  npm i -D clean-webpack-plugin   清除上一次的打包文件
  ```

- ```
  npm i -D style-loader css-loader  解析加载css文件
  ```

- ```
  npm i -D less less-loader  解析加载less文件
  ```

- ```
  npm i -D postcss-loader autoprefixer      css自动添加不同浏览器前缀
  ```

- ```
  npm i -D mini-css-extract-plugin    拆分css文件
  npm i -D extract-text-webpack-plugin@next  新版本拆分css文件
  ```

- ```
  npm i -D webpack-dev-server  热更新
  ```

- ```
  npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin   webpack合并  静态文件复制  css压缩  js压缩
  ```

- ```
  npm i -D webpack-parallel-uglify-plugin    增强压缩
  ```

- ```js
  npm i -D cache-loader  打包缓存配置
  ```

- ```js
  npm i babel-loader @babel/core @babel/preset-env -D  js的es6转换为es5兼容写法
  ```

- ```js
  npm install --save @babel/polyfill   部分浏览器不支持的写法使用polyfill进行模拟
  ```

  

### webpack模块配置

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

#### devServer热更新

> 实际开发过程中，我们希望代码在改动后，浏览器能够自动更新渲染，并且对于跨域请求可以进行代理，此插件可以做到热更新效果

- ```js
  devServer:{
      port:3000,  //端口
      hot:true,
      contentBase:'../dist',  //热更新目录
      proxy: {   //代理配置
    "/api": {
      target: "http://localhost:3000",
      pathRewrite: {"^/api" : ""}
    }
  }
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
  // 不同类型的文件打包配置
      module: {
        // include  那些文件需要被loader执行
        // exclude 那些文件不需要被loader执行
        rules: [
          //打包缓存配置
          {
            test: /\.ext$/,
            use: [
              'cache-loader',
            ],
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
          },
          //vue文件解析打包
          {
            test: /\.vue$/,
            use: [{
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false
                }
              },
            }],
            //减少loder搜索范围
            include: [path.resolve(__dirname, 'src')],
            exclude: /node_modules/
          },
          // js转义 ES6及以上转为ES5，js解析打包
          {
            include: [path.resolve(__dirname, 'src')],
            exclude: '/node_modules/',
            test: /\.js$/,
            use: [
               "cache-loader",
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", {
                    useBuiltIns: "usage", //按需加载
                    corejs: {
                      version: "3",
                    },
                    targets: "defaults",
                  }],
                  // 开启babel缓存，第二次构建时，会读取之前的缓存。
                  cacheDirectory: true,
                }
              }
  
            ]
          },
          //css样式文件打包
          {
            test: /\.css$/,
            use: [{
              loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../dist/css/",
                hmr: devMode
              }
            }, 'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            }],
            exclude: /node_modules/
          },
          {
            test: /\.less$/,
            use: [{
              loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../dist/css/",
                hmr: devMode
              }
            }, 'css-loader', 'less-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            }]
          },
          //图片打包
          {
            //处理图片资源
            test: /\.(jpg|jpg|png|gif|)$/,
            type: "asset",
            generator: {
              // 输出文件位置以及文件名
              filename: "images/[name][ext]"
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
        ]
      },
  ```


#### polyfill垫片设置

> webpack在打包中，能够使用babel对高版本js转换为低版本，从而提供兼容处理，但也有部分功能在低版本浏览器无法实现，使用polyfill可以对低版本的浏览器进行垫片填充，从而实现相对应的功能

- ```js
  options: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1"
              },
              corejs: 2,//新版本需要指定核⼼库版本
              modules: false, // 推荐
              useBuiltIns: "usage"//按需注⼊
            }
          ]
        ]
      }
  ```



#### 不同环境webpack配置



