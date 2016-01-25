/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("steve")
        .directive("steveView", SteveView);

    function SteveView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/steve/steve.view.ng.html',
            restrict: 'EA',
            controller: SteveViewController,
            controllerAs: 'steveViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, steveViewController) {
            //
        }

        SteveViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'SteveConstants', 'GameConstants', 'AssetsLoadService',
            'RprEngineValues', 'GameValues', 'SteveValues', 'TimeService'];

        function SteveViewController($rootScope, $scope, $window, $state, RprEngineService,
                                    ResizeService, SteveConstants, GameConstants, AssetsLoadService,
                                     RprEngineValues, GameValues, SteveValues, TimeService) {
            var vm = this;
            var amount = SteveConstants.AMOUNT;
            var texture = null;

            vm.setPosition = setPosition;
            vm.joyrideComplete = joyrideComplete;
            vm.reset = reset;
            vm.engine = RprEngineService;
            vm.sprites = [];
            vm.speed = 1;
            vm.offset = 0;
            vm.count = 0;
            vm.runningFrames = [];
            vm.flyingFrames = [];
            vm.crashFrames = [];

            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.steve = new GAME.Steve(SteveConstants.RUNNINGFRAMES, SteveConstants.FLYINGFRAMES, SteveConstants.CRASHFRAMES);
                vm.steve.view.visible =  false;
                SteveValues.STEVE = vm.steve;
                vm.container.addChild(vm.steve.view);
            });

            $scope.$on('update', function updateEvent() {
                SteveValues.POSITION = vm.steve.position;
                if(GameValues.GAMEMODE !== GameConstants.GAME_MODE.PAUSED) {
                    RprEngineService.levelCount += TimeService.DELTA_TIME;
                    if(RprEngineService.levelCount > (60 * 60)) {
                        vm.steve.level += 0.05;
                    }
                }
                vm.steve.update(TimeService, GameValues.CAMERA, vm.engine);
            });

            $scope.$on('gameover', function onGameOver() {
                vm.container.addChild(vm.steve.view);
            });

            $scope.$on('boilsteve', function boilsteve() {
                vm.steve.boil();
            });

            $scope.$on('stevenormalmode', function stevenormalmode() {
                vm.steve.normalMode();
                vm.steve.position.x = 0;
            });

            $scope.$on('tapped', function onTapped() {
                if(GameValues.GAMEMODE === GameConstants.GAME_MODE.INTRO){

                }else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.TITLE) {

                }else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.GAME_OVER) {

                } else {
                    // handle our jump sound
                    // thrusters = true;
                    if(GameValues.isPlaying) {
                        vm.steve.jump();
                    }
                }
                //if(GameValues.GAMEMODE !== GameConstants.GAME_MODE.PAUSED) {
                //    vm.steve.normalMode();
                //}
                //else if(gameMode === GAME_MODE.GAME_OVER) {
                //    vm.steve.normalMode();
                //    vm.steve.position.x = 0;
                //    GameValues.camera.x = vm.steve.position.x - 100;
                //}
            });

            //$scope.$on('countdown', function engineStartedEvent() {
            //    vm.steve.normalMode();
            //    vm.steve.position.x = 0;
            //    GameValues.CAMERA.x = vm.steve.position.x - 100;
            //});

            $scope.$on('engineStarted', function engineStartedEvent() {
                vm.steve.level = 1;
                vm.steve.position.y = 477;
                vm.steve.speed.y = 0;
                vm.steve.speed.x = vm.steve.baseSpeed;
                vm.steve.view.rotation = 0;
                vm.steve.isFlying = false;
                vm.steve.isDead = false;
                vm.steve.view.play();
                vm.steve.view.visible = true;
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {

            }

            function setPosition(position) {
                var h = vm.spriteWidth;
                var frame = (vm.count) % vm.textures.length;

                frame = Math.floor(frame);
                vm.offset += 2.5;
                position += vm.offset;
                vm.count += 0.3;
                for (var i=0;i<vm.sprites.length;i++) {
                    var pos = -position * this.speed;
                    pos += i *  h ;
                    pos %=  h * vm.sprites.length ;
                    pos +=  h * 2;

                    vm.sprites[i].setTexture(vm.textures[frame]);
                    vm.sprites[i].position.x = Math.floor(pos) + 800 - RprEngineValues.XOFFSET;
                };
            }

            function joyrideComplete() {
                vm.steve.normalMode();
            }

            function reset() {
                vm.steve.level = 1;
                vm.container.addChild(vm.steve.view);
            }
        }

        return directive;
    }
})();
