if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.Floor = function()
{
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame("00_forest_floor.png"));
}

GAME.Floor.constructor = PIXI.Floor;
GAME.Floor.prototype = Object.create( PIXI.Sprite.prototype );