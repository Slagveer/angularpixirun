/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('PickupManagerService', ['$q', '$rootScope', 'TimeService', 'GameValues',
            'GameConstants', 'PickupManagerConstants', 'SteveValues', 'RprEngineValues',
            function($q, $rootScope, TimeService, GameValues, GameConstants, PickupManagerConstants,
                     SteveValues, RprEngineValues) {
            var factory = {
                pickups: [],
                pickupPool: new GAME.GameObjectPool(GAME.Pickup),
                spawnCount: 0,
                pos: 0,
                send: function (msg, data) {
                    $rootScope.$broadcast(msg, data);
                },
                update: function () {
                    if(RprEngineValues.JOYRIDEMODE) {
                        this.spawnCount += TimeService.DELTA_TIME;

                        if(this.spawnCount > 5)
                        {
                            this.pos += 0.15;
                            this.spawnCount = 0;
                            this.addPickup(GameValues.CAMERA.x + GameValues.CAMERA.width, 280 + Math.sin(this.pos) * 180)
                        }
                    }
                    for(var i=0;i<this.pickups.length;i++) {
                        var pickup = this.pickups[i];

                        pickup.update();
                        if(pickup.isPickedUp) {
                            pickup.ratio += (1-pickup.ratio)*0.3 * TimeService.DELTA_TIME;
                            if(pickup.ratio > 0.99) {
                                this.pickupPool.returnObject(pickup);
                                this.pickups.splice(i, 1);
                                //this.engine.view.game.removeChild(pickup.view);
                                this.send('removePickup', pick.view);
                                i--;
                            }
                        } else {
                            if(pickup.view.position.x < -100-GAME.xOffset)
                            {
                                //this.engine.view.game.removeChild(pickup.view);
                                this.send('removePickup', pick.view);
                                this.pickupPool.returnObject(pickup);
                                this.pickups.splice(i, 1);
                                i--;
                            }
                        }
                    }
                },
                addPickup: function(x, y) {
                    var pickup = this.pickupPool.getObject();

                    pickup.position.x = x;
                    pickup.position.y = y;
                    this.pickups.push(pickup);
                    //this.engine.view.game.addChild(pickup.view);
                    this.send('addPickup', pick.view);
                },
                removePickup: function(index) {
                    var pickup = this.pickups[index];

                    pickup.isPickedUp = true;
                    pickup.steve = SteveValues.STEVE;
                    pickup.pickupPosition = {
                        x:pickup.position.x,
                        y:pickup.position.y
                    };
                    pickup.ratio = 0;
                },
                destroyAll: function() {
                    for (var i=0;i<this.pickups.length;i++) {
                        var pickup = this.pickups[i];

                        this.pickupPool.returnObject(pickup);
                        //this.engine.view.game.removeChild(pickup.view);
                    }
                    this.pickups = [];
                },
                destroyAllOffScreen: function() {
                    for (var i=0;i<this.pickups.length;i++) {
                        var pickup = this.pickups[i];

                        if(pickup.x > GAME.camera.x + GAME.width) {
                            this.pickupPool.returnObject(pickup);
                            //this.engine.view.game.removeChild(pickup.view);
                            this.pickups.splice(i, 1);
                            i--;
                        }
                    }
                }
            };
            return factory;
        }]);
})();