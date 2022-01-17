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
    <Button onClick={()=>{ setTitle('前端打工仔')  }}>{num}</Button>
    </>
  )
}
export default Demo
```

- 注意，数字和字符串可以直接修改，数组与对象修改时需要将原来的值与需要更新的值一起进行合并赋值

## useEffect

#### 定义

- 可以理解为合并了原来的 conponent 中的三个生命周期，didmount，update，willmount

#### 常用 api

- 数据更新监听
  - 当需要对某一项值进行监听时，可以使用第二个参数，参数类型为基本数据类型，不能是引用数据类型，监听引用数据类型会造成死循环
- 第二个参数传值区别
  - 不传参
    - 不传参会使得组件每次渲染时，走一次此 useEffect，影响性能，所以**不推荐！！**
  - 传空数组
    - useEffect 为挂载，更新，销毁三个生命周期的组合，传入空数组时，此 useEffect 只会在挂载阶段运行一次，当数据更新后，不会重新渲染
  - 传监听的 state
    - 会在首次 mount 挂载一次，同时，当监听的数据发生改变时也会重新渲染一次数据，**不建议在此 eeect 中直接修改 state 的值，直接修改会触发 update 更新生命周期，因此整个组件会渲染两次**
- 如何监听引用数据类型
  - vue 与 react 的共同点都是对于引用数据，只能浅层监听，对于嵌套的数据无法正常监听，因此在使用 usestate 的时候，对引用数据更新时，只能重新给一个新值，改变地址，从而驱动数据再次更新
  - 因此**useEffect 第二个参数无法对引用数据进行监听**
- 异步数据请求（async await）

  - 使用 async 请求数据，不能直接定义 useeffect 为 async，需要定义一个方法进行数据请求和更改，并且调用方法即可

  - 示例

    ``

    ```js
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

## createContext

- 在父组件中创建一个共享器 export const 共享器名称=createContext（传入默认值）
  - 父组件中使用 <共享器.provider value={绑定需要传输的值}><共享器.provider value={绑定需要传输的值}/>
  - 自组件中 引入这个共享器。 引入 useContext
  - const 传过来的值=useContext（共享器）
  - 子组件中可以使用这个定义的传过来的值

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
    -
