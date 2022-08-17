// 1.声明一个变量a,同时指定它的类型为number
var a;
// 2.a的类型设置为number,在以后的使用过程中a的值只能是数字
a = 10;
var b;
b = '罗先略';
// 3.声明完变量直接进行赋值
var c = true;
// 4.如果变量声明和赋值是同时进行的,ts可自动检测变量类型
var d = false;
// 5.声明函数
function sum(a, b) {
    return a + b;
}
console.log(sum(123, 456));
console.log(a);
