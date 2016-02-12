/**
 * @author Mat Groves
 */

if (typeof(GAME) === 'undefined') {
    this.GAME = {};
}

GAME.Lava = function(owner, textures, xoffset)
{
    var amount = 8;

	this.sprites = [];
	this.textures = [];
	this.gameXOffset = xoffset;
	for(var i=0;i<textures.length;i++) {
		this.textures.push(PIXI.Texture.fromFrame(textures[i]));
	}
	texture = this.textures[0];
	this.spriteWidth = texture.width - 1;
	if(amount < 3){
		amount = 3;
	}
	for(var i=0;i<amount;i++){
		var sprite = new PIXI.Sprite(texture);
		sprite.position.y = 580;
		owner.addChild(sprite);
		this.sprites.push(sprite);
	};
	this.speed = 1;
	this.offset = 0;
	this.count = 0;
}

GAME.Lava.prototype.setPosition = function(position, xoffset)
{
	var h = this.spriteWidth;
	var frame = ( this.count) % this.textures.length;
	frame = Math.floor(frame);
	
	this.offset += 2.5
	
	position += this.offset;
	
	this.count += 0.3;
	for (var i=0; i < this.sprites.length; i++) 
	{
		var pos = -position * this.speed;
		pos += i *  h ;
		pos %=  h * this.sprites.length ;
		pos +=  h * 2;
		
		this.sprites[i].texture = (this.textures[frame]);
		this.sprites[i].position.x = Math.floor(pos) + 800 - xoffset;
	};	
}