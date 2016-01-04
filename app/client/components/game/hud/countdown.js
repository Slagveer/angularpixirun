/**
 * @author Mat Groves
 * v2 by Tom Slezakowski
 */

if (typeof(GAME) === 'undefined') {
    this.GAME = {};
}

GAME.Countdown = function()
{
	PIXI.Container.call(this);
	this.three = PIXI.Sprite.fromFrame("3Get.png");
	this.two = PIXI.Sprite.fromFrame("2tricksy.png");
	this.one = PIXI.Sprite.fromFrame("1pixie.png");

	this.three.anchor.x = this.three.anchor.y = 0.5;
	this.two.anchor.x = this.two.anchor.y = 0.5;
	this.one.anchor.x = this.one.anchor.y = 0.5;
	
	this.three.alpha = 0;
	this.two.alpha = 0;
	this.one.alpha = 0;
	
	this.addChild(this.three);
	this.addChild(this.two);
	this.addChild(this.one);
	
	this.three.alpha = 0;
	this.two.alpha = 0;
	this.one.alpha = 0;

    this.time = 100;
    this.time2 = 500;
    this.delay = 0;
}

GAME.Countdown.constructor = GAME.Countdown;
GAME.Countdown.prototype = Object.create(PIXI.Container.prototype);

GAME.Countdown.prototype.startCountDown = function(onComplete)
{
	this.visible = true;
	this.onComplete = onComplete;
	
	this.three.alpha = 0;
	this.two.alpha = 0;
	this.one.alpha = 0;
	
	this.three.scale.x = this.three.scale.y = 2;
	this.two.scale.x = this.two.scale.y = 2;
	this.one.scale.x = this.one.scale.y = 2;
	
    var that = this; 
    
	new TWEEN.Tween(this.three).to({
        alpha : 1
        }, 1 * this.time2)
        .onComplete(function() {
            this.onThreeShown();
        }.bind(this))
        .start();
    
	new TWEEN.Tween(this.three.scale).to({
            x : 1,
            y : 1,
        }, 1 * this.time2)
        .easing(TWEEN.Easing.Elastic.Out)
        .start();
}

GAME.Countdown.prototype.onThreeShown = function()
{
    var that = this;
    
	new TWEEN.Tween(that.three).to({
            alpha : 0
        }, 1 * this.time)
            .delay(this.delay)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .start();
    
	new TWEEN.Tween(that.three.scale).to({
            x : 0.5,
            y : 0.5
        }, 1 * this.time)
        .delay(this.delay)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
	
	new TWEEN.Tween(that.two).to({
        alpha : 1
        }, 1 * this.time2)
        .onComplete(function()
        {
            new TWEEN.Tween(that.two).to({
                    alpha : 0
                }, 1 * this.time)
                .delay(this.delay)
                .start();

            new TWEEN.Tween(that.two.scale).to({
                    x : 0.5,
                    y : 0.5
                }, 1 * this.time)
                .delay(this.delay)
                .easing(TWEEN.Easing.Cubic.Out)
                .start();

            new TWEEN.Tween(that.one).to({
                    alpha : 1
                }, 1 * this.time)
                .delay(this.delay)
                .onComplete(function() {
                        new TWEEN.Tween(that.one.scale).to({
                                x : 0.5,
                                y : 0.5
                            }, 1 * this.time2)
                            .delay(this.delay)
                            .easing(TWEEN.Easing.Cubic.Out)
                            .start();

                        new TWEEN.Tween(that.one).to({
                                alpha : 0
                                }, 1 * this.time)
                                .delay(this.delay)
                                .onComplete(function(){
                                    that.visible = false;
                                    that.onComplete();
                                }.bind(this))
                                .start();
                    }.bind(this))
                .start();

            new TWEEN.Tween(that.one.scale).to({
                    x : 1,
                    y : 1
                }, 1 * this.time2)
                .delay(this.delay)
                .easing(TWEEN.Easing.Elastic.Out)
                .start();
        }.bind(this))
        .delay(this.delay)
        .start();
    
	new TWEEN.Tween(this.two.scale).to({
        x : 1, 
        y : 1
    }, 1 * this.time2)
    .delay(this.delay)
    .easing(TWEEN.Easing.Elastic.Out)
    .start();
}