

// // 获取目前激活的child的id : data-activechild="0"
// var getActiveChild = function () {
//     return $(".todo-item-container2").dataset.activechild2
// }
// // 获取目前激活的task的id
// var getActiveTask = function () {
//     return $(".todo-task-list2").dataset.activetask2
// }

var NavClass = function () {
    this.parentList = null
    this.childList = null

    this.activeNAVItem = "allItem"
    this.activeNAVID = null
    this.cover = $(".cover2")
    this.btm = $(".nav-btm2")
    this.select = $("#add-select2")
    this.cancel = $("#cancel2")
    this.ok = $("#ok2")
    this.input = $("#add-input2")
    this.taskNum = $("#taskNum")
    this.container = $(".todo-item-container2")
    this.allItem = $("#todo-item-all2")
    this.activeItemElement = $(`[data-${this.activeNAVItem}="${this.activeNAVID}"]`)
}

// 绑定“新增分类”按钮功能
NavClass.prototype.addParentBind = function () {
    // 1. 绑定弹窗功能
    addEvent(this.btm, "click",  function() {
        this.cover.style.display = "block";
        // select 列表中第一个置为选中
        this.select.children[0].selected = "selected";
    }.bind(this))
    // 2. 绑定关闭弹窗功能
    addEvent(this.cancel, "click", function () {
        this.cover.style.display = "none"
    }.bind(this))
    // 3. 绑定确认添加功能
    addEvent(this.ok, "click", function () {
        // 获取所在分类和子分类名称
        var selected = this.select.value
        var inputValue = this.input.value
        if (!inputValue) {
            alert("请输入名称")
        } else {
            this.addParentChildData(selected, inputValue)
            this.cover.style.display = 'none'
        }
    }.bind(this))
}

// 添加新的父类或者子类，根据selevted的值确定是父类还是子类
NavClass.prototype.addParentChildData = function (selected, value) {
    // log(selected + " : " + value)
    var selNum = Number(selected)
    // 选择默认分类得话就添加新父类
    if (selNum === 0) {
        var pLen = todoList.parentList.length
        var newPID = Number(todoList.parentList[pLen - 1].id) + 1
        var newParent = {id : newPID, name : value, children : [], taskNum: 0}
        todoList.parentList.push(newParent)
    }
    else {
        var cLen = todoList.childList.length;
        var newCID = Number(todoList.childList[cLen - 1].id) + 1
        var newChild = {id: newCID, pid : selNum, name: value, children: []}
        todoList.childList.push(newChild)
        // 除了添加入childList，还需要修改parentList中的children数组
        var pEle = findById(selNum, todoList.parentList)
        pEle.children.push(newCID)
    }
    this.rendNav()
    // 把新的todoList 存入localStorage
    saveTodoList()
}

NavClass.prototype.rendNav = function () {
    // 重新从todoList获取数据
    this.parentList = todoList.parentList
    this.childList = todoList.childList
    // 任务个数写入
    // log("更新头都List之后的： " +  this.parentList)
    this.taskNum.innerHTML = this.childList.length

    // 刷新container的内容，也就是加入各个分类元素
    this.container.innerHTML = ''
    this.select.innerHTML = ""

    // 导入父元素
    for (let i = 0; i < this.parentList.length; i++) {
        this.rendParentList(this.parentList[i])
    }
    // 导入子元素
    for (let i = 0; i < this.childList.length; i++) {
        this.rendChildList(this.childList[i])
    }

    // 激活某个item
    this.activeOneItemNAV()
}

// 只激活列表中的一个元素的某个属性
// function activeOneElement(element, ) {
//
// }


// 获取父类分类的HTML
NavClass.prototype.getParentHTML = function(parentListElement) {
    var trash = '';
    // 如果是默认分类，不添加trash标志
    if (!(parentListElement.id === 0))
        trash = `<i class="fa fa-trash-o" style='display:none'></i>`;
    return `<div class="todo-item2" data-parentItem=${parentListElement.id}>
        <div class="todo-item-title2 todo-item-delete2">
            <span class='title-span2'>
            <i class="fa fa-folder-open"></i>  ${parentListElement.name}  (${parentListElement.taskNum})</span>
            ${trash}
        </div>
    </div>`
}
// 获取子类分类的HTML
NavClass.prototype.getChildHTML = function(childListElement) {
    var trash = '';
    // 如果是默认分类，不添加trash标志
    if (!(childListElement.id === 0))
        trash = `<i class="fa fa-trash-o" style='display:none'></i>`;
    var sum = childListElement.children.length;
    return `<div class="todo-item-child2 todo-item-delete2" data-childItem=${childListElement.id}>
                <span class='child-span2'>
                <i class="fa fa-file-o"></i>  ${childListElement.name}  (${sum})</span>
                ${trash}
            </div>`;
}
// 渲染nav中的parentList
NavClass.prototype.rendParentList = function(parentListElement) {
    // 将父类分类对应的元素添加入对应html中
    var t = this.getParentHTML(parentListElement)
    this.container.insertAdjacentHTML('beforeend', t);
    // 添加select的option元素
    var s = `<option value=${parentListElement.id}>${parentListElement.name}</option>`
    this.select.insertAdjacentHTML('beforeend', s)
}

// 渲染nav中的childList
NavClass.prototype.rendChildList = function(childListElement) {
    var t = this.getChildHTML(childListElement)
    var pid = childListElement.pid
    // 找到插入的父类元素
    $(`[data-parentItem="${pid}"]`).insertAdjacentHTML('beforeend', t)
}

// 根据全局变量 activeNAV激活某个变量
NavClass.prototype.activeOneItemNAV = function() {
    // 先删除nav中所有元素的class
    clearClass(document.querySelectorAll(".todo-item-child2"))
    clearClass(document.querySelectorAll(".todo-item-title2"))
    // 根据全局变量选取激活项
    if (this.activeNAVItem === "allItem")
        this.allItem.classList.add("child-active2")
    else
        this.activeItemElement.classList.add("child-active2")
}

NavClass.prototype.itemBind = function () {
    addEvent(this.container, "click", function (e) {
        let tar = e.target
        let item = tar.closest('.todo-item-delete2')
        if (item){
            // this.activeNAVItem =
        }



    }.bind(this))

}

NavClass.prototype.bindAll = function () {
    this.addParentBind()
    this.itemBind()

}



// 初始化，导入localStorage数据
// function initTodoList(nav) {
//     todoList = loadTodoList();
//     rendNav()
// }

// // 绑定事件
// var bindEvents = function (nav) {
//
//     nav.addParentBind();
//
// }

