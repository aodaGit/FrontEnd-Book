# TS

> 简单来说，TS 就是 js 的类型集合，基于 ES 的语法，增强 JS 的弱类型，最终 TS 的代码依然会编译为 JS 代码在各种终端运行

> 相信很多人在学习 TS 时，会存在这样一个疑问，写 ts 要学习一大堆 ts 语法，还经常需要写接口文件，js 一把梭，多香，当然这是你没有嗅倒到 TS 的魅力

> TS 相对于 JS 的好处
>
> - 类型检查
>   - TS 的特点就是在编译阶段便可发现类型上的错误，而 JS 只能在运行时发现类型上的错误，简单来说我们在开发阶段，在我们的编辑器中便可以发现类型错误，从而避免部分线上 bug
> - 类型提示
>   - 相信很多开发过大型复杂站点的同学都遇到这种情况，某个接口，后端需要 n 个字段，每个字段都需要一一查找，避免不了 CV 大法，使用了 TS 后，直接定义接口 interface 类型，编辑器便可直接提示类型字段，是不是灰常 nice！
> - 函数参数类型定义
>   - 对于前端，实际业务开发中，我们会封装很多业务场景相同的组件，使用 js 的时候，当有同事封装了一个组件，在你引入后没有任何提示，没有任何参数说明，是不是很崩溃，使用 TS 可以很开心的解决此问题，TS 可以给函数类型以及返回值定义参数，当我们引入同事组件时，对于必填参数，编辑器直接会明确提示，并且会告诉你参数类型，是不是又灰常 nice！

## TS-基础类型

> ts 的基本类型除了我们所熟知的 js 基本类型外，还包含了 ts 特有的枚举和接口等类型

### 数字

```tsx
const list: number = 666;
```

### 布尔值

```tsx
const list: booble = false;
```

### 字符串

```tsx
const list: string = "前端学点啥";
```

### 对象

```tsx
// 对象的表示方式有多种，不过也存在误区

// 方式1  type
type Option = {
  name: string;
  age: number;
  [key: string]: any;
};
// 方式2 interface
interface Option {
  name: string;
  age: number;
  [key: string]: any;
}
// 方式3 TS官方约定的对象表示方法
Record<string,any>

// 误区
// 很多前端同学用{}来表示对象类型，其实不然，{}仅表示一个没有健值的对象，此时访问具体的key时就会报错
```

### 数组

```tsx
// 数组可以有两种主要的写法
// 常规类型写法
const list: number[] = [1, 1, 23];
// 泛型写法
const list: Array<number> = [1, 2, 3, 3];
```

## 接口（interfance）

```ts
// interface可以简单的一些类型的集合
// 如我们定义后端返回的用户信息
interface UserInfo {
  name: string;
  age: number;
  scool?: string;
}
```

## 枚举(enum)

#### 数字枚举

```tsx
// 默认以 0 开始
enum numbers {
a,
o,
d
}
numbers.a=0
numbers.0=1

// 可指定开始值
enum numbers {
a=18,
o,
d
}
numbers.a=18
numbers.o=19
// 数字枚举支持正反向
numbers['a']=18
numbers[18]=a
```

#### 字符串枚举

```tsx
enum numbers {
a="A",
o="O",
d="D"
}
numbers.a=A
numbers.0=O
```

### void

```tsx
// 一般用于函数无返回值时的类型
const onHandle = (): void => {
  // 表示函数onHandle仅更新state，无返回值
  setState(66666);
};
```

## TS-泛型

> 对于变量或者函数方法的类型，很多时候，我们都是明确知道的，不过，对于一些场景下，当一个变量类型我们无法明确判定时，便可用泛型的方式进行判定。

```ts
// 不使用泛型的情况
// 我们明确知道age是一个number类型
function getAge(age: number) {
  console("这是一个获取年龄的方法");
}

// 使用泛型的情况
// 对于用户输入的信息我们无法明确是什么类型
function getMessage<T>(message: T) {
  console.log("这是一个获取输入信息的方法");
}

// 具体调用
getMessage("信息"); // 此时ts可推导出T的实际类型为string

getMessage(1234); // 此时ts可推导出T的实际类型为number
```

## TS-断言

```tsx
// 参数后添加！感叹号，告诉程序开发者明确知道这是一个明显的类型

// 当我们可以完全确定isShow是一个布尔值时，可使用！告诉编译器，这是一个确定的值
const isShow! = true;
```

## TS-类型守卫

### in 关键字

```tsx
interface a {
  name: string;
  age: number;
}
interface b {
  school: string;
  money: number;
}

const test = (param: a | b) => {
  if ("name" in param) {
    return param?.name;
  } else {
    return param?.school;
  }
};
```

### typeOf 关键字

```tsx
const test = (param: string | number) => {
  if (typeof param === "number") {
    console.log(666);
    return Math.abs(param);
  }
};
```

## TS-联合类型

```tsx
// 定义不同的 interface，使用 type 组合类型

// sting|number
```

## TS-类型别名

```tsx
type Message = string | string[];
```

## TS-交叉类型

```tsx
import { type } from "node:os";

interface a {
  age: number;
}
interface b {
  name: string;
}
type Option = a & b;

let a: Option = {
  age: 66,
  name: "aoda",
};
```

## TS-任意属性

```tsx
type Options = {
  [key: string]: string | number;
};
```

## TS-类型继承

```tsx
// interface 继承

interface A {
  age: number;
  name: string;
}
interface Options extends A {
  school: string;
}

// type 继承
type A = string;

type B = A & number;
```

## TS 高级操(TS 内部集成方法)

### Pick

> 选取某个类型中的部分 key，组成新的类型

```ts
// 原有类型
interface Person {
  name:string,
  age:number,
  sex:'男'｜'女'
}

// 选取name和age组成新的类型
type NewPerson =Pick<Person,'name'|'age'>

const people:NewPerson ={
  name:'前端学点啥',
  age:18
}
```

### Omit

> 剔除某个类型中的部分 key，组成新的类型

```ts
// 原有类型
interface Person {
  name:string,
  age:number,
  sex:'男'｜'女'
}

// 选取name和age组成新的类型
type NewPerson =Omit<Person,'name'|'age'>

const people:NewPerson ={
  sex:'男'
}
```

### Extract

> 合并两个类型，取其中共同存在的交集为新的类型

```ts
// 原有类型1
interface Person1 {
  name:string,
  age:number,
  sex:'男'｜'女'
}
// 原有类型2
interface Person2 {
  name:string,
  sex:'男'｜'女',
  school:'计算机大学'
}

// 选取name和age组成新的类型
type NewPerson =Extract<Person1,Person2>

const people:NewPerson ={
  name:'前端学点啥',
  sex:'男'
}
```

### Exclude

> 剔除某个类型中的部分 key，组成新的类型，与 Omit 类似

```ts
// 原有类型
interface Person {
  name:string,
  age:number,
  sex:'男'｜'女'
}

// 选取name和age组成新的类型
type NewPerson =Exclude<Person,'name'|'age'>

const people:NewPerson ={
  sex:'男'
}
```

## 推荐阅读

### [TS 中文版](https://jkchao.github.io/typescript-book-chinese/)
