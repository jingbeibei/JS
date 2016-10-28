// error.js

// var err = new Error('错误的具体描述，主要是什么错误和错误的原因')
// console.log(1)
// // 只创建错误而不抛出错误并不会导致程序执行“出错”
// // 程序会继续正常往下执行
// throw err
// // 抛出错误，抛错误时程序终止执行,之后的代码不会被执行到
// console.log(2)
// // 当JS出错时，控制台可以显示错误信息，错误信息包含：
// // 错误类型名称
// // 错误时的函数调用栈（堆栈 stack）

// 函数调用栈记录了函数之间的调用关系，通过调用栈
// 可以观察到函数从哪个位置开始，进入哪个函数，
// 然后又进入哪个函数，直到到达当前位置（断点、错误）
// 只有在程序执行的过程中才能观察到调用栈
// 通常使用断点让程序暂停执行来观察调用栈

// // 错误消息（描述信息）
// // 错误所在行数（不是抛出错误的那一行
// // 而是造成错误的那一行或者实例化错误对象的那一行）和列数（第几个字符）

// var student
// console.log(student.name)
// TypeError
// 上面2行代码在执行时会出错，出错时JS执行引擎
// 会收集错误信息，创建相应的Error对象，并抛出
// 然后控制台才能显示出这个错误的详细信息

// student.sayHello()
// TypeError

// stdent.sayHello()
// ReferenceError

// TypeError表示出错的变量是存在的，只是类型不对
// ReferenceError表示出错的变量根本就不存在

// student.sayHello(）
// 圆括号写成中文或括号缺少都会出现 SyntaxError 语法错误

// 未捕获错误
// JS执行过程中出错（由执行引擎抛出错误），或者使用throw抛出一个错误
// 如果这个错误没有被捕获，则会导致程序终止执行（程序死掉）
// 捕获错误可以让程序不死，程序会跳过错误继续执行
// 通常允许恢复的错误才需要这样做


/*********************************** */

// var student

// if(student.isMale){
//     console.log('男生')
// }
// else{
//     console.log('女生')
// }

// try{
//     // 使用try将有可能出错的代码包围起来
//     student.sayHello()

//     if(student.isMale){
//         console.log('男生');
//     }
//     else{
//         console.log('女生');
//     }
// }
// catch(err){
//     if(err instanceof TypeError){
//         alert('这个学生没有定义isMale属性！');
//     }
//     else{
//         // 假设遇到一个无法处理的错误
//         // 可以选择不处理并再次抛出（使其它代码有机会捕获并处理这个错误）
//         // 也可以选择沉默，那这个错误就会消失

//         throw err;
//     }
// }

// console.log('如果你看到了这个输出，表明程序没死');

/*********************************** */

// function ValueRangeError(message){
//     var err = new Error();
//     this.name = 'ValueRangeError';
//     this.message = message;
//     this.stack = err.stack;
//     this.fileName = err.fileName;
//     this.lineNumber = err.lineNumber;
//     this.columnNumber = err.columnNumber;

//     console.log(err.stack);
// }

// 原型链实现继承
// ValueRangeError.prototype = Object.create(Error.prototype)
// ValueRangeError.prototype.constructor = ValueRangeError

// 
class ValueRangeError extends Error{
    constructor(message){
        super(message);
        this.name = 'ValueRangeError';
    }
}

function Point(x, y){
    if(typeof x != 'number'){
        // throw new Error('x必须是一个数字！')
        throw new TypeError('x必须是一个数字！');
    }
    if(x < 0){
        // throw new Error('x必须大于等于0！')
        throw new ValueRangeError('x必须大于等于0！');
    }

    if(typeof y != 'number'){
        // throw new Error('y必须是一个数字！')
        throw new TypeError('y必须是一个数字！');
    }
    if(y < 0){
        // throw new Error('y必须大于等于0！')
        throw new ValueRangeError('y必须大于等于0！');
    }

    this.x = x;
    this.y = y;
}


var p1 = new Point(1, -3);

// try{
//     var p1 = new Point(1, -3)
// }
// catch(err){
//     if(err instanceof ValueRangeError){
//         console.log('ValueRangeError:' + err)
//     }
// }

// 
window.onerror = function(){
    //显示一个友好错误提示！
    return true;
};