/**
 * @author Mat Groves
 */
if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.Steve = function(runningFrames, flyingFrames, crashFrames) {
	this.position = new PIXI.Point();
	this.runningFrames = [];
	this.flyingFrames = [];
	this.crashFrames = [];

	for(var i=0;i<runningFrames.length;i++) {
		this.runningFrames.push(PIXI.Texture.fromFrame(runningFrames[i]));
	}
	for(var i=0;i<flyingFrames.length;i++) {
		this.flyingFrames.push(PIXI.Texture.fromFrame(flyingFrames[i]));
	}
	for(var i=0;i<crashFrames.length;i++) {
		this.crashFrames.push(PIXI.Texture.fromFrame(crashFrames[i]));
	}
	
	this.view = new PIXI.MovieClip(this.flyingFrames);
	this.view.animationSpeed = 0.23;
	
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
	
	this.position.y = 477;
	this.ground = 477;
	this.gravity = 0.3;
	
	this.baseSpeed = 8;
	this.speed = new PIXI.Point(this.baseSpeed, 0);
	
	this.activeCount = 0;
	this.isFlying = false;
	this.accel =0;
	
	this.width = 26
	this.height = 37;
	
	this.onGround = false;
	this.rotationSpeed = 0;
	this.joyRiding = false;
	this.level = 1;
	this.realAnimationSpeed = 0.23;
    
    this.volume = 0.3;

	this.time = null;
    this.camera = null;
}
GAME.Steve.constructor = GAME.Steve;
GAME.Steve.prototype.update = function(time, camera)
{
	this.time = time;
	this.camera = camera;

	if(this.isDead)
	{
		this.updateDieing();
	}
	else
	{
		this.updateRunning();
	}
}

GAME.Steve.prototype.joyrideMode = function()
{
	this.joyRiding = true;
    FidoAudio.setVolume('runRegular', 0);
    FidoAudio.play('hyperMode');
	TweenLite.to(this.speed, 0.3, {
        x : 20, 
        ease : Cubic.easeIn
    });
	this.realAnimationSpeed = 0.23 * 4
}

GAME.Steve.prototype.normalMode = function()
{
	this.joyRiding = false;
    FidoAudio.setVolume('runFast', 0);
    if(this.onGround === true) FidoAudio.setVolume('runRegular', this.volume);
	TweenLite.to(this.speed, 0.6, {
        x : this.baseSpeed, 
        ease : Cubic.easeOut
    });
	this.realAnimationSpeed = 0.23;
}

GAME.Steve.prototype.updateRunning = function()
{
	this.view.animationSpeed = this.realAnimationSpeed * this.time.DELTA_TIME * this.level;

	if(this.isActive)
	{
		this.isFlying = true;
	}
	
	var oldSpeed = this.speed.y;
    
	if(this.isFlying)
	{
		this.accel = 0.6;
		this.speed.y -= this.accel  * this.time.DELTA_TIME;
		if(this.speed.y > 0) this.speed.y -= 0.3 * this.time.DELTA_TIME;
	}
	else
	{
		if(this.speed.y < 0) this.speed.y += 0.05 * this.time.DELTA_TIME;
	}
	
	this.speed.y += this.gravity  * this.time.DELTA_TIME;
	
	if(this.speed.y > 8) this.speed.y = 8;
	if(this.speed.y < -9) this.speed.y = -9;

    var accel = this.speed.y - oldSpeed;
	this.position.x += this.speed.x * this.time.DELTA_TIME * this.level;
	this.position.y += this.speed.y * this.time.DELTA_TIME;
	
	if(this.onGround !== this.onGroundCache)
	{
		this.onGroundCache = this.onGround;
		
		if(this.onGround)
		{
			this.view.textures = this.runningFrames;
            if(this.joyRiding === true) 
            {
                FidoAudio.setVolume('runFast', this.volume);
                FidoAudio.setVolume('runRegular', 0);
            }
            else
            {
                FidoAudio.setVolume('runRegular', this.volume);  
                FidoAudio.setVolume('runFast', 0);
            }
		}
		else
		{
            //FidoAudio.setVolume('runFast', 0);
            //FidoAudio.setVolume('runRegular', 0);
			this.view.textures = this.flyingFrames;
		}
	}
	
	this.camera.x = this.position.x - 100;
	
	this.view.position.x = this.position.x - this.camera.x;
	this.view.position.y = this.position.y - this.camera.y;
	
	this.view.rotation += (this.speed.y * 0.05 - this.view.rotation) * 0.1;
}

GAME.Steve.prototype.updateDieing = function()
{
	this.speed.x *= 0.999;
	
	if(this.onGround) this.speed.y *= 0.99;
    
	this.speed.y += 0.1;
	this.accel += (0 - this.accel) * 0.1 * this.time.DELTA_TIME;
	
	this.speed.y += this.gravity  * this.time.DELTA_TIME;
	
	this.position.x += this.speed.x  * this.time.DELTA_TIME;
	this.position.y += this.speed.y  * this.time.DELTA_TIME;

	this.camera.x = this.position.x - 100;
	
	this.view.position.x = this.position.x - this.camera.x;
	this.view.position.y = this.position.y - this.camera.y;
	
	if(this.speed.x < 5)
	{
		this.view.rotation += this.rotationSpeed * (this.speed.x / 5) * this.time.DELTA_TIME;
	}
	else
	{
		this.view.rotation += this.rotationSpeed * this.time.DELTA_TIME;
	}
}

GAME.Steve.prototype.jump = function()
{
	if(this.isDead)
	{
		if(this.speed.x < 5)
		{
			this.isDead = false
			this.speed.x = 10;
		}
	}

	if(this.position.y !== this.ground)
	{
		this.isFlying = true;
	}
	else
	{
		this.isActive = true;
		this.activeCount = 0;
	}
}

GAME.Steve.prototype.die = function()
{
	if(this.isDead) return;
    
    FidoAudio.setVolume('runFast', 0);
    FidoAudio.setVolume('runRegular', 0);
    FidoAudio.fadeOut('gameMusic');

	TweenLite.to(this.time, 0.5, {
        speed : 0.1, 
        ease : Cubic.easeOut, 
        onComplete : function()
        {
            FidoAudio.play('deathJingle');
            TweenLite.to(this.time, 2, {
                speed : 1, 
                delay : 1
            });
        }
    });

	this.isDead = true;
	this.bounce = 0;
	this.speed.x = 15;
	this.speed.y = -15;
	this.rotationSpeed = 0.3;
	this.view.stop();
}


GAME.Steve.prototype.boil = function()
{
	if(this.isDead) return;
    
    FidoAudio.setVolume('runFast', 0);
    FidoAudio.setVolume('runRegular', 0);
    FidoAudio.fadeOut('gameMusic');
    FidoAudio.play('lavaSplosh');
    FidoAudio.play('deathJingle');
    
	this.isDead = true;
}

GAME.Steve.prototype.fall = function()
{
	this.isActive = false;
	this.isFlying = false;
}

GAME.Steve.prototype.isAirbourne = function(){}

GAME.Steve.prototype.stop = function()
{
    this.view.stop();
    FidoAudio.setVolume('runRegular', 0);
}

GAME.Steve.prototype.resume = function()
{
    this.view.play();
    if(this.onGround) FidoAudio.setVolume('runRegular', this.volume);
}