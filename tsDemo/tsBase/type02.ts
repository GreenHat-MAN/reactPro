// object表示一个js对象
// js对象类型太多
let a: object;
a = {};
a = function () { };


// {} 用来指定对象中可以用来包含哪些属性和类型
// 1.语法:{属性名:属性值,属性名?:属性值}--->?代表属性是可选的可有可无
let b: {
    name: string,
    age?: number
};

b = { name: '罗先略' };


// 通过设置[propName:string]:any 表示任意类型的属性****
let c: { name: string, [propName: string]: any };


// 设置带两个参数的函数结构的类型声明
// 语法:(形参:类型,形参:类型....) = > 返回值
let d: (a: number, b: number) => number;

d = function (n1, n2): number { return n1 + n2 }


// 2.数组类型
let e: string[] //--->字符串数组
e = ['a', 'b', 'c'];

let f: number[] //--->数值数组

let g: Array<any>; //任意类型数组


// 3.元组---->固定长度的数组tum
// 语法:[类型,类型,类型....]
let h: [string, number]; //两个值的元组
h = ['a', 1];

// 4.枚举类型enum ----->所有可能的情况列举出来
enum Gender {
    Male = 0, //男
    Female = 1 //女
}
let i: { name: string, gender: Gender };
i = {
    name: '大熊',
    gender: Gender.Male
}
console.log(i.gender === Gender.Male);

//5. &表示且 、 同时连接两个对象都需满足
// let j:string & number; //---->错误写法
let j: { name: string } & { age: number };

// 6.类型的别名
type myType = string;
type myNum = 1 | 2 | 3 | 4 | 5
let k: myNum; //----->可取1-5之间的类型范围值
let m: myType;