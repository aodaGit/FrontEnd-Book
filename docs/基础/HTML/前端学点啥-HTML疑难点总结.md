# HTML

## 前端 seo，单页面下如何去做 seo

> SEO 指的是搜索引擎网站对网站的搜索比重
>
> 单页面（前端三大框架全部为单页面）在百度中不予收录
>
> 目前单页面所做的 seo 处理有两种优化方案
>
> - 首页采用服务器渲染
> - 服务器判断访问的是浏览器还是爬虫服务器，如果是爬虫，交给 prerender 处理，prerender 是谷歌和必应推荐的做 seo 优化的预呈现插件
> - 进行转发代理，代理处理后，返回给爬虫服务器 seo 的相关信息
> - 知乎案列 https://zhuanlan.zhihu.com/p/36241703

## html 头部的 doctype 的作用

> 当页面添加这个头部时，意在告诉浏览器，这是标准模式解析
>
> 浏览器可以加载<u>**标准模式**</u>和<u>**怪异模式**</u>
>
> 两者的区别在于两者对于宽度 width 的定义不同，标准模式下，元素在页面中所占的宽度为 padding+width+margin+border
>
> 怪异模式下 width=padding+border. 实际上页面所占的距离只有 width+margin

## div+css 和 table 布局的特点，各自的优点

> div+css 遵循结构和表现分离原则，通常更换 css 样式就可以更换整个网站风格
>
> div+css 可以边加载边显示，相对于表格的完全加载完才可以显示而言，加载速度更快
>
> div+css 可以通过布局来实现部分数据的较快加载，典型的如圣杯布局
>
> 相对而言，代码结构清晰，后期更容易维护

## img 的 alt 和 title 有什么异同

> title 是每一个元素都共有的属性，可以设置 title 来提示元素设置的特殊化信息
>
> alt 为图片特有的属性，当图片资源加载异常时，会用设置的 alt 信息来替代
>
> seo 中设置图片 alt 的属性会增强 seo

## 优雅降级和渐进增强

> 可以理解为程序设计的两种模式，优雅降级主要是在高级运行中向下兼容，如 vue react 的 babel 转义
>
> 渐进增强为向上逐渐高级的写法，如 jquery 中使用 vue

## 为何要使用多个域名来保存网站资料，cdn 是什么

> cdn 是指针对某一资源，加载离用户最近的服务器资源网络
>
> 可以减少主服务器的压力，增加并发量，防止不必要的数据丢失等

## cookie localstorage sessionStorage session 的区别

> 区别 前三者均存在客户端，也就是浏览器上，session 存放在服务器上

## cookie

当用户第一次向某个服务器发起请求时，浏览器和服务器就会建立一次对话连接，在服务器端生成一个 session，

同时向浏览器返回 cookis 值，主要保存关于用户登录状态的一些重要信息（账户，密码，停留时间等），其中包含一个 sessionID，cookis 也可以设置生效时长，如不设置，则默认为关闭浏览器失效，之后，当客户端每次向服务器发起请求时，请求头中都会携带 cookis，以让服务器端来验证用户的登录信息，以及相应对应的数据等，由于每次都可以携带 cookis 发起请求，因此客户端限制 cookis 只能携带 4k 的东西，当然为了节省宽带，降低服务器的消耗，cookis 中一般存放一些重要的信息，其他的都存放在 cookis 中

## localstorage

这是浏览器新支持的存放方式，客户端可以使用 set 和 get 方法，对其进行存取，原则上，loacl 中存储的东西可以永久保存

## sessionstorag

sessionstorge 存在于页面与页面所建立起的对话，当浏览器关闭的时候，sessionstorage 就会消失

## session

session 为服务器端存放的数据，主要保存用户的一些基础信息，同时可以对 cookis 的值进行更新

## h5 的离线缓存

