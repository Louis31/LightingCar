

  
STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;
var g_sharedGameLayer;
var GameLayer = cc.LayerColor.extend({
    _time:null,
    _ship:null,
	_shipLevel:null,
    _backSky:null,
    _backSkyHeight:0,
    _backSkyRe:null,
    _levelManager:null,
    _tmpScore:0,
    _isBackSkyReload:false,
    _isBackTileReload:false,
    lbScore:null,
    screenRect:null,
    explosionAnimation:[],
    _beginPos:cc.p(0, 0),
    _state:STATE_PLAYING,
    _explosions:null,
    _texBatch:null,
    _spriteBatch:null,
	_lableLevel:0,
	cacheFrame:null,
	_emenyBatch:null,

    init:function () {
        var bRet = false;
        if (this._super()) {
			winSize = cc.Director.getInstance().getWinSize();
		
				/**背景颜色*/
			this.setColor(cc.c4b(192,192,192,255));
			EnemyCache = [];

            MW.CONTAINER.BACKSKYS = [];
            MW.CONTAINER.BACKTILEMAPS = [];
            MW.ACTIVE_ENEMIES = 0;

            MW.SCORE = 0;
            MW.LEVEL = 0;
            this._state = STATE_PLAYING;
            var texOpaque = cc.TextureCache.getInstance();
            this._texBatch = cc.SpriteBatchNode.createWithTexture(texOpaque);
            this._texBatch.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._texBatch);

            // _spriteBatch
            var texTransparent = cc.TextureCache.getInstance();
            this._spriteBatch = cc.SpriteBatchNode.createWithTexture(texTransparent);
            this.addChild(this._spriteBatch);

              var enTransparent = cc.TextureCache.getInstance();
			  
			  this._emenyBatch= cc.SpriteBatchNode.createWithTexture(enTransparent);
			 this.addChild(this._emenyBatch);
				 
            //this._levelManager = new LevelManager(this);

            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

            // score
            this.lbScore = cc.LabelBMFont.create("0", res.arial_14_fnt);
            this.lbScore.setAnchorPoint(1, 0);
            this.lbScore.setAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.lbScore.setPosition(winSize.width - 5, winSize.height - 30);
			this.addChild(this.lbScore, 1000);
			
			
            // car level
			this._shipLevel = new Ship();
			this._shipLevel.action =false;
            this._shipLevel.setScale(0.1);
            this._shipLevel.setPosition(30, 460);
            this._spriteBatch.addChild(this._shipLevel, 1, 5);
			
			
            // ship level 
            this._lableLevel = cc.LabelTTF.create("0", "Arial", 20);
            this._lableLevel.setPosition(60, 463);
            this._lableLevel.setColor(cc.c3b(255, 0, 0));
            //this._lableLevel(this._lbLife, 1000);
			this.addChild(this._lableLevel, 1000);
            this._ship = new Ship();
            this._spriteBatch.addChild(this._ship, this._ship.zOrder, MW.UNIT_TAG.PLAYER);
            if (sys.capabilities.hasOwnProperty('keyboard'))
                this.setKeyboardEnabled(true);

            if (sys.capabilities.hasOwnProperty('mouse'))
            /*if ('mouse' in sys.capabilities)*/
                this.setMouseEnabled(true);

            if (sys.capabilities.hasOwnProperty('touches'))
            /*if ('touches' in sys.capabilities)*/
                this.setTouchEnabled(true);

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().playMusic(res.bgMusic_mp3, true);
            }

            bRet = true;
            g_sharedGameLayer = this;
			this.scheduleUpdate();
			this.schedule(this.scoreCounter,1/100);
			this.schedule(this.updateEmeny,2);
        }
        return bRet;
    },

    scoreCounter:function () {

        if (this._state == STATE_PLAYING) {
           
			this._tmpScore +=10;
	
		if(this._tmpScore%1000===0 &&MW.LEVEL < LEVEL.LEVELMAX+1)
		{
			MW.LEVEL +=1;
			this._ship.updateByLevel(MW.LEVEL);
			this._shipLevel.updateByLevel(MW.LEVEL);
		}
        this._lableLevel.setString(MW.LEVEL + '');
        this.lbScore.setString("" + this._tmpScore);
        }
    },

    onTouchesMoved:function (touches, event) {
        this.processEvent(touches[0]);
    },

    onMouseDragged:function (event) {
        this.processEvent(event);
    },
