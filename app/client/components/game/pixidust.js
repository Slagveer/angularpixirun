if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.PixiDust = function()
{
	PIXI.Container.call(this);
	
	this.particals = [];
	this.particalPool = new GAME.GameObjectPool(ParticalDust);
	this.max = GAME.HIGH_MODE ? 100 : 10;
	this.count = 0;
	for (var i=0; i < this.max; i++) 
	{
		var partical = this.particalPool.getObject();
			
		partical.home.x = Math.random() * -GAME.width;
		partical.position.y = partical.home.y = Math.random() * 110640;
		partical.speed = new PIXI.Point((Math.random() -0.5)*0.2, (Math.random() -0.5) *0.4 );
		this.particals.push(partical);
		this.addChild(partical);
	};
	this.focalLength = 150;
}

// constructor
GAME.PixiDust.constructor = GAME.PixiDust;
GAME.PixiDust.prototype = Object.create( PIXI.Container.prototype );

GAME.PixiDust.prototype.update = function()
{
	for (var i=0; i < this.particals.length; i++) 
	{
		var partical =  this.particals[i];
		var scaleRatio = this.focalLength/(this.focalLength + partical.z);
		var scaleRatio = this.focalLength/(this.focalLength + partical.z);
		
		partical.scale.x = partical.scale.y = scaleRatio// * 0.5;
		partical.home.x += partical.speed.x;
		partical.position.y += partical.speed.y;
		partical.position.x = (partical.home.x - GAME.camera.x) *scaleRatio  * 1.5;
		
		partical.position.x %= GAME.width;
		if(partical.position.x < 0){
			partical.position.x += GAME.width;
		}
		partical.position.y %= 640;
		if(partical.position.y < 0){
			partical.position.y +=640;
		}
	};	
}
