// index.js

// jquery大多数方法只需进行操作，调用者不需要拿到返回值
$('body').text('Hi Chain Call').css('color', 'red');

// underscore的大多数方法会返回一个有用的结果，调用者通常需要这个结果
var result = _.every([1, 2, 3, 4, 5], function(num){
    return num > 0;
});

// 但是，如果是一个复杂过程，需要对数据进行一连串的加工，则链式语法就有优势
var lyrics = [
    {line:1, words:"I'm a lumberjack and I'm okay"},
    {line:2, words:"I sleep all night and I work all day"},
    {line:3, words:"He's a lumberjack and he's okay"},
    {line:4, words:"He sleeps all night and he works all day"}
];


// 1、非链式调用
// 缺点：需要定义很多变量，需要使用很多赋值语句
// 优点：可以很方便的观察到中间值
var words = _.map(lyrics, function(line){
    // 注：_.map()会产生一个新数组
    // 
    return line.words.split(' ');
});
// 注意观察控制台输出结果
console.log(words);
var flattenWords = _.flatten(words);
console.log(flattenWords);
var stats = _.reduce(flattenWords, function(counts, word){
    // 第1次执行时，counts是种子
    // word的值是flattenWords里面的第1个单词
    counts[word] = (counts[word] || 0) + 1;
    return counts;
}, {});
console.log(stats);

// 2、链式调用
// 优点：思路连贯性好，没有中间变量和赋值语句打断思路，代码更简单
// 缺点：无法观察中间值，因为中间值被链式调用机制包裹起来了，调试时不方便
var stats = _.chain(lyrics)
    .map(function(line) {return line.words.split(' ');})
    .flatten()
    .reduce(function(counts, word){
        counts[word] = (counts[word] || 0) + 1;
        return counts;
    }, {})
    .value();
console.log(stats);

// 总结：undersocre链式调用的写法
// 第一步：使用_.chain(列表)包裹数据，开启链式调用
// 第二步：链式调用方法（这些方法都要省略第1个参数）
// 第三步：使用.value()将结果值从链式调用包裹中拆分出来

// reduce方法总结：
// 参数1：要归结的数组
// 参数2：种子（归结需要迭代每一个值，迭代时将当前值的结果
//        与之前所有迭代的结果连在一起，但是第一个值迭代时
//        前面还没有迭代结果，这个时候就需要种子）
// 参数3：迭代函数，传入2个参数，第1个参数是之前迭代的结果，
//        第2个参数是当前值，要返回的值是将之前的迭代结果与当前值组合在一起的结果
