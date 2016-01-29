/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('TimeService', ['$q', '$rootScope', function($q, $rootScope) {
            var factory = {
                DELTA_TIME: 1,
                lastTime: Date.now(),
                speed: 1,
                update: function update() {
                    var time = Date.now();
                    var currentTime = time;
                    var passedTime = currentTime - this.lastTime;

                    this.DELTA_TIME = ((passedTime) * 0.06);
                    this.DELTA_TIME *= this.speed;

                    if(this.DELTA_TIME > 2.3) {
                        this.DELTA_TIME = 2.3;
                    }
                    this.lastTime = currentTime;
                }
            };

            return factory;
        }]);
})();
