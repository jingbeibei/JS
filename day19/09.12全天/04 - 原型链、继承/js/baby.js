// baby.js

function Baby(name, isMale, birthDate){
    this.name = name;
    this.isMale = isMale;
    this.birthDate = birthDate;
    // this.height = ...
    // 冻结一个对象
    Object.freeze(this);
}

// 向对象的原型中添加一些方法
Baby.prototype.eat = function(food){
    console.log(this.name + '喜欢吃' + food);
}

Baby.prototype.sleep = function(hours){
    console.log(this.name + '睡了' + hours + '个小时');
}

Baby.prototype.getAge = function(){
    // 得到年龄
    return new Date().getFullYear() - this.birthDate.getFullYear();

}

// 向原型中添加一个属性
Object.defineProperty(Baby.prototype ,'age', {
    enumerable: true,
    configurable: false,
    get: function(){
        return new Date().getFullYear() - this.birthDate.getFullYear();
    }
})