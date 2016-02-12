/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.LowFiBackground = function()
{
	PIXI.Container.call( this );
	this.width = 1000;
	this.scrollPosition = 1500;
	var SCALE = 1;// 0.5
	this.swoosh = new GAME.BackgroundElement(PIXI.Texture.fromImage("iP4_BGtile.jpg"), 0 , this);
	this.swoosh.speed = 0.7
}

// constructor
GAME.LowFiBackground.constructor = GAME.LowFiBackground;

GAME.LowFiBackground.prototype = Object.create( PIXI.Container.prototype );

GAME.LowFiBackground.prototype.updateTransform = function()
{
	this.scrollPosition = GAME.camera.x + 4000;// * GAME.time.DELTA_TIME;

	this.swoosh.setPosition(this.scrollPosition);
	PIXI.Container.prototype.updateTransform.call( this );
}


