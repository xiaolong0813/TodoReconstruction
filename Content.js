
let ContentClass = function () {
    this.activeTask = null

    this.status = "finished"
    // 主容器
    this.container = $('main')

    // this.titleInput = `<input type="text" placeholder="请输入标题" class='todo-name-input'>`
    // this.dateInput = `<input type="date" class='todo-date-input'>`

    // 所写文字
    this.text = ""
    // 各个元素
    this.titleElement = $('.todo-title-note2')
    this.dateElement = $('.todo-time-note2')
    this.textElement = $('.textarea-content2')
    this.saveElement = $('.todo-saveAndQuit2')


}

ContentClass.prototype.getTitleElement = function(text) {
    return `<input type="text" placeholder="${text}" class='todo-name-input'>`
}

ContentClass.prototype.getDateElement = function() {
    return `<input type="date" class='todo-date-input'>`
}

// 添加任务，使各个元素可编辑
ContentClass.prototype.addTask = function(childId) {
    log("在child里面添加任务 : " + childId)
    this.status = "add"
    this.titleElement.innerHTML = this.getTitleElement("请输入标题")
    this.dateElement.innerHTML = this.getDateElement()

    this.textElement.removeAttribute('readonly')
    this.textElement.removeAttribute('disabled')
    this.textElement.value = ""
    // 按钮显示出来
    this.saveElement.style.display = 'block'

}

// 更新任务
ContentClass.prototype.updateTask = function(taskId) {


}

// 保存任务，完成添加或者更新的操作，根据全局变量status判断是添加还是更新
ContentClass.prototype.saveTask = function() {
    if (this.status === "add") {

    } else if (this.status === "update") {

    }
}

ContentClass.prototype.render = function () {
    log("render content")
    
    
}
