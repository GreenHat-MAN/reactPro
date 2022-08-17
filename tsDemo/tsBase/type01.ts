// 直接使用字面量进行类型声明
let a: 10;
// 类型只能为声明的值


// |代表或的意思,连接多个类型可以是字面量和原始类型------>联合类型
let b: 'male' | 'female';

let c: boolean | string;

// any代表任意类型,设置后代表对该变量关闭类型检测(跟js没两样)---->不建议使用
// 声明变量不指定类型则为隐式的any类型
// any类型可赋值给任何变量改变赋值变量的类型
let d: any;
d = 10;
d = 'hellow';
d = true;

// 声明一个未知类型赋值给其他变量会报错
let e: unknown;
e = 10;
e = true;
e = 'word'

let s: string;

// unknown实际上就是一个类型安全的any,不能直接赋值给其他变量
// 解决方法---->类型检查
// if(typeof e==='string'){ //需要赋值的变量 }

// 赋值时进行类型断言---->用来告诉解析器本身的实际类型
s = e as string;
s = <string>e; //两种方法进行断言

// 不设置类型返回值都是any
// function fn(num) {
//     return true;
// }

// 设置void类型默认函数没有返回值
function one():void{
    // return null;
    return undefined; //可将返回值设为undefined
}

// never表示永远不会返回结果
function two():never{
    throw new Error('出错了')
}