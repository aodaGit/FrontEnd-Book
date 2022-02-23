# react

> 首先声明一点，任何技术点，包括框架，千万不要死记硬背八股文，那样会让你在技术这条路上越走越难，就像有面试官问你 react 是什么的时候，千万不要用烂大街的口吻告诉他，这是一个 MVC 的现代化单页面框架。对于技术的学习，要想真正理解它，请试着从它的历史，原理去理解它，然后达到自己对这个技术的真正的理解。

> react 由 facebook 公司开发，它的初衷就是帮助用户高效快速的更新浏览器的 DOM，在数据不断变化的情况下，保持页面内容的稳定和流畅，再从它的 logo 去看，react 的 logo 就如同一个个原子组成的宇宙，这些原子就是构建 react 单页面应用的模块，这些模块之间可以互相组合嵌套。

## 核心概念

### JSX

> jsx 是构成 react 每一个原子组件的一种写法，具体来说就是可以在一个文件内，写 html 的 UI 内容和 JS 的交互内容，共同构成一个完整的组件。

> 那么，react 为何要这么做呢？

> 还是回到 react 的初衷，从初衷谈起，react 认为 UI 的展示由一个个的原子组件组成，因为一个组件就需要表达一个完整的小模块，包含它的 html 和它的动作 js，这样子就可以讲通这个问题了。

> 那么使用了 jsx 之后，是如何将 jsx 转换为我们页面上所看到的视图的呢？

> 简单来说，我们使用 jsx 写的每一个组件，是不能直接进行渲染解析的，会先交给 babel 进行转义，生成虚拟的 json 格式的 dom 描述节点，也就是我们经常耳濡目染的虚拟 dom，然后将这个节点再次交给 react 的 createElement 方法，底层通过判断 json 中的 type 组件类型，来做一系列的分析优化，最终生成我们所看到的视图！

```jsx
// jsx生成的json格式dom描述节点
React.createElement(
  "div",
  null,
  React.createElement("img", {
    src: "avatar.png",
    className: "profile",
  }),
  React.createElement(Hello, null)
);
```

### Fiber

> Fiber 是 react 16 重构之后的一个新概念，16 以前 react 对于 dom，以及函数的调用更新都是同步进行，当同步进行的动作较多时，就会存在阻塞，从而造成页面卡顿的现象，16 之后，16 之后 react 将这些更新和调用的动作全部分成分片，通过调用浏览器的空闲时间来达成分布更新的目的，这些具体的更新细节就挂载在每一个 fiber 节点上，实际上每一个 jsx 的组件都会生成一个 fiber 节点的链表，每一个 fiber 节点都包含了当前 dom 节点的具体信息，更新优先级，更新节点在整个 root fibber 节点树中的位置等等

### 虚拟 dom 和 Diff 算法

> 从虚拟这个词可以看出，虚拟 dom 并非真实存在，那么为何在 vue 和 react 都存在虚拟 dom 呢

> 我们先来看看，现代前端框架之前如何更新真实 DOM 的

> 有过原生 js 和 JQuery 开发经验的同学都知道，js 和 JQuery 更新 dom 的方式就是获取真实 dom 的节点，根据节点直接进行 dom 操作

> 那么，直接操作 dom 有何弊端呢，这就要从我们前端同学最熟悉的浏览器说起，浏览器一共分为两种引擎，渲染引擎和 js 引擎，其中渲染引擎主要负责接收请求来的 HTML、CSS、javascript 等资源，然后解析、构建 DOM 树、渲染布局、绘制，最后呈现给客户能看到的界面，JS 引擎主要负责编译和运行整个网页的 JS 程序，当浏览器在运行时，如果同时存在大量的 DOM 节点重绘渲染就会导致页面卡顿。

> 思考一种方法，如果有一个算法，可以将浏览器的真实 dom 生成一个副本，每次在更新真实 dom 节点时，与这个副本进行比对，从而计算出真正需要更新的节点，这样就做到了增量更新，也极大的优化了浏览器的渲染，事实上这个以真实 dom 为基本，生成的副本就是虚拟 DOM，这种算法就是 DIff 算法。

### 调度器

> 调度器为 react 16 之后的产物，react 16 前 对真实 dom 的更新是一个不可中断的同步操作，也就是必须等到前一个更新任务结束，下一个更新任务才可以开始。16 后，react 将每一次的更新任务以 5 毫秒为基本单位，分为无法个任务切片，官方称之为时间切片，同时，在每一次的调用栈中，每一个切片都有更新优先级，为了极大的利用浏览器达到快速更新，react 更是模拟采用了浏览器的空闲时间，将一些优先级低的加入到空闲时间中进行，这种更新的机制就是 react 的调度器。

