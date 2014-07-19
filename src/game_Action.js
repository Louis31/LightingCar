
//游戏动作场景
var gameAction = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new scorelayer();
        this.addChild(layer);
        layer.init();
    }
});
