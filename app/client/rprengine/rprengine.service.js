/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('RprEngineService', ['$q', '$rootScope', 'TimeService', 'GameValues', 'GameConstants', 'PickupManagerService',
            'SteveValues', 'SegmentManagerService', 'FloorManagerService', 'CollisionManagerService',
            'EnemyManagerService', 'RprEngineValues',
            function($q, $rootScope, TimeService, GameValues, GameConstants,
                PickupManagerService, SteveValues, SegmentManagerService, FloorManagerService, CollisionManagerService,
                     EnemyManagerService, RprEngineValues) {
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
                        SteveValues.STEVE.update(TimeService, GameValues.CAMERA, this);
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
                    GameValues.isPlaying = true;
                    this.send('engineStarted', {});
                    this.isPlaying = true;
                    this.gameReallyOver = false;
                    this.score = 0;
                    this.bulletMult = 1;
                    SegmentManagerService.chillMode = false;
                },
                reset: function () {
                    this.send('engineResetted', {});
                    //this.view.zoom = 1;
                    this.pickupCount = 0;
                    this.levelCount = 0;
                },
                tap: function () {
                    this.send('tapped', {});
                },
                stoptap: function () {
                    this.send('tapstopped', {});
                },
                showgameover: function () {
                    this.send('showgameover');
                },
                boilsteve: function () {
                    this.send('boilsteve', {});
                },
                countdown: function () {
                    this.send('countdown', {});
                },
                dosplash: function() {
                    this.send('dosplash');
                },
                setnormalmode: function() {
                    this.send('normalmode');
                },
                setstevenormalmode: function() {
                    this.send('stevenormalmode');
                },
                joyrideComplete: function() {
                    RprEngineValues.JOYRIDEMODE = false;
                    RprEngineValues.PICKUPCOUNT = 0;
                    RprEngineValues.BULLETMULT += 0.3;
                    this.setnormalmode();
                    this.setstevenormalmode();
                },
                gameover: function() {
                    GameValues.isPlaying = false;
                    this.isPlaying = false;
                    this.isDying = true;
                    SegmentManagerService.chillMode = true;
                    GameValues.GAMEMODE = GameConstants.GAME_MODE.GAME_OVER;
                    //var nHighscore = this.LocalStorage.get('highscore');
                    //if(!nHighscore || this.score > nHighscore) {
                        //this.LocalStorage.store('highscore', this.score);
                        GameValues.NEWHIGHSCORE = true;
                    //}

                    //this.onGameover();
                    this.send('gameover');
                },
                pickup: function() {
                    if(SteveValues.STEVE.isDead) {
                        return;
                    }

                    this.score += 10;

                    if(RprEngineValues.JOYRIDEMODE)
                    {
                        //FidoAudio.stop('pickup');
                        //FidoAudio.play('pickup');
                        return;
                    }

                    this.send('scorejump');
                    this.pickupCount++;

                    //FidoAudio.stop('pickup');
                    //FidoAudio.play('pickup');

                    if(this.pickupCount >= 50 * this.bulletMult && !SteveValues.STEVE.isDead) {
                        this.pickupCount = 0;
                        this.joyrideMode = true;
                        RprEngineValues.JOYRIDEMODE = true;
                        this.joyrideCountdown = 60 * 10;
                        this.view.joyrideMode();
                        SteveValues.STEVE.joyrideMode();
                        SteveValues.STEVE.position.x = 0;
                        GameValues.CAMERA.x = SteveValues.STEVE.position.x - 100;
                        EnemyManagerService.destroyAll();
                        PickupManagerService.destroyAll();
                        FloorManagerService.destroyAll();
                        SegmentManagerService.reset();
                    }
                }
            }
            return factory;
        }]);
})();
