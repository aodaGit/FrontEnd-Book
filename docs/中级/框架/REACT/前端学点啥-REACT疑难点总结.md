# react
> 首先声明一点，当有人问你react是什么的时候，千万不要用烂大街的口吻告诉他，这是一个MVC的现代化单页面框架，对于框架的学习，要想真正理解它，请试着从它的历史，原理去理解它，然后达到自己对这个框架的理解。

> react由facebook公司开发，它的初衷就是用于在开发数据不断变化的情况下，保持页面内容的稳定和流畅，将页面拆分为小模块，或者看成是宇宙的原子（react的logo就是宇宙原子图），这些模块可以互相组合嵌套。
> 
> 从这个出发点就可以看到，react最开始的想法就是如此的单纯，‘稳定，流畅’，跟我们这些前端打工仔的梦想一样，自己开发的项目‘稳定，流畅（不背锅）’，所以我们可以看到react后续的很多配套技术都是来自社区，官方维护的就只是react，不过react曾经单纯的思想在我们现在看来，是多么的伟大，我们既做大了数据和试图的分离，也将复杂的程序，一步步拆分成了一个个小组件小模块。
## 核心概念
### JSX

> jsx是构成react每一个原子组件的一种写法，具体来说就是可以在一个文件内，写html的UI内容和JS的交互内容，共同构成一个完整的组件。

> 那么，react为何要这么做呢？

> 还是回到react的初衷，从初衷谈起，react认为UI的展示由一个个的原子组件组成，因为一个组件就需要表达一个完整的小模块，包含它的html和它的动作js，这样子就可以讲通这个问题了。

> 那么使用了jsx之后，是如何将jsx转换为我们页面上所看到的视图的呢？

> 简单来说，我们使用jsx写的每一个组件，是不能直接进行渲染解析的，会先交给babel进行转义，生成虚拟的json格式的dom描述节点，然后将这个节点再次交给react的createElement方法，底层通过判断json中的type组件类型，来做一系列的分析优化，最终生成我们所看到的视图！
```jsx
// jsx生成的json格式dom描述节点
React.createElement(
  "div",
  null,
  React.createElement("img", {
    src: "avatar.png",
    className: "profile"
  }),
  React.createElement(Hello, null)
);
```
### Fibber

### 虚拟dom
### Diff 算法
### 调度器
### 事件合成

- react 的本质是一个 ui 渲染框架，react 为了能够兼容所有的浏览器事件处理，自己内部定义了合成事件，我们所写的 react 事件，会被 react 解析为具体的合成事件类型，再去映射到具体的事件中，v17 版本前，react 的合成事件挂在 document 上，v17 后，挂载在顶部容器上，同一个容器，可以容纳多个合成事件，这样为微前端做了铺垫

## [Hooks 的使用](./react-hooks使用手册记录.md)

## 组件通讯
## 有状态和无状态组件

## 路由管理

## 权限管理

## 错误边界

## 性能优化技巧

#### immer 原理

## 页面重载，保留数据

## 多语言

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

## react 的样式怎么做

> react 官方暂时不支持如同 vue 一样的快级 css
>
> 不过可以使用 css-module，webpack 默认开启 css-module，也可以针对 webpack 进行命名设置，同时 css-module 也支持 compase 的继承等
>
> 因此对于 react 的项目做法可以将全局样式使用 css，对于组件样式可以使用 less，同时配置 calssName 可以做类名等的切换
