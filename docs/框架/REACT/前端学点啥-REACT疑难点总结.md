# react

## react 的样式怎么做

> react 官方暂时不支持如同 vue 一样的快级 css
>
> 不过可以使用 css-module，webpack 默认开启 css-module，也可以针对 webpack 进行命名设置，同时 css-module 也支持 compase 的继承等
>
> 因此对于 react 的项目做法可以将全局样式使用 css，对于组件样式可以使用 less，同时配置 calssName 可以做类名等的切换
>
> ![image-20210714145557219](D:\Users\zhangqi\AppData\Roaming\Typora\typora-user-images\image-20210714145557219.png)

## react 怎么做路由权限

- vue 与 react 路由权限的原理都是前端定义的路由数组中添加权限字段，与后端返回的路由数据进行匹配过滤，有过滤到的则进行显示，没有的定位到无权限页面

## react 父子组件渲染顺序

> react 父子组件执行顺序遵守，父组件包裹子组件原则，父组件完成 constrtor 数据初始化后， 父组件准备挂载，走渲染函数，同时检测到有子组件，子组件开始初始化数据，预挂载，走渲染函数，挂载，再到父组件挂载

1. Parent constructor
2. Parent componentWillMount
3. Parent render
4. Child constructor
5. Child componentWillMount
6. Child render
7. Child componentDidMount
8. Parent componentDidMount

## react 事件合成

- react 的本质是一个 ui 渲染框架，react 为了能够兼容所有的浏览器事件处理，自己内部定义了合成事件，我们所写的 react 事件，会被 react 解析为具体的合成事件类型，再去映射到具体的事件中，v17 版本前，react 的合成事件挂在 document 上，v17 后，挂载在顶部容器上，同一个容器，可以容纳多个合成事件，这样为微前端做了铺垫
