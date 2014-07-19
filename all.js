
 var MW  = {} || MW;
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, 
        box2d:false,
        chipmunk:false,
        showFPS:true,
        loadExtension:false,
        frameRate:60,
        renderMode:0,       
        tag:'gameCanvas', 
        engineDir:'lib/',
        appFiles:[
            'src/resource.js',
            'src/GameStart.js',
			'src/layer/begin_layer.js',
			'src/layer/gamebg_layer.js',
			'src/Effect/flareEffect.js',
		 	'src/layer/score_Layer.js'
        ]
    };

    if(!d.createElement('canvas').getContext){
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s,d.getElementById(c.tag));

        d.body.style.background = '#ffffff';
        return;
    }

    var fn;
    window.addEventListener('DOMContentLoaded', fn = function () {
        this.removeEventListener('DOMContentLoaded', fn, false);
        var s = d.createElement('script');
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'game';
    });
})();
