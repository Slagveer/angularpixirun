/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('controlsRestartButton', ControlsRestartButton);

    ControlsRestartButton.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function ControlsRestartButton($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: ControlsRestartButtonLink,
            templateUrl: 'app/client/controls/controls.restart.view.ng.html',
            restrict: 'EA',
            controller: ControlsRestartButtonController,
            controllerAs: 'controlsRestartButtonController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function ControlsRestartButtonLink(scope, element, attrs, controlsRestartButtonController) {
            //
        }

        ControlsRestartButtonController.$inject = ['$scope', 'RprEngineService'];

        function ControlsRestartButtonController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.restartButton = new PIXI.Sprite.fromImage("RestartPlay.png");
                vm.restartButton.interactive = true;
                vm.restartButton.anchor.x = 0.5;
                vm.restartButton.anchor.y = 0.5;
                vm.restartButton.alpha = 0;
                vm.restartButton.type = "button";
                vm.restartButton.mousedown = vm.restartButton.touchstart = function(event) {
                    event.stopPropagation();
                    $rootScope.$broadcast('restartPressed');
                    $rootScope.$broadcast('pausePressed');
                }
                vm.container.addChild(vm.restartButton);
            });

            $scope.$on('showRestart', function showRestartd() {
                vm.restartButton.visible = true;
                new TWEEN.Tween(vm.restartButton).to({
                        alpha: 1
                    }, 600)
                    .onComplete(function onCompleted(){
                        vm.restartButton.interactive = true;
                    })
                    .start();

            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();