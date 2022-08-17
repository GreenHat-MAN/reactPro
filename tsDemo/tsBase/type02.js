// object表示一个js对象
// js对象类型太多
var a;
a = {};
a = function () { };
// {} 用来指定对象中可以用来包含哪些属性和类型
// 1.语法:{属性名:属性值,属性名?:属性值}--->?代表属性是可选的可有可无
var b;
b = { name: '罗先略' };
// 通过设置[propName:string]:any 表示任意类型的属性****
var c;
// 设置带两个参数的函数结构的类型声明
// 语法:(形参:类型,形参:类型....) = > 返回值
var d;
d = function (n1, n2) { return n1 + n2; };
// 2.数组类型
var e; //--->字符串数组
e = ['a', 'b', 'c'];
var f; //--->数值数组
var g; //任意类型数组
// 3.元组---->固定长度的数组tum
// 语法:[类型,类型,类型....]
var h; //两个值的元组
h = ['a', 1];
// 4.枚举类型enum ----->所有可能的情况列举出来
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female"; //女
})(Gender || (Gender = {}));
var i;
i = {
    name: '大熊',
    gender: Gender.Male
};
console.log(i.gender === Gender.Male);
