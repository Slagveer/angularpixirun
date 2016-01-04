/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.JoyBackground = function(camera)
{
	this.camera = camera;
	PIXI.Container.call( this );
	this.width = 1000;
	this.scrollPosition = 1500;
	var SCALE =1;
	this.swoosh = new GAME.BackgroundElement(PIXI.Texture.fromImage("stretched_hyper_tile.jpg"), 0 , this);
	this.swoosh.speed = 0.7
	this.scale.y = 1.7;
	this.scale.x = 4;
}

// constructor
GAME.JoyBackground.constructor = GAME.LowFiBackground;

GAME.JoyBackground.prototype = Object.create( PIXI.Container.prototype );

GAME.JoyBackground.prototype.updateTransform = function()
{
	this.scrollPosition = this.camera.x + 4000;

	this.swoosh.setPosition(this.scrollPosition);
	PIXI.Container.prototype.updateTransform.call( this );
}


