# CSS

## 为什么有时会用 translate 来改变位置，而不用 position

translate 动画不会引起浏览器的重绘，position 会导致浏览器重绘

## 控制元素显示隐藏的方法，并说明区别

> 主要有两种方式 display 和 visibility
>
> - display
>   - block 可以让元素显示
>   - none 隐藏元素
>   - 当使用了 none 隐藏元素后，节点会从 AST 渲染树中去除，儿子节点和事件会完全被取消，即使儿子元素设置 display：block
> - visibility
>   - Visiberl 显示元素
>   - hidden 隐藏元素
>   - 使用 hidden 隐藏元素后，元素只是在页面看不见，但是依然留在渲染树中，当父节点使用 visiility 隐藏后，子节点会隐藏，但是子节点设置的布局样式依然会发生作用，子节点可以使用 visiblity：viasibel 显示，并且事件可以执行

## 如何实现瀑布流布局

## flex 和 grid 布局的区别

> 区别：两者的区别在于侧重点不一致
>
> - flex 侧重于一维布局，即同一方向布局
> - grid 侧重于二维布局，即行和列同时去操作布局，目前业界不使用的理由是兼容性很差，以及一维布局使用不方便，瀑布流布局中可采用 grid 布局

## 移动端 1px 问题

> 当移动端设置 1px 的时候，实际设置的 1 个物理像素，当手机像素较高时就会出现边框较粗的现象
>
> 解决方案：
>
> - 第一种办法 判断设备的物理像素，根据物理像素对边框值进行缩放处理
>
> ```css
> .foo {
>   /* Output example */
>   .test {
>     border: 1px solid #000;
>     @media (min-resolution: 2dpx) {
>       .test {
>         position: relative;
>         border: none;
>       }
>       .test::before {
>         content: "";
>         position: absolute;
>         left: 0;
>         top: 0;
>         width: 200%;
>         height: 200%;
>         border: 1px solid #000;
>         border-radius: 0px;
>         transform-origin: 0 0;
>         transform: scale(0.5);
>         box-sizing: border-box;
>         pointer-events: none;
>       }
>     }
>     @media (min-resolution: 3dppx) {
>       .test::before {
>         width: 300%;
>         height: 300%;
>         border-radius: 0px;
>         transform: scale(0.33);
>       }
>     }
>   }
> }
> ```
>
> - 第二种办法 直接引入 postcss-1px-border 第三方插件解决

## css hack

> Css hack 是指，针对不同的浏览器，使用不同版本可以识别的特殊符号，从而实现不同版本浏览器下，加载不同的样式效果

## 快级和行级元素的区别

> - 快级元素独占一行，padding 和 marging 全部有作用
> - 行内级别，水平方向排列，上下内边距和上下外边距设置无效
> - 两者可以通过 display=block 和 display=inner-block 相互转换

## 可替换元素与不可替换元素的区别

> 可替换与不可替换元素的区别就在于元素是否直接按照内容显示，如 image 是根据 src 属性引入的文件决定元素大小，为可替换
>
> div span 等为不可替换
>
> 不可替换元素的内外边距上下不会影响布局，这也就是为什么 span 标签设置了 padding 和 margi 上下不会影响布局

## 什么是空元素

> HTML 中有三类元素，快级 行内，空元素
>
> 其中空元素指的是 html 中不能存在子节点的元素
>
> 常用的空元素有 img input textarea meta 等

## 元素转换为 inner-block 行内快级后会有什么问题？怎么解决

> 转换为快级行内后，如果代码内的内容换行，会出现间隙，原因是转换为快级行内后，浏览器将换行符也当成了行内的元素内容，基于此，有两种解决合并可以解决此问题
>
> - 设置父元素的字体大小
>   - 父元素 font-size=0，子元素重新设置 font-size 大小，缺点是在谷歌浏览器中，给字体设置了最小值 12px，设置为 0 无法生效，因此需要再次进行处理
> - 设置父元素 letter-spacing
>   - 父元素 letter-spacing=负值，子元素设置 letter-spacing=0

## 什么是外边距重叠，重叠的效果是什么？

> 外边距重叠是指，当两个元素盒子元素在设置外边距的时候，重合的一端会产生值的合并
>
> - 两个都是正值时，取最大的
> - 两个都是负的时，取绝对值最大的
> - 两个一正一负时，取两个的和

## css 中水平和垂直重叠可以用什么来实现

> - 垂直方向可以用 line-height，当和 height 一样时，会实现垂直居中效果
> - 水平方向可以用 letter-spaceing，当设置负值时，会将元素重叠

## px em rem vw vh 单位的区别

> px 是像素单位，pc 端开发中经常使用这个单位
>
> em 是指相对于父亲设置 font-size，而且会根据父亲的字体大小，来调整自己的大小
>
> rem 是指相对于 body 根元素设置 font-size，这样可以实现所有的元素大小根据 body 来改变大小，通常 app 端，使用这一方案，实现不同的手机兼容
>
> vw 和 vh 是视窗宽度和视窗高度，是指在整个设备的视窗中，可以设置不同比例，100vw 和 100vh 将会占满整个屏幕

## css 预编译器，react 中用什么方案解决更好

> css 预编译器是 css 语法的增强版，可以让原生的 css 实现代码更好的继承复用，采用变量书写 css 等
>
> less 与 sass 都可以实现此类功能
>
> vue 中采用 css 预编译，可以让文件作用于当前 css
>
> react 要实现这样的效果，目前官方推荐 css in js，防止全局污染

## BFC 快级上下文

> BFC 会形成一个快级渲染盒子，盒子内的布局不会影响盒子外的布局，有点类似于 js 的作用域名
>
> 其中，display=block inner-block position=abroute fied 都会形成 BFC

## 如果写 css 动画，你认为最小间隔时间是多少？

> 这是一个根据常识去计算某个值的问题
>
> 市面上常见的屏幕分辨率为 60HZ，也就是每秒钟刷新 60 次，所以理论上最小间隔时间应该是 1/60\*1000ms 16.7ms

## base64 的原理以及缺点

> base64 是将二进制流转换为字符串的形式，可以达到部分加密的作用

## CSS 工程化的理解

- 可以理解为对 CSS 模块的一种组织和规划
- 我们可以将 CSS 整体划分为字体，样式，颜色等细分，结合 less，scss 等预处理器，使用全局变量，方便后续的维护和整改
- 同时为了兼容性考虑，配合 webpack，配置 css-loader,style-loader 配置 postcss，解决浏览器的兼容性问题

## z-index 在什么情况下会失效

- 父元素未设置非 static 的 position 属性
- 元素本身设置了 float 浮动属性

## css 中的动画为何用 translate 而不用 postion

简单来讲，由 translate 触发的动画不会引起浏览器的重绘重排，动画位置属性更改后，会直接交给浏览器的此线程，利用 GPU 来完成渲染，postion 的更改会导致浏览器出发 layout，浏览器会重绘重排

## 如何做响应式布局

> 何为响应式布局，是指在同一套代码下，实现在手机，pad，pc 之间的视图切换,要实现这样的效果，我们需要思考两个方面，一个是不同的屏幕下切换不同的视图，第二个是我们所看到的图片资源能够适配不同的屏幕。

> 实际上，CSS3 提供了这样的方案，媒体查询便是根据屏幕的大小来切换不同的视图展示。图片的 srcset 属性便是根据屏幕分辨率来加载不同的图片
