// sessionStorage.js

// setItem(key, value):保存数据
sessionStorage.setItem('name', 'ZhangSan')
sessionStorage.setItem('age', '6')
sessionStorage.setItem('p', {name: 'ZhangSan', age: 3})

// 只能保存字符串数据！！！

// 如果想保存一个对象，可以使用JSON序列化和反序列化
var obj = {name: 'ZhangSan', age: 3}

sessionStorage.setItem('p', JSON.stringify(obj))


// 设置数据：
// sessionStorage.setItem('key', 'value')
// 获取数据：
// sessionStorage.getItem('key')
// 删除一个数据
// sessionStorage.removeItem('key')
// 清空数据
// sessionStorage.clear()
// 数据个数
// sessionStorage.length
// 指定索引位置的数据名称
// sessionStorage.key(index)