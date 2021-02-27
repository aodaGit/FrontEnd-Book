# react-hooks的学习

> react从16.8版本以后引入了hooks的概念，主要是为了解决component引起的函数bind指定this，父传子等遗留问题

## useState

- useState(传入一个state的默认值。可以是五大数据类型)，此时会返回一个数组，数组中的第一个值就是state的值，第二个值就是改变这个state值的唯一方法
- 注意，数字和字符串可以直接修改，数组与对象修改时需要将原来的值与需要更新的值一起进行合并赋值

## useEffect

- 可以理解为合并了原来的conponent中的三个生命周期，didmount，update，willmount

##  createContext

- 在父组件中创建一个共享器  export  const 共享器名称=createContext（传入默认值）
  - 父组件中使用 <共享器.provider value={绑定需要传输的值}><共享器.provider value={绑定需要传输的值}/>
  - 自组件中 引入这个共享器。 引入useContext
  - const 传过来的值=useContext（共享器）
  - 子组件中可以使用这个定义的传过来的值

## useContext

