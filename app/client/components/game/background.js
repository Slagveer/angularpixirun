if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.camera = new PIXI.Point();
GAME.Background = function()
{
	PIXI.Container.call(this);
	this.width = 1000;
	this.scrollPosition = 1500;
}

// constructor
GAME.Background.constructor = GAME.Background;
GAME.Background.prototype = Object.create(PIXI.Container.prototype);
GAME.Background.prototype.updateTransform = function() {
	this.scrollPosition = GAME.camera.x + 4000// * GAME.time.DELTA_TIME;

	PIXI.Container.prototype.updateTransform.call( this );
}