# TS
> 相信很多人在学习 TS 时，会存在这样一个疑问，写 ts 要学习一大堆 ts 语法，还经常需要写接口文件，js 一把梭，多香，当然这是你没有嗅倒到 TS 的魅力，使用 TS 可以让我们的变量类型更加健壮，同时减少线上由于类型导致的 BUG，少当背锅侠。

> 简要说，TS 就是一个 js 的类型集合，基于 js 之上，可以完美的检测到变量的类型

## TS-基础类型

> ts 的基本类型除了我们所熟知的 js 基本类型外，还包含了 ts 特有的枚举和接口等类型

### 数字

```tsx
const list: number = 666;
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
### 接口（interfance）

### 枚举(enum)

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

### 布尔

### void

```tsx
// 一般用于函数无返回值时的类型
```

## TS-断言

```tsx
// 参数后添加！感叹号，告诉程序开发者明确知道这是一个明显的类型
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
## 推荐阅读
### [TS中文版](https://jkchao.github.io/typescript-book-chinese/)

