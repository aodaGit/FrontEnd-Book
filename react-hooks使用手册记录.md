# react-hooks的学习

> react从16.8版本以后引入了hooks的概念，主要是为了解决component引起的函数bind指定this，高阶函数导致dom嵌套混乱问题

## useState

#### 定义

- useState(传入一个state的默认值。可以是五大数据类型)，此时会返回一个数组，数组中的第一个值就是state的值，第二个值就是改变这个state值的唯一方法

#### 常用api

- 函数式更新state的值
  - 使用了useState创建初始值后，改变数据的唯一方式就是数据第二个方法，通常第二个方法也可以传入一个函数，函数返回这个值即可，针对这个特点，可以给react封装一个全局方法，改变引用数据类型，每次更改引用数据类型的state时，只需传参更改数据即可

    ```react
    import React, { useEffect, useState } from "react";
    function Meau() {
      // 设定一个初始数组
      const [meauList, setMeauList] = useState([]);
      const [textList, setTextList] = useState([
        "第一个值",
        "第二个值",
        "第三个值",
      ]);
      useEffect(() => {
        setMeauList(["1", "2", "3", 8, 9, 50]);
      }, []);
    
      const changeMeau = (data, index, val) => {
        setMeauList(changeData(data, index, val));
      };
      const changeTextFn = (data, index, val) => {
        setTextList(changeData(data, index, val));
      };
    
      const changeData = (data, index, val) => {
        //拷贝引用数据，更改地址
        let temp = [...data];
        temp[index] = val;
        return temp;
      };
    
      // 具体页面展示dom
      return (
        <div>
          <ul>
            {meauList.map((item, index) => (
              <li
                onClick={() => {
                  changeMeau(meauList, index, +item + 1);
                }}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
          {textList.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                changeTextFn(textList, index, "这个值已更改");
              }}
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
    
    export default Meau;
    
    ```
  
    
  
- 注意，数字和字符串可以直接修改，数组与对象修改时需要将原来的值与需要更新的值一起进行合并赋值

## useEffect

#### 定义

- 可以理解为合并了原来的conponent中的三个生命周期，didmount，update，willmount

#### 常用api

- 数据更新监听
  - 当需要对某一项值进行监听时，可以使用第二个参数，参数类型为基本数据类型，不能是引用数据类型，监听引用数据类型会造成死循环
- 第二个参数传值区别
  - 不传参
    - 不传参会使得组件每次渲染时，走一次此useEffect，影响性能，所以**不推荐！！**
  - 传空数组
    - useEffect为挂载，更新，销毁三个生命周期的组合，传入空数组时，此useEffect只会在挂载阶段运行一次，当数据更新后，不会重新渲染
  - 传监听的state
    - 会在首次mount挂载一次，同时，当监听的数据发生改变时也会重新渲染一次数据
- 如何监听引用数据类型
  - vue与react的共同点都是对于引用数据，只能浅层监听，对于嵌套的数据无法正常监听，因此在使用usestate的时候，对引用数据更新时，只能重新给一个新值，改变地址，从而驱动数据再次更新
  - 因此**useEffect第二个参数无法对引用数据进行监听**
- 异步数据请求（async await）
  - 使用async请求数据，不能直接定义useeffect为async，需要定义一个方法进行数据请求和更改，并且调用方法即可

##  createContext

- 在父组件中创建一个共享器  export  const 共享器名称=createContext（传入默认值）
  - 父组件中使用 <共享器.provider value={绑定需要传输的值}><共享器.provider value={绑定需要传输的值}/>
  - 自组件中 引入这个共享器。 引入useContext
  - const 传过来的值=useContext（共享器）
  - 子组件中可以使用这个定义的传过来的值

## useContext

###　优化技巧

