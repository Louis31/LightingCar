var beginLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,
	authorLabel:null,
	heroSprit:null,
	otherheroSprit:null,
	size:null,

    init:function () {
        this._super();
		
         size = cc.Director.getInstance().getWinSize();
MW.size = size;
       var newGameNormal = cc.Sprite.create(res.menu, cc.rect(0, 0, 126, 33));
         var newGameSelected = cc.Sprite.create(res.menu, cc.rect(0, 33, 126, 33));
         var newGameDisabled = cc.Sprite.create(res.menu, cc.rect(0, 33 * 2, 126, 33));
		 
		  var gameSettingsNormal = cc.Sprite.create(res.menu, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(res.menu, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(res.menu, cc.rect(126, 33 * 2, 126, 33));
			
			   var aboutNormal = cc.Sprite.create(res.menu, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(res.menu, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(res.menu, cc.rect(252, 33 * 2, 126, 33));	

			var flare = cc.Sprite.create(res.s_flare);
		this.addChild(flare);
		flare.setVisible(false);
        var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
            
                flareEffect(flare, this, this.onNewGame);
            }.bind(this));
		 var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
		   var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);
		    var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
        this.helloLabel = cc.LabelTTF.create("急速& 赛车", "Impact", 60);
		 this.authorLabel = cc.LabelTTF.create("author:3+1Studio", "Impact", 24);
   
        this.helloLabel.setPosition(size.width / 2, size.height -60);
		 this.authorLabel.setPosition(size.width -120, size.height -180);
   
        this.addChild(this.helloLabel, 5);
		this.addChild(this.authorLabel, 5);

      
		
        this.sprite = cc.Sprite.create(res.s_bg_start);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.sprite.setScale(size.height/this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);
		
		var pos = cc.p(Math.random() * size.width, 0);
		this.heroSprit = cc.Sprite.create(res.sc_10);
		    this.heroSprit.setAnchorPoint(0.5, 0.5);
			 this.heroSprit.setPosition( pos );
			  this.addChild(this.heroSprit, 0);
			  
			     this.heroSprit.runAction(cc.MoveBy.create(2, cc.p(Math.random() * size.width, pos.y + size.height )));
				 
				 this.schedule(this.update, 0.1);
			
		
    },
	update:function(){
	if (this.heroSprit.getPosition().y > size.width) {
            var pos = cc.p(Math.random() * size.width, 10);
            this.heroSprit.setPosition( pos );
            this.heroSprit.runAction( cc.MoveBy.create(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * size.width, pos.y + 480)));
        }
	},
	onNewGame:function(){
	  cc.LoaderScene.preload([], function () {
            var scene = cc.Scene.create();
			 scene.addChild(scorelayer.create());
            
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
	}
	,
	onSettings:function(){
	
	}
});