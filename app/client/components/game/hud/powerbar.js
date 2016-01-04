/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.PowerBar = function(owner)
{
	PIXI.Container.call( this );
	this.barBG =  PIXI.Sprite.fromFrame("bulletTime_back.png");
	this.addChild(this.barBG);
	this.barBG.position.x = 20;
	this.barBG.position.y = 30;
	this.bar =  PIXI.Sprite.fromFrame("powerFillBar.png");
	this.addChild(this.bar);
	this.bar.position.x = 20;
	this.bar.position.y = 30;
	this.frame = PIXI.Sprite.fromFrame("bulletTime_BG.png");
	this.addChild(this.frame);
	this.position.x = 100;
}

GAME.PowerBar.constructor = GAME.PowerBar;
GAME.PowerBar.prototype = Object.create(PIXI.Container.prototype);
