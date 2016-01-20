if (typeof(GAME) === 'undefined') {
    this.GAME = {};
}

GAME.BackgroundElement = function(texture, y, owner)
{
    this.sprites = [];
    this.spriteWidth = texture.width-1;
    var amount = Math.ceil(940 / this.spriteWidth);
    if(amount < 3)amount = 3;

    for (var i=0; i < amount; i++)
    {
        var sprite = new PIXI.Sprite(texture);
        sprite.position.y = y;
        owner.addChild(sprite);
        this.sprites.push(sprite);
    };

    this.speed = 1;
}

GAME.BackgroundElement.prototype.constructor = GAME.BackgroundElement;

GAME.BackgroundElement.prototype.setPosition = function(position, game)
{
    var h = this.spriteWidth;

    for (var i=0; i < this.sprites.length; i++)
    {
        var pos = -position * this.speed;
        pos += i *  h ;
        pos %=  h * this.sprites.length ;
        pos +=  h * 2;

        this.sprites[i].position.x = Math.floor(pos) - game.XOFFSET;
    };
}
