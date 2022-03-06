# react

[![bPjsTH.jpg](https://s4.ax1x.com/2022/02/24/bPjsTH.jpg)](https://imgtu.com/i/bPjsTH)

> 首先声明一点，任何技术点，包括框架，千万不要死记硬背八股文，那样会让你在技术这条路上越走越难，对于技术的学习，要想真正理解它，请试着从它的历史，原理去理解它，然后达到自己对这个技术的真正理解。

> react 由 facebook 公司开发，它的初衷就是帮助用户在数据变化的情况下高效快速更新 UI 视图。react 的 logo 如同一个个原子组成的宇宙，这些原子就是构建 react 单页面应用的 JSX 模块，这些模块之间可以互相组合嵌套。

## react 渲染流程图解

[![biv8yV.png](https://s4.ax1x.com/2022/02/24/biv8yV.png)](https://imgtu.com/i/biv8yV)

## 核心概念

### JSX

> jsx 是构成 react 每一个原子组件的一种写法，具体来说就是可以在一个 js 或者 ts 文件内，可以写 html 的 UI 内容和 JS 的交互内容，共同构成一个完整的组件。

> 那么，react 为何要这么做呢？

> 还是回到 react 的初衷，从初衷谈起，react 认为 UI 的展示由一个个的原子组件组成，因为一个组件就需要表达一个完整的小模块，包含它的 html 和它的动作 js，这样子就可以讲通这个问题了。

> 那么使用了 jsx 之后，jsx 是如何将一个 jsx 组件 转换为我们页面上所看到的视图的呢？

> 简单来说，我们使用 jsx 写的每一个组件，是不能直接进行渲染解析的，会先交给 babel 进行转义，生成虚拟的 dom 描述节点，，然后将这个节点再次交给 react 的 createElement 方法，底层通过判断节点中 type 组件类型，来做一系列的分析，最终去更新浏览器的真实 dom，浏览器再通过渲染绘制，生成我们所看到的视图！

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

在 React15 及以前，Reconciler 采用递归的方式创建虚拟 DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，React16 将递归的无法中断的更新重构为异步的可中断更新，由于曾经用于递归的虚拟 DOM 数据结构已经无法满足需要。于是，全新的 Fiber 架构应运而生。

#

> Fiber 是 react 16 重构之后的一个新概念。

> 15 以前 react 采用递归的方式创建虚拟 DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。16 之后 react 采用 fiber 架构，将递归的无法中断的更新重构为异步可中断的更新，整个程序会存在同时存在两个 fiber 节点树，一个用于最终更新到真实 dom 的 rootFiber，一个更新状态时的 workInProgress Fiber 树，每一个 fiber 节点上都包含了当前组件对应的类型，DOM 节点，更新优先级，当前节点在整个 root fibber 节点树中的位置等等

### 虚拟 dom 和 Diff 算法

> 从虚拟这个词可以看出，虚拟 dom 并非真实存在，那么为何在 vue 和 react 都存在虚拟 dom 呢

> 我们先来看看，现代前端框架之前如何更新真实 DOM 的

> 有过原生 js 和 JQuery 开发经验的同学都知道，js 和 JQuery 更新 dom 的方式就是获取真实 dom 的节点，根据节点直接进行 dom 操作

> 那么，直接操作 dom 有何弊端呢，这就要从我们前端同学最熟悉的浏览器说起，浏览器一共分为两种引擎，渲染引擎和 js 引擎，其中渲染引擎主要负责接收请求来的 HTML、CSS、javascript 等资源，然后解析、构建 DOM 树、渲染布局、绘制，最后呈现给客户能看到的界面，JS 引擎主要负责编译和运行整个网页的 JS 程序，当浏览器在运行时，如果同时存在大量的 DOM 节点重绘渲染就会导致页面卡顿。

> 思考一种方法，如果有一个算法，可以将浏览器的真实 dom 生成一个副本，每次在更新真实 dom 节点时，与这个副本进行比对，从而计算出真正需要更新的节点，这样就做到了增量更新，也极大的优化了浏览器的渲染，事实上这个以真实 dom 为基本，生成的副本就是虚拟 DOM，这种算法就是 DIff 算法。

### 调度器

> 调度器为 react 16 之后的产物，react 16 前 对真实 dom 的更新是一个不可中断的同步操作，也就是必须等到前一个更新任务结束，下一个更新任务才可以开始。16 后，react 将每一次的更新任务以 5 毫秒为基本单位，分为无法个任务切片，官方称之为时间切片，同时，在每一次的调用栈中，每一个切片都有更新优先级，为了极大的利用浏览器达到快速更新，react 更是模拟采用了浏览器的空闲时间，将一些优先级低的加入到空闲时间中进行，这种更新的机制就是 react 的调度器。

### 事件合成

> react 的本质是一个 ui 渲染框架，react 为了能够兼容所有的浏览器事件处理，自己实现了合成事件，我们所写的 react 事件，会被 react 丢进 react 事件池中， 解析为具体的合成事件类型，再根据 fiber 节点上的调度优先级映射到具体的 dom 事件中，v17 版本前，react 的合成事件挂在 document 上，v17 后，挂载在顶部容器上，同一个容器，可以容纳多个合成事件，这样为微前端做了铺垫

## 组件通讯

> 将 react 看成是一个宇宙，那么组成宇宙的每一个原子之间不可能完全独立，它们之间必然存在可以相互发送和接受信息的方式，这种方式就是组件之间的通讯

### 通讯方式 1(props 传递)

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

## react hooks

> react 从 16.8 版本以后引入了 hooks 的概念，主要是为了解决类的写法引起的函数指定 this，高阶函数导致 dom 嵌套混乱，同步更新导致的页面卡顿等问题,学习 hooks 最好的方式便是亲自动手，将以下常用 hooks 全部测试，尽可能的思考每一个 hooks 的使用场景！

### useState

> 无论任何框架，要做到数据和视图分离，首先就要清楚的是，如何将数据和视图通过特定的方式绑定，hooks 中的 useState 就是做这件事的。

> useState,通过传入五大数据类型或者函数返回值注入一个 state 的默认值)，此时会返回一个数组，数组中的第一个值就是 state 的值，我们可以当作用来做接受数据，从而渲染到具体的视图上，第二个值就是改变这个 state 值的全局唯一方法！

```jsx
import {useState } from react;

// state注入，state支持函数式和直接值的初始值两种方式注入

const [num,setNum]=useState(0)  //数字
const [title,setTitle]=useState('前端学点啥')  //字符串
const [isStudy,setIsStudy]=useState(true)  //布尔值
const [options,setOptions]=useState({name:'前端学点啥',age:18})  //对象
const [money,setMoney]=useState([6,66,666])  //数组

const [maxNum,setMaxNum]=useState(()=>(888))  // 函数式返回
const Demo=()=>{
  return (
    <>
    <p>{num}</p>
    // 更改state的值方式一(直接更改)
    <Button onClick={()=>{ setTitle('前端打工仔')  }}>{title}</Button>

     // 更改state的值方式二（函数式更改）
    <Button onClick={()=>{ setNum(current=>current+2)  }}>{num}</Button>

    //需要特别注意的是，数字，字符串，布尔可以直接修改，数组与对象修改时需要将原来的值与需要更新的值一起进行合并赋值
     <Button onClick={()=>{ setOptions({...options,name:'前端一直学'})  }}>{options.name}</Button>

    // 更改数组中的某个索引的值
     <Button onClick={()=>{ setMoney(current=>{current[0]=18;return [...current]})  }}>{num}</Button>

    </>
  )
}
export default Demo
```

#### useState 最佳实践

> useState 可以为项目中用到的每一个状态创建状态值，但是，如果无脑创建，则会造成状态满天飞的局面

```tsx
// 保存和更新用户信息

❌ bad
const [name,setName]=useState('前端学点啥')
const [age,setAge]=useState(18)
const [id,setID]=useState(007)

✅ good
const [user,setUser]=useState({ name:'',age:18,id:007})
```

### useEffect

> useEffect 为 react 提供的一个类似生命周期的方法，可以理解为合并了原来类组件 中的三个生命周期，挂载（didmount），更新（update）销毁（distroy）

> useEffect 方法接受两个参数，参数 1 为实际产生副作用的执行事件，参数 2 为参数 1 中实际依赖的数据,需要注意的是参数 2 不能为引用数据，原理是 useEffect 内部会将第二个参数依赖的数据进行浅层次对比，引用数据由于引用地址始终不变，因此每次对比后都会返回 true，都会引起数据的 update，从而产生死循环

- 第二个参数传值区别

  - 不传参
    - 不传参会使得组件每次渲染时，走一次此 useEffect，影响性能，所以**不推荐！！**
  - 传空数组
    - useEffect 为挂载，更新，销毁三个生命周期的组合，传入空数组时，此 useEffect 只会在挂载阶段运行一次，当数据更新后，不会重新渲染
  - 传监听的 state
    - 会在首次 mount 挂载一次，同时，当监听的数据发生改变时也会重新渲染一次数据.

- 如何监听引用数据类型

  - vue 与 react 的共同点都是对于引用数据，只能浅层监听，对于嵌套的数据无法正常监听，因此在使用 usestate 的时候，对引用数据更新时，只能重新给一个新值，改变地址，从而驱动数据再次更新
  - 因此**useEffect 第二个参数无法对引用数据进行监听**，实际开发中可使用第三方库 useDeepCompare 替代 useeffect，对引用数据进行依赖

- 异步数据请求（async await）

  - 使用 async 请求数据，不能直接定义 useeffect 为 async，需要定义一个方法进行数据请求和更改，并且调用方法即可
    ```js
    // 示例
    const [data, setData] = useState({ hits: [] });
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          "https://hn.algolia.com/api/v1/search?query=redux"
        );
        setData(result.data);
      };
      fetchData();
    }, []);
    ```

#### useEffect 最佳实践

```tsx
// 首先明确一点，useEffect只是类似于生命周期，但不完全等同于生命周期，类组件中的生命周期只能在生命周期方法中使用一次，useEffect更加提倡根据不同的功能拆分为不同的Effect

// 下面场景，拿到浏览器url中的token，存储到localStorag中，同时获取用户信息


❌ bad
const [userName,setUserName]=useState('')
useEffect(()=>{
// 虚假方法，获取浏览器url中的token
const token=getParams('token')
localStorage.setItem('token', token);

// 获取并保存用户状态
const getUserInfo=async ()=>{
     const name=await fetch.get('user')
     setUserName(name)
}
getUserInfo()
},[userName])

✅ good

const [userName,setUserName]=useState('')

useEffect(()=>{
const token=getParams('token')
localStorage.setItem('token', token);
},[])

useEffect(()=>{
const getUserInfo=async ()=>{
     const name=await fetch.get('user')
     setUserName(name)
}
getUserInfo()
},[userName])
```

### useCallback

> useCallback 具有缓存方法的功能，与 useEffect 一样的是，useCallback 也接受两个两个参数，参数 1 为具体的执行方法，参数 2 为方法 1 所依赖的数据,对比 useCallback 的使用，业内褒贬不一，主要在于 useCallBack 在缓存的同时，自身存在消耗。

> useCallback 的使用场景主要在于父子组件中相互调用时，减少不必要渲染，子组件使用 memo 包裹时，只会对基本数据做对比，对于子组件中的方法并不会产生作用，这时就需要父组件中使用 useCallBack 来对方法进行缓存，从而减少不必要的渲染

```jsx
// 示范
import { useCallback } from "react";
const [obj, setObj] = useState({ name: "前端学点啥", age: 18 });
const onChange = useCallback(() => {
  setObj({ ...{ name: "前端一直学", age: 20 } });
}, [obj]);
```

### useMemo

> usememo 和 usecallBack 有着非常相似的使用场景，两者内部都使用了一定的缓存效果，不同的是 usememo 是对值的缓存，usecallback 是对函数方法的缓存，关于 usememo 的使用，使用过 vue 的同学可以联想到 vue 中的 computed 计算方法，usememo 有同工之妙，不过业内对此也是褒贬不一，与 usecallback 存在同样的问题，两者在缓存优化的同时，自身都会带来额外的性能消耗，因此，也是建议在使用时，对于计算复杂的数据可以使用 usememo，数据较为简单的情况下不建议使用。

```jsx
// 示例
import { usememo } from "react";
const [options, setOptions] = useState({ title: "前端学点啥", age: 18 });
const title = usememo(() => options.title, [options]);
```

### useRef

### useContext

> 使用这个 api 之前先思考一个非常常见的场景，当一个页面或者模块非常复杂的情况下，我们通常会拆分为一些组件，那么当组件存在多层时，组件之间共享的状态该如何传递呢。

> 我们可以将数据通过 props 一层层传递，如果有这样做过的同学应该非常清楚，这样做，状态将会很难维护，而且需要层层去传值，很难保证值的唯一性

> 现在，我们就可以使用 useContext 这个语法糖来解决

```tsx
// 示例

// 父组件
import React from "react"
const Parent=()=>{
  const [num.setNum]=useState(1)
  // 创建上下文数据
  const contextData = React.createContext();

  // value 属性上挂载需要传递的数据，可以为状态值，也可以为修改状态值方法，或者其他全局能用到的方法
  return <contextData.Provider value={num}>
  <Son></Son>
  </contextData.Provider>
}
export default Parent


//孙子组件
import React , {useContext} from "react"
const Son=()=>{
  const [num.setNum]=useState(1)
  // 此时孙子组件中就可以通过useContext获取到父组件中传递的数据
  const contextData = useContext(contextData)
  return < >
  { contextData?.num}
  </>
}
export default Parent
```

### hooks 优化技巧

- 单独组件
  - 组件使用某个方法的返回值，只有值有变化时渲染
    - 使用 useMemo 包裹此方法，并在第二个参数中监听改变此值的 state
  - 组件引用某个 state，只有 state 改变时，才会进行渲染
    - 使用 useEffect 第二个参数进行监听，如只想在挂载时加载一次，第二个参数可使用空数组
- 父子组件调用
  - 父组件调用子组件，只有子组件引用的 state 改变时，才驱动子组件渲染
    - 使用 memo 方法包裹整个子组件，memo 方法会监听前后两次的 props 值，只有值改变才会驱动渲染

## 如何更好的写自定义 hooks

## 有状态和无状态组件

> react 非常重视数据和视图的分离，每一个组件中都会有数据和视图，那么数据究竟来自那里，从这个角度可以将 react 中的组件进行区别，组件中拥有自己定义的数据，这个数据完全由这个组件自己来控制，这样的组件就叫做有状态的组件，组件中不存在的自己定义的数据，需要来自其他组件以通讯等的方式传递数据，这样的组件就是无状态组件。

> 那么这样划分组件有何意义呢？

> 组件更加颗粒化，按照这样的分类标准，实际开发中，我们可以将一些常见的用于纯展示的 UI 视图拆分出来，从而减少数据的耦合度。

## 路由管理

[请直接阅读此文章](https://juejin.cn/post/7025418839454122015)

## 生命周期

> 在前端框架里，生命周期是一个很常见的概念，我们可以将其理解为人或者植物的生长阶段

> react 在类组件中有即将挂载（onMount）,挂载后（onMounted）,更新（onUpdate），销毁（onDestyed）等重要生命周期
>
> 函数式组件中，也有类似于生命周期的管理，函数组件的生命周期，请前往[hooks](./)应用中的 useEffect 中查看

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

- [react 布道师关于 react 的思考](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fmithi%2Freact-philosophies)
- [react 原理揭秘 ](https://react.iamkasong.com/)
- [react 最佳实践-网易云音乐团队 ](https://juejin.cn/post/6844904165500518414)
- [react 项目实践 ](https://juejin.cn/post/6844903985338400782)