### 事件合成

> react 的本质是一个 ui 渲染框架，react 为了能够兼容所有的浏览器事件处理，自己内部定义了合成事件，我们所写的 react 事件，会被 react 解析为具体的合成事件类型，再去映射到具体的事件中，v17 版本前，react 的合成事件挂在 document 上，v17 后，挂载在顶部容器上，同一个容器，可以容纳多个合成事件，这样为微前端做了铺垫

## [Hooks 的使用](./react-hooks使用手册记录.md)

## 组件通讯

> 将 react 看成是一个宇宙，那么组成宇宙的每一个原子之间不可能完全独立，它们之间必然存在可以相互发送和接受信息的方式，这种方式就是组件之间的通讯

### 通讯方式 1(props 传递)

- 父传子

> 父组中定义数据，通过给子组件绑定 props 的方式传递到子组件使用

```jsx
// 父组件
import Son from "./son/Son.jsx"

function App() {
  return (
    <div className="App">
    <Son message='父组件数据'></Son>
    </div>
  );
}

export default App;


//子组件
const Son=(props)=>{
    return (
        <div>
            <p>这是父组件传递的值{props.message}</p>
        </div>
    )
}
export default Son

```

### 通讯方式 2（context 上下文传递）

详细用法前在 react hooks 中的 useContext 查看

## 有状态和无状态组件

> react 非常重视数据和视图的分离，每一个组件中都会有数据和视图，那么数据究竟来自那里，从这个角度可以将 react 中的组件进行区别，组件中拥有自己定义的数据，这个数据完全由这个组件自己来控制，这样的组件就叫做有状态的组件，组件中不存在的自己定义的数据，需要来自其他组件以通讯等的方式传递数据，这样的组件就是无状态组件。

> 那么这样划分组件有何意义呢？

> 组件更加颗粒化，按照这样的分类标准，实际开发中，我们可以将一些常见的用于纯展示的 UI 视图拆分出来，从而减少数据的耦合度。

## 路由管理

## 权限管理

## 错误边界

## 生命周期

> 在前端框架里，生命周期是一个很常见的概念，我们可以将其理解为人或者植物的生长阶段

> react 在类组件中有即将挂载（onMount）,挂载后（onMounted）,更新（onUpdate），销毁（onDestyed）等重要生命周期
>
> 函数式组件中，也有类似于生命周期的管理，函数组件的生命周期，请前往[hooks](./)应用中的 useEffect 中查看

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

> 讲道理，样式这个话题不应该单独拿出来说，毕竟 UI 视图就是前端三大宝（html，css，js），所有框架都会集成，并且处理好这个问题，骚的就是在 vue 这个框架里，scope 一行代码就可以处理样式污染问题，但是，在 react，并没有这么简单

> react 中，如果将父组件中，引入的所有子组件，都存在一个类名，那么就会不可避免的出现样式污染问题，那么如何解决这个问题呢？

> 前端界目前有很多种处理方式，这里只说实际开发中我本人一直使用的一种方式，代码倾入性小，配置简单

> “css-module”，在 css-module 中，每一个组件都是独立的 module，当我们编写一个 jsx 组件时，css-module 都会生成一个基于组件名字的随机 hash 值，注入到这个组件中的每一个 css 样式中，这样当我们在父组件中引入多个子组件，即使样式名字一样，但是前缀的 hash 值也会不一样，这样便巧妙的避开了由于样式名字一样而导致的样式污染问题
>
> ![](https://s3.bmp.ovh/imgs/2022/01/98dab1ef59af1776.png)

> 当然我们所熟悉的 scss 和 less 同样支持 css-module 的配置，实际开发中，只需要在 webpack 配置中配置即可。

> 实际开发中，我们可能还会遇到根据不同的状态来渲染不同的样式这样的需求，我们可以配合 className 这个库完全的结合

```jsx
import style from "./App.module.css";

// 多个样式使用
function App() {
  return (
    <div className="App">
      <p className={`${style.f66} ${style.colorRed}`}>测试</p>
    </div>
  );
}
export default App;
```

## react 推荐阅读资料

- [react 哲学思考](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fmithi%2Freact-philosophies)
