if (typeof(GAME) === 'undefined') {
	this.GAME = {};
}

GAME.Math2 = {
	random: function (from, to) {
		return Math.random() * (to - from) + from;
	},
	map: function(val, inputMin, inputMax, outputMin, outputMax) {
		return ((outputMax - outputMin) * ((val - inputMin)/(inputMax - inputMin))) + outputMin;
	},
	randomPlusMinus: function(chance) {
		chance = chance ? chance : 0.5;
		return (Math.random() > chance) ? -1 : 1;
	},
	randomInt: function(from, to) {
		to += 1;
		return Math.floor(Math.random()*(to-from) + from);
	}
}

/**
 * Provides bind in a cross browser way.
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = (function () {
    var slice = Array.prototype.slice;
    return function (thisArg) {
      var target = this, boundArgs = slice.call(arguments, 1);
 
      if (typeof target != 'function') throw new TypeError();
 
      function bound() {
	var args = boundArgs.concat(slice.call(arguments));
	target.apply(this instanceof bound ? this : thisArg, args);
      }
 
      bound.prototype = (function F(proto) {
          proto && (F.prototype = proto);
          if (!(this instanceof F)) return new F;          
	})(target.prototype);
 
      return bound;
    };
  })();
}

