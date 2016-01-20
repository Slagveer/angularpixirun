/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('RprEngineService', ['$q', '$rootScope', 'TimeService', 'GameValues', 'GameConstants', 'PickupManagerService',
            'SteveValues', 'SegmentManagerService', 'FloorManagerService', 'CollisionManagerService', 'EnemyManagerService',
            function($q, $rootScope, TimeService, GameValues, GameConstants,
                                    PickupManagerService, SteveValues, SegmentManagerService, FloorManagerService, CollisionManagerService, EnemyManagerService) {
            GameValues.CAMERA = new PIXI.Point();
            var factory = {
                bulletMult: 1,
                pickupCount: 0,
                score: 0,
                joyrideMode: false,
                joyrideCountdown: 0,
                isPlaying: false,
                levelCount: 0,
                gameReallyOver: false,
                isDying: false,
                send: function (msg, data) {
                    $rootScope.$broadcast(msg, data);
                },
                update: function() {
                    var targetCamY = 0;

                    this.send('update', {});
                    TimeService.update();
                    if (targetCamY > 0) {
                        targetCamY = 0;
                    }
                    if (targetCamY < -70) {
                        targetCamY = -70;
                    }
                    GameValues.CAMERA.y = targetCamY;

                    if (GameValues.GAMEMODE !== GameConstants.GAME_MODE.PAUSED) {
                        SteveValues.STEVE.update(TimeService,GameValues.CAMERA, this);
                        CollisionManagerService.update(this);
                        SegmentManagerService.update();
                        FloorManagerService.update();
                        EnemyManagerService.update();
                        PickupManagerService.update();

                        if (this.joyrideMode) {
                            this.joyrideCountdown -= TimeService.DELTA_TIME;

                            if (this.joyrideCountdown <= 0) {
                                this.joyrideComplete();
                            }
                        }

                        this.levelCount += TimeService.DELTA_TIME;

                        if (this.levelCount > (60 * 60)) {
                            this.levelCount = 0;
                            SteveValues.STEVE.level += 0.05;
                            TimeService.speed += 0.05;
                        }
                    } else {
                        if (this.joyrideMode) {
                            this.joyrideCountdown += TimeService.DELTA_TIME;
                        }
                    }
                },
                start: function () {
                    SegmentManagerService.reset();
                    EnemyManagerService.destroyAll();
                    PickupManagerService.destroyAll();
                    this.send('engineStarted', {});
                    this.isPlaying = true;
                    this.gameReallyOver = false;
                    this.score = 0;
                    this.bulletMult = 1;
                    SegmentManagerService.chillMode = false;
                },
                reset: function () {
                    this.send('engineResetted', {});
                    this.view.zoom = 1;
                    this.pickupCount = 0;
                    this.levelCount = 0;
                },
                tap: function () {
                    this.send('tapped', {});
                },
                boilsteve: function () {
                    this.send('boilsteve', {});
                },
                countdown: function () {
                    this.send('countdown', {});
                },
                joyrideComplete: function() {
                    this.joyrideMode = false;
                    this.pickupCount = 0;
                    this.bulletMult += 0.3;
                },
                dosplash: function() {
                    this.send('dosplash');
                },
                gameover: function() {
                    this.isPlaying = false;
                    this.isDying = true;
                    SegmentManagerService.chillMode = true;

                    //var nHighscore = this.LocalStorage.get('highscore');
                    //if(!nHighscore || this.score > nHighscore) {
                        //this.LocalStorage.store('highscore', this.score);
                        GameValues.NEWHIGHSCORE = true;
                    //}

                    //this.onGameover();
                    this.send('gameover');
                }
            }
            return factory;
        }]);
})();
