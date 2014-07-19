

var gameAction = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new beginLayer();
        this.addChild(layer);
        layer.init();
    }
});
