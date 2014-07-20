
var Enemy = cc.Sprite.extend({
    speed:5,
	type:1,
	zOrder:1000,
	delayTime:1.0 ,
	active:false,
    ctor:function (index) {
   this._super();
	 index =  typeof  index === "number" ?(index>= EnemyType.length ? EnemyType.length -1:index):0;
           this.initWithSpriteFrameName(EnemyType[index]);
		 	winSize = cc.Director.getInstance().getWinSize();
			this.setScale(0.2);
		this.setPosition(winSize.width/2,winSize.height);
	this.active = true;
	 
      
    },
   
    
    destroy:function () {
        
        this.setVisible(false);
        this.active = false;
        this.stopAllActions();
        MW.ACTIVE_ENEMIES--;
    },
  
   
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 4, a.width, a.height / 2+20);
    },
	update:function(dt){
	 var p = this.getPosition();
	  if (p.x < 0 || p.x > g_sharedGameLayer.screenRect.width || p.y < 0 || p.y > g_sharedGameLayer.screenRect.height || this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
 
	},  
/**
  下去动作
 */

	down:function(){
	   var p = this.getPosition();
		this.setPosition(p.x ,p.y-this.speed);
      
	}
});

Enemy.getOrCreateEnemy = function (arg) {
    var selChild = null;
    for (var j = 0; j < MW.CONTAINER.ENEMIES.length; j++) {
        selChild = MW.CONTAINER.ENEMIES[j];
        if (selChild.active == false ) {
            selChild.active = true;
            selChild.schedule(selChild.down,selChild.delayTime);
            selChild.setVisible(true);
            MW.ACTIVE_ENEMIES++;
            return selChild;
        }
    }
    selChild = Enemy.create(arg);
    MW.ACTIVE_ENEMIES++;
    return selChild;
};

Enemy.create = function (arg) {
    var enemy = new Enemy(arg);
    g_sharedGameLayer.addEnemy(enemy, enemy.zOrder, MW.UNIT_TAG.ENEMY);
    MW.CONTAINER.ENEMIES.push(enemy);
    return enemy;
};

Enemy.preSet = function () {
    var enemy = null;
    for (var i = 0; i < 3; i++) {
        for (var i = 0; i < EnemyType.length; i++) {
            enemy = Enemy.create(i);
            enemy.setVisible(false);
            enemy.active = false;
            enemy.stopAllActions();
            enemy.unscheduleAllCallbacks();
        }
    }
};