

let AsideClass = function (content) {
    // this.nav = nav
    this.content = content

    this.btm = $('.aside-btm2')

    // activeNAVItem 的取值可以为 parent, child allItem
    this.activeNAVItem = "allItem"
    this.activeNAVID = null

}

AsideClass.prototype.test = function () {
    log(this.item)

}

AsideClass.prototype.addTaskBind = function () {
    addEvent(this.btm, "click", function () {
        let item = this.activeNAVItem
        log(item)
        // 判断当前是否在子类下，不在的话不能添加
        if (!(item === "child"))
            alert("请选择子分类")
        else {
            let id = this.activeNAVID
            this.content.addTask(id)
        }
    }.bind(this))
    
}

AsideClass.prototype.render = function () {
    log("aside")





    this.content.render()
    // log(this.activeNAVItem + ":" + this.activeNAVID)




}


AsideClass.prototype.bindAll = function () {
    this.addTaskBind()
}
