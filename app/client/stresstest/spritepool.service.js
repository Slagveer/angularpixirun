/**
 * Created by patricslagveer on 29/12/15.
 */
(function() {
    'use strict';
    angular
        .module('stresstest')
        .factory('SpritePool', ['$q', '$rootScope', function($q, $rootScope) {
            var _pool = [];
            var factory = {
                _isBirth: false,
                recycle : function recycle(sprite) {
                        _pool.push(sprite);
                    },
                get : function get(frameId) {
                        for (var i in _pool) {
                            if (_pool[i].texture === PIXI.TextureCache[frameId])
                                return _pool.splice(i, 1)[0];
                        }
                        return PIXI.Sprite.fromFrame(frameId);
                    }
            }
            return factory;
        }]);
})();