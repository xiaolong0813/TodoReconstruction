// 注意：
// 1. 在类中，如nav，使用事件绑定函数addEvent(element,event,func)中的func是匿名函数，在其中直接调用this
// 不会指向nav类，而是指向调用此函数的element。需要传入指向nav对象的this值，可以在匿名函数后面加上bind(this)
// 即addEvent(element,event,func(){}.bind(this))。注意不能用call或者apply，那样会立即执行函数，bind可以
// 只绑定但不执行

// 2. $(`[data-item="parent"][data-id="${pid}"]`) 可以使用两个参数定位一个元素。


// 主函数
var __main = function () {
    todoList = loadTodoList();
    // clearLocalStorage()

    let content = new ContentClass()

    let aside = new AsideClass(content)
    aside.bindAll()

    let nav = new NavClass(aside)
    nav.bindAll()
    nav.render()



    // bindEvents(nav)
    // initTodoList(nav)
}
// 启动主函数

var test =  function() {
    [1,2,3,4].forEach(x => {
        log(x + 1)
    })
}

__main()
// test()
