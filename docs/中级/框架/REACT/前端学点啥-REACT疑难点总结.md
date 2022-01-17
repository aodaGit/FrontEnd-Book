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
> 将react看成是一个宇宙，那么组成宇宙的每一个原子之间不可能完全独立，它们之间必然存在可以相互发送和接受信息的方式，这种方式就是组件之间的通讯

- 通讯方式1(父子通讯)

  - 父传子

  > 父组中定义数据，通过给子组件绑定props的方式传递到子组件使用

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

  - 子传父

  > 子组件

- 通讯方式2（兄弟通讯）
  - connext传递
- 通讯方式3（数据流通讯）
  - 提升为模块状态，在状态中进行数据管理
## 有状态和无状态组件
> react非常重视数据和视图的分离，每一个组件中都会有数据和视图，那么数据究竟来自那里，从这个角度可以将react中的组件进行区别，组件中拥有自己定义的数据，这个数据完全由这个组件自己来控制，这样的组件就叫做有状态的组件，组件中不存在的自己定义的数据，需要来自其他组件以通讯等的方式传递数据，这样的组件就是无状态组件。

> 那么这样划分组件有何意义呢？

> 组件更加颗粒化，按照这样的分类标准，实际开发中，我们可以将一些常见的用于纯展示的UI视图拆分出来，从而减少数据的耦合度。


## 路由管理

## 权限管理

## 错误边界

## 生命周期

> 在前端框架里，生命周期是一个很常见的概念，我们可以将其理解为人或者植物的生长阶段

> react在类组件中有即将挂载（onMount）,挂载后（onMounted）,更新（onUpdate），销毁（onDestyed）等重要生命周期
>
> 函数式组件中，也有类似于生命周期的管理，函数组件的生命周期，请前往[hooks](./)应用中的useEffect中查看

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

## react的样式怎么做

> 讲道理，样式这个话题不应该单独拿出来说，毕竟UI视图就是前端三大宝（html，css，js），所有框架都会集成，并且处理好这个问题，骚的就是在vue这个框架里，scope一行代码就可以处理样式污染问题，但是，在react，并没有这么简单

> react中，如果将父组件中，引入的所有子组件，都存在一个类名，那么就会不可避免的出现样式污染问题，那么如何解决这个问题呢？

> 前端界目前有很多种处理方式，这里只说实际开发中我本人一直使用的一种方式，代码倾入性小，配置简单

> “css-module”，在css-module中，每一个组件都是独立的module，当我们编写一个jsx组件时，css-module都会生成一个基于组件名字的随机hash值，注入到这个组件中的每一个css样式中，这样当我们在父组件中引入多个子组件，即使样式名字一样，但是前缀的hash值也会不一样，这样便巧妙的避开了由于样式名字一样而导致的样式污染问题
>
> ![](https://s3.bmp.ovh/imgs/2022/01/98dab1ef59af1776.png)

> 当然我们所熟悉的scss和less同样支持css-module的配置，实际开发中，只需要在webpack配置中配置即可。

> 实际开发中，我们可能还会遇到根据不同的状态来渲染不同的样式这样的需求，我们可以配合className这个库完全的结合

```jsx
import style from  './App.module.css';

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