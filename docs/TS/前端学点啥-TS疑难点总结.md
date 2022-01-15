# [TS](./前端学点啥-TS疑难点总结.md)

## TS-基础类型

### 数字

### 字符串

### 对象

### 数组

#### 常规类型写法

```tsx
const list: number[] = [1, 1, 23];
```

#### 泛型写法

```tsx
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
