# react-hooks 的学习

> react 从 16.8 版本以后引入了 hooks 的概念，主要是为了解决类的写法引起的函数指定 this，高阶函数导致 dom 嵌套混乱等问题,学习 hooks 最好的方式便是亲自动手，将以下常用 hooks 全部测试，尽可能的思考每一个 hooks 的使用场景！

## useState

> 无论任何框架，要做到数据和视图分离，首先就要清楚的是，如何将数据和视图通过特定的方式绑定，hooks中的useState就是做这件事的。

> useState,通过传入五大数据类型或者函数返回值注入一个 state 的默认值)，此时会返回一个数组，数组中的第一个值就是 state 的值，我们可以当作用来做接受数据，从而渲染到具体的视图上，第二个值就是改变这个 state 值的全局唯一方法！

### 使用方式

```jsx
import {useState } from react;

// state注入
const [num,setNum]=useState(0)  //数字
const [title,setTitle]=useState('前端学点啥')  //字符串
const [isStudy,setIsStudy]=useState(true)  //布尔值
const [options,setOptions]=useState({name:'前端学点啥',age:18})  //对象
const [money,setMoney]=useState([6,66,666])  //数组
const Demo=()=>{
  return (
    <>
    <p>{num}</p>
    // 更改state的值方式一(直接更改)
    <Button onClick={()=>{ setTitle('前端打工仔')  }}>{title}</Button>
    
     // 更改state的值方式二（函数式更改）
    <Button onClick={()=>{ setNum(current=>current+2)  }}>{num}</Button>
    
    //需要特别注意的是⚠️，数字，字符串，布尔可以直接修改，数组与对象修改时需要将原来的值与需要更新的值一起进行合并赋值
     <Button onClick={()=>{ setOptions({...options,name:'前端一直学'})  }}>{options.name}</Button>
    
    // 更改数组中的某个索引的值
     <Button onClick={()=>{ setMoney(current=>{current[0]=18;return [...current]})  }}>{num}</Button>
    
    </>
  )
}
export default Demo
```

## useEffect

> useEffect为react提供的一个类似生命周期的方法，可以理解为合并了原来类组件 中的三个生命周期，挂载（didmount），更新（update）销毁（distroy）

> useEffect方法接受两个参数，参数1为实际产生副作用的执行事件，参数2为参数1中实际依赖的数据,需要注意的是参数2不能为引用数据，原理是useEffect内部会将第二个参数依赖的数据进行浅层次对比，引用数据由于引用地址始终不变，因此每次对比后都会返回true，都会引起数据的update，从而产生死循环
> 
- 第二个参数传值区别

  - 不传参
    - 不传参会使得组件每次渲染时，走一次此 useEffect，影响性能，所以**不推荐！！**
  - 传空数组
    - useEffect 为挂载，更新，销毁三个生命周期的组合，传入空数组时，此 useEffect 只会在挂载阶段运行一次，当数据更新后，不会重新渲染
  - 传监听的 state
    - 会在首次 mount 挂载一次，同时，当监听的数据发生改变时也会重新渲染一次数据，**不建议在此 eeect 中直接修改 state 的值，直接修改会触发 update 更新生命周期，因此整个组件会渲染两次**

- 如何监听引用数据类型

  - vue 与 react 的共同点都是对于引用数据，只能浅层监听，对于嵌套的数据无法正常监听，因此在使用 usestate 的时候，对引用数据更新时，只能重新给一个新值，改变地址，从而驱动数据再次更新
  - 因此**useEffect 第二个参数无法对引用数据进行监听**，实际开发中可使用第三方库useDeepCompare替代useeffect，对引用数据进行依赖

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

## useCallback
> useCallback具有缓存方法的功能，与useEffect一样的是，useCallback也接受两个两个参数，参数1为具体的执行方法，参数2为方法1所依赖的数据,对比useCallback的使用，业内褒贬不一，主要在于useCallBack在缓存的同时，自身存在消耗。

> useCallback的使用场景主要在于父子组件中相互调用时，减少不必要渲染，子组件使用memo包裹时，只会对基本数据做对比，对于子组件中的方法并不会产生作用，这时就需要父组件中使用usecallBack来对方法进行缓存，从而减少不必要的渲染

```jsx
// 示范
import {useCallback} from "react"
const [obj,setObj]=useState({name:'前端学点啥',age:18})
const onChange=useCallback(()=>{
  setObj({...{name:'前端一直学',age:20}})
},[obj])
```
## useMemo

> usememo和usecallBack有着非常相似的使用场景，两者内部都使用了一定的缓存效果，不同的是usememo是对值的缓存，usecallback是对函数方法的缓存，关于usememo的使用，使用过vue的同学可以联想到vue中的computed计算方法，usememo有同工之妙，不过业内对此也是褒贬不一，与usecallback存在同样的问题，两者在缓存优化的同时，自身都会带来额外的性能消耗，因此，也是建议在使用时，对于计算复杂的数据可以使用usememo，数据较为简单的情况下不建议使用。

```jsx
// 示例
import {usememo} from "react"
const [options,setOptions]=useState({title:'前端学点啥',age:18})
const title=usememo(()=>(
  options.title
),[options])
```

## useRef

## useContext

###　优化技巧

- 单独组件
  - 组件使用某个方法的返回值，只有值有变化时渲染
    - 使用 useMemo 包裹此方法，并在第二个参数中监听改变此值的 state
  - 组件引用某个 state，只有 state 改变时，才会进行渲染
    - 使用 useEffect 第二个参数进行监听，如只想在挂载时加载一次，第二个参数可使用空数组
- 父子组件调用
  - 父组件调用子组件，只有子组件引用的 state 改变时，才驱动子组件渲染
    - 使用 memo 方法包裹整个子组件，memo 方法会监听前后两次的 props 值，只有值改变才会驱动渲染
