/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('EnemyManagerService', ['$q', '$rootScope', 'TimeService', 'GameValues',
            'GameConstants', 'EnemyManagerConstants', function($q, $rootScope, TimeService, GameValues,
                                                          GameConstants, EnemyManagerConstants) {
            var factory = {
                enemies: [],
                enemyPool: new GAME.GameObjectPool(GAME.Enemy),
                spawnCount: 0,
                send: function (msg, data) {
                    $rootScope.$broadcast(msg, data);
                },
                update: function () {
                    for(var i=0;i<this.enemies.length;i++) {
                        var enemy = this.enemies[i];
                        enemy.update();
                        if(enemy.view.position.x < -100 -GAME.xOffset && !this.engine.steve.isDead) {
                            this.enemyPool.returnObject(enemy);
                            this.enemies.splice(i, 1);
                            //this.engine.view.gameFront.removeChild(enemy.view);
                            this.send('removeEnemy', enemy);
                            i--;
                        }
                    }
                },
                addEnemy: function(x, y) {
                    var enemy = this.enemyPool.getObject();

                    enemy.position.x = x;
                    enemy.position.y = y;
                    this.enemies.push(enemy);
                    //this.engine.view.gameFront.addChild(enemy.view);
                    this.send('addEnemy', enemy);
                },
                destroyAll: function() {
                    for(var i = 0; i<this.enemies.length;i++) {
                        var enemy = this.enemies[i];

                        enemy.reset();
                        this.enemyPool.returnObject(enemy);
                        //this.engine.view.gameFront.removeChild(enemy.view);
                        this.send('removeEnemy', enemy);
                    }
                    this.enemies = [];
                },
                destroyAllOffScreen: function() {
                    for(var i=0;i<this.enemies.length;i++) {
                        var enemy = this.enemies[i];

                        if(enemy.x > GAME.camera.x + GAME.width)
                        {
                            this.enemyPool.returnObject(enemy);
                            //this.engine.view.game.removeChild(enemy.view);
                            this.send('removeEnemy', enemy);
                            this.enemies.splice(i, 1);
                            i--;
                        }
                    }
                }
            };
            return factory;
        }]);
})();