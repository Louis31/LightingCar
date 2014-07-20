 var shipFrame=shipFrame|| ["sc_30.png","sc_27.png","sc_32.png","sc_34.png"];

var Ship = cc.Sprite.extend({
    speed:220,
    throwBombing:false,
    canBeAttack:true,
    isThrowingBomb:false,
    zOrder:MW.SPRITORDER,
	level:0,
	HP:1,
    appearPosition:cc.p(160, 60),
    _hurtColorLife:0,
    active:true,
    bornSprite:null,
     animation :null,
	 frame:[],
	 aerated:null,
	 action:true,

    ctor:function () {
        this._super();
        this.initWithSpriteFrameName(shipFrame[0]);
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);
		this.setScale(0.2);
      
	  
	  
	  for(var i =0 , b = shipFrame.length ; i < b ; i++){
	   this.frame[i]= cc.SpriteFrameCache.getInstance().getSpriteFrame(shipFrame[i]);
       
}	   
		
		this.setDisplayFrame(  this.frame[0]);

		/**var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
		animFrames.push(frame3);
        animFrames.push(frame3);
		*/
        // ship animate
		
       //  this.animation = cc.AnimationCache.getInstance();
		this.scheduleUpdate();
        //this.schedule(this.shoot, 1 / 6);

        //this.initBornSprite();
        //this.born();
    },
    update:function (dt) {
    // Keys are only enabled on the browser
        if (this.action&&sys.platform == 'browser') {
            var pos = this.getPosition();
            if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && pos.y <= winSize.height) {
                pos.y += dt * this.speed;
            }
            if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && pos.y >= 0) {
                pos.y -= dt * this.speed;
            }
            if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && pos.x >= 0) {
                pos.x -= dt * this.speed;
            }
            if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) && pos.x <= winSize.width) {
                pos.x += dt * this.speed;
            }
            this.setPosition(pos);
        }

        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
        this._timeTick += dt;
        if (this._timeTick > 0.1) {
            this._timeTick = 0;
            if (this._hurtColorLife > 0) {
                this._hurtColorLife--;
            }
        }
    },
    shoot:function (dt) {
        //this.shootEffect();
     /**   var offset = 13;
        var p = this.getPosition();
        var cs = this.getContentSize();
		*/
      // this.updateByLevel(3);
 /**  var a = Bullet.getOrCreateBullet(this.bulletSpeed, "W1.png", MW.ENEMY_ATTACK_MODE.NORMAL, 3000, MW.UNIT_TAG.PLAYER_BULLET);
        a.setPosition(p.x + offset, p.y + 3 + cs.height * 0.3);

        var b = Bullet.getOrCreateBullet(this.bulletSpeed, "W1.png", MW.ENEMY_ATTACK_MODE.NORMAL, 3000, MW.UNIT_TAG.PLAYER_BULLET);
        b.setPosition(p.x - offset, p.y + 3 + cs.height * 0.3);
		*/	
    },
	updateByLevel:function(level){
	 level  = level ? (level  >  this.frame.length-1  ? this.frame.length -1 : level):0 ;
	  this.setDisplayFrame(this.frame[level]);
	//this.setDisplayFrameWithAnimationName(this.animation,level);
	
	},
	
	addAerated:function(level){
	 switch  (level){
	  case 0:
	  case 1:
	  break;
	  case 3:
	   this.getPosition()
	  break;
	  case 4:
	  break;
	 
	 }
	},
    destroy:function () {
        MW.LIFE--;

        var explosion = Explosion.getOrCreateExplosion();
        explosion.setPosition(this.getPosition());

        if (MW.SOUND) {
            cc.AudioEngine.getInstance().playEffect(res.shipDestroyEffect_mp3);
        }
    },
  
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height / 2);
    },
    initBornSprite:function () {
        this.bornSprite = cc.Sprite.createWithSpriteFrameName("sc_40.png");
        this.bornSprite.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.bornSprite.setPosition(this.getContentSize().width / 2, 12);
        this.bornSprite.setVisible(false);
        this.addChild(this.bornSprite, 3000, 99999);
    }
   /** born:function () {
        //revive effect
     //   this.canBeAttack = false;
       // this.bornSprite.setScale(8);
        //this.bornSprite.runAction(cc.ScaleTo.create(0.5, 1, 1));
        this.bornSprite.setVisible(true);
        var blinks = cc.Blink.create(3, 9);
        var makeBeAttack = cc.CallFunc.create(function (t) {
            t.canBeAttack = true;
            t.setVisible(true);
            t.bornSprite.setVisible(false);
        }.bind(this));
        this.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), blinks, makeBeAttack));

      //  this.HP = 5;
        this._hurtColorLife = 0;
        this.active = true;
    }*/ 
});