> 参考文章 https://zhuanlan.zhihu.com/p/70883817
>
> 实现原理就是 html 文件中，设置 minfest 属性，浏览器通过 minfest 属性，去解析需要缓存什么内容，从而达到浏览器断网后也可以缓存的效果
>
> 实施步骤
>
> - 设置 html 头
>
>   - ```html
>     <!DOCTYPE html>
>     <html lang="en" manifest="demo.appcache">
>       <head>
>         <meta charset="UTF-8" />
>         <title>demo</title>
>       </head>
>       <body>
>         <img src="img.jpg" height="500" width="900" alt="" />
>         其它内容...
>       </body>
>     </html>
>     ```
>
>     manifest 文件可分为三个部分：
>
>     - CACHE - 在此标题下列出的文件将在首次下载后进行缓存。
>     - NETWORK- 在此标题下列出的文件需要与服务器连接，且不会被缓存。可以使用\*，表示除 CACHE 外的所有其他资源/文件都需要因特网连接。
>     - FALLBACK- 在此标题下列出的文件规定当页面无法访问时的替代页面。
>
> - 检索需要设置缓存的资源
>
>   - ```html
>     CACHE MANIFEST #version 1.0 CACHE： img.jpg NETWORK: * FALLBACK: /demo/
>     /404.html
>     ```
>
> - **操作 window.applicationCache 进行需求实现。**
>
>   - ```js
>     unction handleCacheEvent(e) {
>             对应操作...
>         }
>         function handleCacheError(e) {
>            alert('Error: Cache failed to update!');
>         };
>         //在浏览器为应用缓存查找更新时触发
>         oAppCache.addEventListener('checking', handleCacheEvent, false);
>         //在检查描述文件发现文件无变化时触发
>         oAppCache.addEventListener('noupdate', handleCacheEvent, false);
>         // 在开始下载应用缓存资源时触发
>         oAppCache.addEventListener('downloading', handleCacheEvent, false);
>         //在文件下载应用缓存的过程中持续不断地下载地触发
>         oAppCache.addEventListener('progress', handleCacheEvent, false);
>         //在应用缓存完整可用时触发
>         oAppCache.addEventListener('cached', handleCacheEvent, false);
>         //在页面新的应用缓存下载完毕触发
>         oAppCache.addEventListener('updateready', function(){
>               oAppCache.swapCache();// 更新本地缓存
>               location.reload();    //重新加载页面页面
>             }, false);
>         //在检查更新或下载资源期间发送错误时触发
>         oAppCache.addEventListener('error', handleCacheError, false);
>         //缓存清单不存在时触发
>         oAppCache.addEventListener('obsolete', handleCacheEvent, false);
>     ```
>
> - **在服务器端正确的配置 MIME-type。**
>
>   - 在 tomcat 服务器中的 conf/web.xml 中添加：
>
>     ```html
>     <mime-mapping>
>       <extension>manifest</extension>
>       <mime-type>text/cache-manifest</mime-type>
>     </mime-mapping>
>     ```

## src 和 href 的区别

> src 英文直译过来就是加载资源的意思，顾名思义就是引入外部链接，一般会使得浏览器停止当前行为，来运行这一加载资源的行为
>
> href 指的是网络资源中的位置，是元素和文档之间的链接关系
>
> 因此，**js 脚步使用 src 来引入时，就不可以放入头部，会导致页面的阻塞加载，这也是为什么推荐 css 样式使用 link 引入的原因**

## 网页中的使用的图片

> 根据我们使用的使用经验，目前将图片分为三类，**<u>透明图层，不透明图层，动图，矢量图</u>**
>
> 其中透明图层为 png，动图为 gif，不透明为 jpg，jpeg，webp 格式，矢量图为 svg
>
> 目前最优的图片则是 webp，这是由谷歌公司创建的新图片格式，比 jpg 体积更小，显示更为清晰，不过 webp 兼容性不是很好，使用时需要判断当前浏览器是否支持 webp 格式
>
> 常见的压缩图片的网站 tinyPng 谷歌的 Squoosh（无法进行批量转换）

## script中的defer和async标签是什么

## HTML5新增了那些东西？
主要是关于多媒体的元素

## 热点地图是什么
