/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('CollisionManagerService', ['$q', '$rootScope', 'PickupManagerService', 'GameValues',
            'GameConstants', 'FloorManagerService', 'RprEngineValues', 'EnemyManagerService', 'SteveValues',
            function($q, $rootScope, PickupManagerService, GameValues, GameConstants, FloorManagerService,
                     RprEngineValues, EnemyManagerService, SteveValues) {
            var factory = {
                send: function (msg, data) {
                    $rootScope.$broadcast(msg, data);
                },
                update: function (engine) {
                    this.engine = engine;
                    this.playerVsBlock();
                    this.playerVsPickup();
                    this.playerVsFloor();
                },
                playerVsBlock: function() {
                    var enemies = EnemyManagerService.enemies;
                    var steve = SteveValues.STEVE;

                    for(var i=0;i<enemies.length;i++) {
                        var enemy = enemies[i];

                        var xdist = enemy.position.x - steve.position.x;
                        if(xdist > -enemy.width/2 && xdist < enemy.width/2) {
                            var ydist = enemy.position.y - steve.position.y;

                            if(ydist > -enemy.height/2 - 20 && ydist < enemy.height/2) {
                                if(!steve.joyRiding) {
                                    steve.die();
                                    this.engine.gameover();
                                    enemy.hit();
                                }
                            }
                        }
                    }
                },
                playerVsPickup: function() {
                    var pickups = PickupManagerService.pickups;
                    var steve = SteveValues.STEVE;

                    for(var i=0;i<pickups.length;i++) {
                        var pickup = pickups[i];
                        var xdist = pickup.position.x - steve.position.x;
                        var ydist = 0;

                        if(pickup.isPickedUp) {
                            continue;
                        }

                        if(xdist > -pickup.width/2 && xdist < pickup.width/2) {
                            ydist = pickup.position.y - steve.position.y;
                            if(ydist > -pickup.height/2 && ydist < pickup.height/2) {
                                PickupManagerService.removePickup(i);
                                this.engine.pickup();
                            }
                        }
                    }
                },
                playerVsFloor: function() {
                    var floors = FloorManagerService.floors;
                    var steve = SteveValues.STEVE;
                    var max = floors.length;

                    steve.onGround = false;
                    if(steve.position.y > 610) {
                        if(this.engine.isPlaying) {
                            this.engine.boilsteve();
                            this.engine.dosplash();
                            this.engine.gameover();
                        } else {
                            steve.speed.x *= 0.95;
                            if(!GameValues.INTERACTIVE) {
                                this.engine.showgameover();
                                GameValues.INTERACTIVE = true;
                            }
                            if(steve.bounce === 0) {
                                steve.bounce++;
                                steve.boil();
                                this.engine.dosplash();
                            }

                            return;
                        }
                    }

                    for(var i=0;i<max;i++) {
                        var floor = floors[i];
                        var xdist = floor.xPosition - steve.position.x + 1135;

                        if(steve.position.y > 477) {
                            if(xdist > 0 && xdist < 1135) {
                                if(steve.isDead) {
                                    steve.bounce++;
                                    if(steve.bounce > 2) {
                                        return;
                                    }
                                    //FidoAudio.play('thudBounce');
                                    steve.view.texture = (steve.crashFrames[steve.bounce]);

                                    steve.speed.y *= -0.7;
                                    steve.speed.x *= 0.8;

                                    if(steve.rotationSpeed > 0) {
                                        steve.rotationSpeed = Math.random() * -0.3;
                                    } else if(steve.rotationSpeed === 0) {
                                        steve.rotationSpeed = Math.random() * 0.3;
                                    } else {
                                        steve.rotationSpeed = 0;
                                    }
                                } else {
                                    steve.speed.y = -0.3;
                                }

                                if(!steve.isFlying) {
                                    steve.position.y = 478;
                                    steve.onGround = true;
                                }
                            }
                        }
                    }

                    if(steve.position.y < 0) {
                        steve.position.y = 0;
                        steve.speed.y *= 0;
                    }
                }
            };
            return factory;
        }]);
})();
