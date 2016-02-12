/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('SegmentManagerService', ['$q', '$rootScope', 'TimeService', 'GameValues',
            'GameConstants', 'SegmentManagerConstants', 'RprEngineValues', 'FloorManagerService',
            'EnemyManagerService', 'PickupManagerService',
            function($q, $rootScope, TimeService, GameValues, GameConstants, SegmentManagerConstants,
                RprEngineValues, FloorManagerService, EnemyManagerService, PickupManagerService) {
            var factory = {
                sections: SegmentManagerConstants.DATA,
                count: 0,
                currentSegment: SegmentManagerConstants.DATA[0],
                startSegment: {
                    length:1135 * 2,
                    floor:[0,1135],
                    blocks:[],
                    coins:[]
                },
                chillMode: true,
                last: 0,
                position: 0,
                dontReset: false,
                send: function (msg, data) {
                    $rootScope.$broadcast(msg, data);
                },
                update: function () {
                    var relativePosition = 0;
                    var nextSegment = null;
                    var blocks = [];
                    var length = 0;
                    var pickups = null;

                    this.position = GameValues.CAMERA.x + 800 * 2;
                    relativePosition = this.position - this.currentSegment.start;
                    if(relativePosition > this.currentSegment.length) {
                        if(RprEngineValues.JOYRIDEMODE) {
                            nextSegment = this.startSegment;
                            nextSegment.start = this.currentSegment.start + this.currentSegment.length;
                            this.currentSegment = nextSegment;
                            for(var i=0;i<this.currentSegment.floor.length;i++) {
                                FloorManagerService.addFloor(this.currentSegment.start + this.currentSegment.floor[i]);
                            }

                            return;
                        }
                        nextSegment = this.sections[this.count % this.sections.length];
                        nextSegment.start = this.currentSegment.start + this.currentSegment.length;
                        this.currentSegment = nextSegment;
                        for(var i=0;i<this.currentSegment.floor.length;i++) {
                            FloorManagerService.addFloor(this.currentSegment.start + this.currentSegment.floor[i]);
                        }
                        blocks = this.currentSegment.blocks;
                        length = blocks.length/2;
                        for(var i=0;i<length;i++) {
                            EnemyManagerService.addEnemy(this.currentSegment.start + blocks[i*2], blocks[(i*2)+1]);
                        }
                        pickups = this.currentSegment.coins;
                        length = pickups.length/2;
                        for (var i=0;i<length;i++) {
                            PickupManagerService.addPickup(this.currentSegment.start + pickups[i*2], pickups[(i*2)+1]);
                        }
                        this.count ++;
                    }
                },
                reset: function () {
                    if(this.dontReset){
                        this.count = 0;
                    }
                    this.currentSegment = this.startSegment;
                    this.currentSegment.start = -200;
                    for (var i=0;i<this.currentSegment.floor.length;i++) {
                        FloorManagerService.addFloor( this.currentSegment.start + this.currentSegment.floor[i]);
                    }
                }
            }
            return factory;
        }]);
})();
