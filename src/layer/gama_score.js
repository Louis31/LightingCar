//·ÖÊý±³¾°
var gameScore = cc.Layer.extend({
    scoreLable:null,
	socreText:null,
	
	size:null,
    init:function () {
   

   
        this.scoreLable = cc.LabelTTF.create("Socre", "Impact", 60);
		 this.socreText = cc.LabelTTF.create("0", "Impact", 24);
   
    
   
        this.addChild(this.scoreLable, 5);
		this.addChild(this.socreText, 5);

           this._super();
		
      
		
			
		
    },
	update:function(){
	
	onSettings:function(){
	
	}
});