var gamebglayer = cc.Layer.extend({
    isMouseDown:true,
    
	 hero:null,
	 
	 action:function(){
	   if (sys.capabilities.hasOwnProperty('keyboard'))
                this.setKeyboardEnabled(true);

            if (sys.capabilities.hasOwnProperty('mouse'))
            /*if ('mouse' in sys.capabilities)*/
                this.setMouseEnabled(true);

            if (sys.capabilities.hasOwnProperty('touches'))
            /*if ('touches' in sys.capabilities)*/
                this.setTouchEnabled(true);

	 }
    init:function () {

      
	    hero = cc.Sprite.create(res.sc_27);
		hero.setAnchorPoint(0.5, 0.5);
		hero.setPosition(size.width / 2, size.height / 2);
		
	  this.addChild(hero);
        this._super();

		
		this.action();
		  
            // schedule
            this.scheduleUpdate();
		
		return true;
     
    },
	update:function(){
	
	}
});