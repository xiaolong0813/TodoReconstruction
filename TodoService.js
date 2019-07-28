var log = function () {
    console.log.apply(console, arguments)
}

// 激活项： allItem, parentItem, childItem
var todoList = {
    // 父类包含子类id列表
    parentList: [
        {id: 0, name: '默默默认', children: [0], taskNum: 0}
    ],
    // 子类包含任务id列表
    childList : [
        {id: 0, pid : 0, name : "默默默认子分类", children: [0]}
    ],
    // 任务列表,包含所在的子类id，内容，以及时间，是否完成
    taskList : [
        {id: 0, pid : 0, name : "默默说明", content :
                "如果没有初始渲染，这里就是初始说明：本应用是离线应用，数据将存储在本地硬盘",
            date:'2019-7-27', finished : true}
    ]
}

var $ =  function (element) {
    if (element) {
        return document.querySelector(element)
    }
    else
        log("element do not exist")
}

// 元素注册事件
var addEvent = function (element, event, func) {
    try {
        element.addEventListener(event, func)
    } catch (e) {
        log("failed to add event")
    }
}

// 根据id在数组里面寻找元素
var findById = function (id, eleList) {
    for (let i = 0; i < eleList.length; i++) {
        if (String(id) === String(eleList[i].id))
            return eleList[i]
    }
    return null
}

// 删除数组中所有元素的某个class
function clearClass(array, className) {
    array.forEach(x => {
        if (x.classList.contains(className))
            x.classList.remove(className)
    })
}

// 保存todoList到LocalStorage
function saveTodoList() {
    var s = JSON.stringify(todoList)
    // log(s)
    localStorage.todoList = s;
}
// 读取todoList
function loadTodoList() {
    var a = localStorage.todoList
    if (a)
        return JSON.parse(a)
    else
        return todoList
}

// 清空数据库
function clearLocalStorage() {
    localStorage.clear()
}
