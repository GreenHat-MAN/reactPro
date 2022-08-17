// 1.声明一个变量a,同时指定它的类型为number
let a: number;

// 2.a的类型设置为number,在以后的使用过程中a的值只能是数字
a = 10

let b: string;

b = '罗先略'

// 3.声明完变量直接进行赋值
let c: boolean = true;

// 4.如果变量声明和赋值是同时进行的,ts可自动检测变量类型
let d = false;

// 5.声明函数参数类型,且多传和少传都会报错,函数返回值类型也可以声明
function sum(a: number, b: number): number {
    return a + b;
}

let result = sum(456, 123)

console.log(sum(123, 456));

console.log(a);
