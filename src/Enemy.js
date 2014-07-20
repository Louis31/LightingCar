
var EnemyCache=EnemyCache || [];
var Enemy = cc.Sprite.extend({
    index:0,
	speed:10,
	 active:true,
	 pointX:0,
	 dalyTime:1/6, 
	 zOrder:MW.SPRITORDER,
	setDate:function(arg){
	var index =arg.index||0;
	var pointYIndex = arg.pointYIndex||0;
		index =  typeof  index === "number" ?(index>= EnemyType.length ? EnemyType.length -1:index):0;
	     pointYIndex= pointYIndex > MW.COLOUMCOUNT?  MW.COLOUMCOUNT:pointYIndex;
		this.index = index;    
		this.initWithSpriteFrameName(EnemyType[index]);
		this.setScale(MW.SPRITESCAlE);
		var	winSize = winSize ||cc.Director.getInstance().getWinSize();
		this.pointX =  MW.LEFT+ (winSize.width - MW.LEFT - MW.RIGHT)/ MW.COLOUMCOUNT *pointYIndex +MW.ENEMYWIDTH;
		this.dalyTime= arg.dalyTime ? arg.dalyTime : this.dalyTime;
		this.active = true;
		this.setVisible(true);
		this.setPosition(cc.p(this.pointX,winSize.height -MW.SPRITEHEIGHT));
		EnemyCache.push(this);
		this.schedule(this.downLoad, this.delayTime);
	},
	update:function(delayTime){
	},
	ctor:function (arg) {
	this._super();
	this.setDate(arg);
		
		
	},
 downLoad:function(delayTime){
 	var	winSize = winSize ||cc.Director.getInstance().getWinSize();
	var p = this.getPosition();
	p.y =  p.y - this.speed;
	this.setPosition(cc.p(p.x,p.y));	
	if( p.y <= 0 ){ 
	 this.destoy();
	}
  
 },
 
 destoy:function(){
             this.active = false;
			 this.setVisible(false);
			 this.stopAllActions();
			this.unschedule(this.downLoad);
			
 }
});

Enemy.create =function(arg){
  var emeny = null;
 if(EnemyCache &&EnemyCache.length >  0 ){
	for(var i  = 0  ,b =EnemyCache.length ; i < b ; i++  ){
	if(EnemyCache[i].ative ===true){
	emeny = EnemyCache[i];
	emeny.setDate(arg);
	return emeny;
	}
}
	emeny = new Enemy(arg);
	g_sharedGameLayer.addEnemy(emeny, emeny.zOrder,MW.UNIT_TAG.ENEMY);
	return emeny;

};


