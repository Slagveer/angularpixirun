/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('FloorManagerService', ['$q', '$rootScope', 'TimeService', 'GameValues',
            'GameConstants', 'EnemyManagerConstants', 'RprEngineValues',
            function($q, $rootScope, TimeService, GameValues, GameConstants, EnemyManagerConstants, RprEngineValues) {
            var factory = {
                count: 0,
                floors: [],
                floorPool: new GAME.GameObjectPool(GAME.Floor),
                send: function (msg, data) {
                    $rootScope.$broadcast(msg, data);
                },
                update: function () {
                    for(var i=0;i<this.floors.length;i++) {
                        var floor = this.floors[i];

                        floor.position.x = floor.xPosition - GameValues.CAMERA.x - 16;
                        if(floor.position.x < (-1135 - RprEngineValues.XOFFSET - 16)) {
                            this.floorPool.returnObject(floor);
                            this.floors.splice(i, 1);
                            i--;
                            //RprEngineValues.GAMEFRONT.removeChild(floor);
                            this.send('removeFloor', floor);
                        }
                    }
                },
                addFloor: function(floorData) {
                    var floor = this.floorPool.getObject();

                    if(!_.has(floor,'xPosition')) {
                        _.extend(floor, {
                            xPosition: floorData
                        });
                    }
                    floor.position.y = 640 - 158;
                    //RprEngineValues.GAMEFRONT.addChild(floor);
                    this.send('addFloor', floor);
                    this.floors.push(floor);
                },
                destroyAll: function() {
                    for(var i=0;i<this.floors.length;i++) {
                        var floor = this.floors[i];

                        this.floorPool.returnObject(floor);
                        //RprEngineValues.GAMEFRONT.removeChild(floor);
                        this.send('removeFloor', floor);
                    }
                    this.floors = [];
                }
            };
            return factory;
        }]);
})();
