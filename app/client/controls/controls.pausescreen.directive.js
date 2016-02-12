/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('controlsPauseScreen', ControlsPauseScreen);

    ControlsPauseScreen.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function ControlsPauseScreen($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: ControlsPauseScreenLink,
            templateUrl: 'app/client/controls/controls.pausescreen.view.ng.html',
            restrict: 'EA',
            controller: ControlsPauseScreenController,
            controllerAs: 'controlsPauseScreenController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function ControlsPauseScreenLink(scope, element, attrs, controlsPauseScreenController) {
            //
        }

        ControlsPauseScreenController.$inject = ['$rootScope', '$scope', 'RprEngineService', 'ResizeService'];

        function ControlsPauseScreenController($rootScope, $scope, RprEngineService, ResizeService) {
            var vm = this;

            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.pauseScreen = PIXI.Sprite.fromImage("pausedPanel.png");
                vm.pauseScreen.anchor.x = 0.5;
                vm.pauseScreen.anchor.y = 0.5;
                vm.pauseScreen.scale.x = 1.5;
                vm.pauseScreen.scale.y = 1.5;
                vm.pauseScreen.alpha = 0;
                vm.pauseScreen.visible = false;
                vm.container.addChild(vm.pauseScreen);
            });

            $scope.$on('pausePressed', function pausePressed() { console.log(3333)
                vm.pauseScreen.visible = true;
                new TWEEN.Tween(vm.pauseScreen).to({
                        alpha: 1
                    }, 600)
                    .onComplete(function onCompleted(){
                        vm.pauseScreen.interactive = true;
                    })
                    .start();

            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.pauseScreen.position.x = (ResizeService.newWidth * 0.5);
                vm.pauseScreen.position.y = ResizeService.h * 0.5;
            }

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();
