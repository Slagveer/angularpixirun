if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

ParticalDust = function()
{
	ParticalDust.globalCount++;

	PIXI.Sprite.call(this, PIXI.Texture.fromFrame(ParticalDust.frames[ParticalDust.globalCount % 3]));

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.z = Math.random() * 500;
	this.rotation = Math.random() * Math.PI * 2;
//	this.rotationSpeed =(Math.random()-0.5) * 0.1;
	//this.scale.x = this.scale.y = this.z * 0.2 ;
	this.home = new PIXI.Point();

	this.alpha = 0.5;
}

ParticalDust.globalCount = 0;
ParticalDust.frames = ["mote01.png", "mote02.png", "mote03.png"];

ParticalDust.constructor = Partical;
ParticalDust.prototype = Object.create( PIXI.Sprite.prototype );