//触控
    processEvent:function (event) {
        if (this._state == STATE_PLAYING) {
            var delta = event.getDelta();
            var curPos = this._ship.getPosition();
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.POINT_ZERO, cc.p(winSize.width, winSize.height));
            this._ship.setPosition(curPos);
        }
    },

    onKeyDown:function (e) {
        MW.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        MW.KEYS[e] = false;
    },
	updateEmeny:function(){
			for(var i =0 ; i < MW.COLOUMCOUNT ; i++){
			var emeny =  Enemy.create({pointYIndex:i,index:i});	
			}

	},

    update:function (dt) {

        if (this._state == STATE_PLAYING) {
       
            this.updateUI();
          
        }
    },
	
    checkIsCollide:function () {
	
		var locShip =  this._ship ;
        for (i = 0; i < EnemyCache.length; i++) {
            selChild = EnemyCache[i];
            if (!selChild.active)
                continue;

         
            if (this.collide(selChild, locShip)) {
                if (locShip.active) {
                   // selChild.hurt();
				   cc.log("挂了亲")
                    locShip.hurt();
                }
            }
        }


    },
    removeInactiveUnit:function (dt) {
        var selChild, children = this._texOpaqueBatch.getChildren();
        for (var i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

        children = this._texTransparentBatch.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }
    },
    checkIsReborn:function () {
        var locShip = this._ship;
        if (MW.LIFE > 0 && !locShip.active) {
            locShip.born();
        } else if (MW.LIFE <= 0 && !locShip.active) {
            this._state = STATE_GAMEOVER;
            // XXX: needed for JS bindings.
            this._ship = null;
            this.runAction(cc.Sequence.create(
                cc.DelayTime.create(0.2),
                cc.CallFunc.create(this.onGameOver, this)));
        }
    },
    updateUI:function () {
	
    
    },
    collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();
        if (Math.abs(pos1.x - pos2.x) > MAX_CONTAINT_WIDTH || Math.abs(pos1.y - pos2.y) > MAX_CONTAINT_HEIGHT)
            return false;

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    },
    initBackground:function () {
       // this._backSky = BackSky.getOrCreate();
       // this._backSkyHeight = this._backSky.getContentSize().height;

        this.moveTileMap();
        this.schedule(this.moveTileMap, 5);
    },
    moveTileMap:function () {
        var backTileMap = BackTileMap.getOrCreate();
        var ran = Math.random();
        backTileMap.setPosition(winSize.width/2, winSize.height);
        var move = cc.MoveBy.create(ran * 2 + 10, cc.p(0, -winSize.height-240));
        var fun =cc.CallFunc.create(function(){
            backTileMap.destroy();
        },this);
        backTileMap.runAction(cc.Sequence.create(move,fun));
    },

    _movingBackground:function(dt){
        var movingDist = 16 * dt;       // background's moving rate is 16 pixel per second

        var locSkyHeight = this._backSkyHeight, locBackSky = this._backSky;
        var currPosY = locBackSky.getPositionY() - movingDist;
        var locBackSkyRe = this._backSkyRe;

        if(locSkyHeight + currPosY <= winSize.height){
             if(locBackSkyRe != null)
                throw "The memory is leaking at moving background";
            locBackSkyRe = this._backSky;
            this._backSkyRe = this._backSky;

            //create a new background
            this._backSky = BackSky.getOrCreate();
            locBackSky = this._backSky;
            locBackSky.setPositionY(currPosY + locSkyHeight - 2);
        } else
            locBackSky.setPositionY(currPosY);

        if(locBackSkyRe){
            //locBackSkyRe
            currPosY = locBackSkyRe.getPositionY() - movingDist;
            if(currPosY + locSkyHeight < 0){
                locBackSkyRe.destroy();
                this._backSkyRe = null;
            } else
                locBackSkyRe.setPositionY(currPosY);
        }
    },

    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer, 1);
    return scene;
};

GameLayer.prototype.addEnemy = function (enemy, z,tag) {
    this._spriteBatch.addChild(enemy, z);
};

