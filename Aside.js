

var AsideClass = function (nav) {
    this.nav = nav
    this.btm = $('.aside-btm2')
    this.item = nav.activeNAVItem

}

AsideClass.prototype.test = function () {
    log(this.item)

}

AsideClass.prototype.addTaskBind = function () {
    addEvent(this.btm, "click", function () {
        // var item = this.nav.
        
    })
    
}
