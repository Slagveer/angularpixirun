/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('rprengine')
        .directive('rprEngineView', RprEngineView);

    RprEngineView.$inject = ['$window', 'RprEngineService', 'RprEngineValues'];

    function RprEngineView($window, RprEngineService, RprEngineValues) {
        var directive = {
            link: RprEngineViewLink,
            templateUrl: 'app/client/rprengine/rprengine.view.ng.html',
            restrict: 'EA',
            controller: RprEngineViewController,
            controllerAs: 'rprEngineViewController',
            bindToController: true,
            scope: {
                gameController: '='
            }
        }

        function RprEngineViewLink(scope, element, attrs, rprEngineViewController) {
            element[0].appendChild(rprEngineViewController.renderer.view);
        }

        RprEngineViewController.$inject = ['$rootScope', '$scope', '$window', 'RprEngineService', 'ResizeService', 'GameConstants', 'GameValues', 'SteveValues'];

        function RprEngineViewController($rootScope, $scope, $window, RprEngineService, ResizeService, GameConstants, GameValues, SteveValues) {
            var vm = this; console.log(vm.gameController);

            vm.joyrideComplete = joyrideComplete;
            vm.engine = RprEngineService;
            vm.count = 0;
            vm.zoom = 1;
            vm.renderer = PIXI.autoDetectRenderer($window.innerWidth, $window.innerHeight);
            vm.renderer.view.style.position = "absolute";
            vm.renderer.view.webkitImageSmoothingEnabled = false;
            vm.stage = new PIXI.Stage();

            vm.container = new PIXI.Container();
            vm.container.hitArea = vm.stage.hitArea;
            vm.container.interactive = true;

            vm.hud = new PIXI.Container();
            vm.game = new PIXI.Container();
            vm.gameFront = new PIXI.Container();

            vm.container.addChild(vm.game);
            vm.container.addChild(vm.gameFront);

            vm.stage.addChild(vm.container);
            vm.stage.addChild(vm.hud);

            vm.white = PIXI.Sprite.fromImage("whiteSquare.jpg");

            RprEngineValues.XOFFSET = vm.container.position.x;
            RprEngineValues.HIGH_MODE = (vm.renderer instanceof PIXI.WebGLRenderer);

            vm.container.mousedown = vm.container.touchstart = function(event) {
                event.stopPropagation();

                if (event.target.type !== 'button'){
                    if(!GameValues.INTERACTIVE) {
                        return;
                    }
                    vm.engine.tap(event);
                    if(GameValues.GAMEMODE === GameConstants.GAME_MODE.INTRO){
                        GameValues.INTERACTIVE = false;
                        GameValues.GAMEMODE = GameConstants.GAME_MODE.TITLE;
                    } else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.TITLE) {
                        GameValues.INTERACTIVE = false;
                        RprEngineService.start();
                        GameValues.GAMEMODE = GameConstants.GAME_MODE.COUNT_DOWN;
                    }
                }
            }

            vm.container.mouseup = vm.container.touchend = function(event) {
                event.stopPropagation();


            };

            $scope.$on('tapped', function onTapped() {
                if(GameValues.GAMEMODE === GameConstants.GAME_MODE.INTRO){

                }else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.TITLE) {

                }else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.GAME_OVER) {

                } else {

                }
            });

            $scope.$on('countdownCompleted', function countdownCompleted() {
                //
            });

            $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                RprEngineValues.LOW_MODE = data.result < 40;
            });

            $scope.$on('update', function updateEvent() {
                TWEEN.update();
                vm.count += 0.01;

                if(!GameValues.LOW_MODE) {
                    var ratio = vm.zoom - 1;
                    var position = -ResizeService.width/2;
                    var position2 = -SteveValues.STEVE.view.position.x;
                    var inter = position + (position2 - position) * ratio;

                    vm.container.position.x = inter * vm.zoom ;
                    vm.container.position.y = -SteveValues.STEVE.view.position.y * vm.zoom;

                    vm.container.position.x += ResizeService.width/2;
                    vm.container.position.y += ResizeService.height/2;

                    RprEngineValues.XOFFSET = vm.container.position.x;

                    if(vm.container.position.y > 0) {
                        vm.container.position.y = 0;
                    }
                    var yMax = -ResizeService.height * vm.zoom;
                    yMax += ResizeService.height;

                    if(vm.container.position.y < yMax) {
                        vm.container.position.y = yMax;
                    }

                    vm.container.scale.x = vm.zoom;
                    vm.container.scale.y = vm.zoom;
                }
                vm.renderer.render(vm.stage);
                RprEngineValues.GAMEFRONT = vm.gameFront;
            });

            $scope.$on('addPickup', function addPickupEvent(event, pickup) {
                vm.game.addChild(pickup.view);
            });

            $scope.$on('removePickup', function removePickupEvent(event, pickup) {
                vm.game.removeChild(pickup.view);
            });

            $scope.$on('addFloor', function addFloorEvent(event, floor) {
                vm.gameFront.addChild(floor);
            });

            $scope.$on('removeFloor', function removeFloorEvent(floor) {
                vm.gameFront.removeChild(floor);
            });

            $scope.$on('addEnemy', function addEnemyEvent(enemy) {
                //vm.gameFront.addChild(enemy.view);
            });

            $scope.$on('removeEnemy', function removeEnemyEvent(enemy) {
                vm.gameFront.removeChild(enemy.view);
            });

            $scope.$on('gameover', function gameover() {

            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                var view = vm.renderer.view;

                data.window.scrollTo(0, 0);
                view.style.height = ResizeService.h * ResizeService.ratio +"px";
                view.style.width = ResizeService.width +"px";

                vm.renderer.resize(ResizeService.newWidth , ResizeService.h);

                vm.white.scale.x = ResizeService.newWidth/16;
                vm.white.scale.y = ResizeService.height/16;
            }

            function joyrideComplete() {
                vm.stage.addChild(vm.white)
                vm.white.alpha = 1;

                new TWEEN.Tween(vm.white).to({
                        alpha : 0,
                    }, 0.5)
                    .easing(TWEEN.Easing.Sine.Out)
                    .start();
            }
        }

        return directive;
    }
})();
