if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.Background = function(camera)
{
    this.camera = camera;
	PIXI.Container.call(this);
	this.width = 1000;
	this.scrollPosition = 1500;
}

// constructor
GAME.Background.constructor = GAME.Background;
GAME.Background.prototype = Object.create(PIXI.Container.prototype);
GAME.Background.prototype.updateTransform = function() {
	this.scrollPosition = this.camera.x + 4000;
	this.emit('backgroundUpdated', {
		scrollPosition: this.scrollPosition
	});
	PIXI.Container.prototype.updateTransform.call( this );
}