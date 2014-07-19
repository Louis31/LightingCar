
require("jsb.js");

var MW = MW || {};

var appFiles = [
    'src/Resource.js',
    'src/config/GameConfig.js',
    'src/config/EnemyType.js',
    'src/config/Level.js',
    'src/Effect.js',
    'src/Bullet.js',
    'src/Enemy.js',
    'src/Explosion.js',
    'src/Ship.js',
    'src/LevelManager.js',
    'src/GameController.js',
    'src/GameControlMenu.js',
    'src/GameLayer.js',
    'src/GameOver.js',
    'src/AboutLayer.js',
    'src/SettingsLayer.js',
    'src/SysMenu.js',
	'src/SparkEffect.js',
	'src/HitEffect.js',
    'src/Background.js'
];

cc.dumpConfig();

for( var i=0; i < appFiles.length; i++) {
    require( appFiles[i] );
}

var director = cc.Director.getInstance();
director.setDisplayStats(true);

// set FPS. the default value is 1.0/60 if you don't call this
director.setAnimationInterval(1.0 / 60);

// create a scene. it's an autorelease object
var mainScene = SysMenu.scene();

// run
director.runWithScene(mainScene);

