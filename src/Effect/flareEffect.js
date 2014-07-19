var flareEffect = function (flare,target, callback) {

    flare.setVisible(true);
    flare.stopAllActions();
    flare.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
    flare.setOpacity(0);
    flare.setPosition(-30, 297);
    flare.setRotation(-120);
    flare.setScale(0.2);

    var opacityAnim = cc.FadeTo.create(0.5, 255);
    var opacDim = cc.FadeTo.create(1, 0);
    var biggeAnim = cc.ScaleBy.create(0.7, 1.2, 1.2);
    var biggerEase = cc.EaseSineOut.create(biggeAnim);
    var moveAnim = cc.MoveBy.create(0.5, cc.p(328, 0));
    var easeMove = cc.EaseSineOut.create(moveAnim);
    var rotateAnim = cc.RotateBy.create(2.5, 90);
    var rotateEase = cc.EaseExponentialOut.create(rotateAnim);
    var bigger = cc.ScaleTo.create(0.5, 1);

    var onComplete = cc.CallFunc.create(callback, target);
    var killflare = cc.CallFunc.create(function () {
        this.getParent().removeChild(this,true);
    }, flare);
    flare.runAction(cc.Sequence.create(opacityAnim, biggerEase, opacDim, killflare, onComplete));
    flare.runAction(easeMove);
    flare.runAction(rotateEase);
    flare.runAction(bigger);
};


