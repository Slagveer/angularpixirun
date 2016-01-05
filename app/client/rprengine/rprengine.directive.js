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
                //
            }
        }

        function RprEngineViewLink(scope, element, attrs, rprEngineViewController) {
            element[0].appendChild(rprEngineViewController.renderer.view);
        }

        RprEngineViewController.$inject = ['$rootScope', '$scope', '$window', 'RprEngineService', 'ResizeService', 'GameConstants', 'GameValues', 'SteveValues'];

        function RprEngineViewController($rootScope, $scope, $window, RprEngineService, ResizeService, GameConstants, GameValues, SteveValues) {
            var vm = this;

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
                //event.preventDefault();
                if (event.target.type !== 'button'){
                    if(!GameValues.INTERACTIVE) {
                        return;
                    }
                    if(GameValues.GAMEMODE === GameConstants.GAME_MODE.INTRO){
                        GameValues.INTERACTIVE = false;
                        GameValues.GAMEMODE =  GameConstants.GAME_MODE.TITLE;
                    }

                    vm.engine.tap(event);
                }
            }

            $scope.$on('countdownCompleted', function countdownCompleted() {
                GameValues.INTERACTIVE = true;
            });

            $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                RprEngineValues.LOW_MODE = data.result < 40;
            });

            $scope.$on('update', function updateEvent() {
                TWEEN.update();
                vm.count += 0.01;

                if(!GameValues.LOW_MODE) {
                    var ratio = (vm.zoom-1);
                    var position = -ResizeService.width/2;
                    var position2 = -SteveValues.STEVE.view.position.x;
                    var inter = position + (position2 - position) * ratio;

                    vm.container.position.x = inter * vm.zoom ;
                    vm.container.position.y = -SteveValues.STEVE.view.position.y * vm.zoom ;

                    vm.container.position.x += ResizeService.width/2;
                    vm.container.position.y += ResizeService.height/2;

                    RprEngineValues.XOFFSET = vm.container.position.x;

                    if(vm.container.position.y > 0) {
                        vm.container.position.y = 0;
                    }
                    var yMax = -ResizeService.height * this.zoom ;
                    yMax += ResizeService.height;

                    if(vm.container.position.y < yMax) {
                        vm.container.position.y = yMax;
                    }

                    vm.container.scale.x = vm.zoom ;
                    vm.container.scale.y = vm.zoom ;
                }
                vm.renderer.render(vm.stage);
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