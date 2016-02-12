if (typeof(GAME) === 'undefined') {
    this.GAME = {};
}

GAME.Vines = function(owner, frame)
{
    this.vines = [];
    this.owner = owner;
    for (var i=0;i<10;i++)
    {
        var vine = new PIXI.Sprite.fromFrame(frame);
        vine.offset = i * 100 + Math.random() * 50;
        vine.speed = (1.5 + Math.random() * 0.25 )/2;
        vine.position.y = Math.random() * -200;
        this.owner.addChild(vine);
        vine.position.x = 200;
        this.vines.push(vine);
    };
    this.speed = 1;
}
GAME.Vines.prototype.constructor = GAME.Vines;
GAME.Vines.prototype.setPosition = function(position)
{
    for (var i=0;i<this.vines.length;i++) {
        var vine = this.vines[i];console.log(this.owner,vine.offset,vine.speed,this.owner.width)
        var pos = -(parseFloat(position) + vine.offset) * vine.speed;

        pos %=  this.owner._width;
        pos +=  this.owner._width;
        vine.position.x = pos;console.log(pos)
    };
}