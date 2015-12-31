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

        RprEngineViewController.$inject = ['$rootScope', '$scope', '$window', 'RprEngineService', 'ResizeService'];

        function RprEngineViewController($rootScope, $scope, $window, RprEngineService, ResizeService) {
            var vm = this;

            vm.engine = RprEngineService;
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

            RprEngineValues.HIGH_MODE = (vm.renderer instanceof PIXI.WebGLRenderer);

            if (RprEngineValues.LOW_MODE === true) {
                //vm.normalBackground = new GAME.LowFiBackground();
            } else {
                // vm.normalBackground = new GAME.Background(this.gameFront);
            }

            $scope.$on('countdownCompleted', function countdownCompleted() {
                //
            });

            $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                RprEngineValues.LOW_MODE = data.result < 40;
            });

            $scope.$on('update', function updateEvent() {
                TWEEN.update();
                vm.renderer.render(vm.stage);
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                var view = vm.renderer.view;

                data.window.scrollTo(0, 0);
                view.style.height = ResizeService.h * ResizeService.ratio +"px";
                view.style.width = ResizeService.width +"px";

                vm.renderer.resize(ResizeService.newWidth , ResizeService.h);
            }
        }

        return directive;
    }
})();