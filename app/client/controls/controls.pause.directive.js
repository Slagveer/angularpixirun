/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('controlsPauseButton', ControlsPauseButton);

    ControlsPauseButton.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function ControlsPauseButton($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: ControlsPauseButtonLink,
            templateUrl: 'app/client/controls/controls.pause.view.ng.html',
            restrict: 'EA',
            controller: ControlsPauseButtonController,
            controllerAs: 'controlsPauseButtonController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function ControlsPauseButtonLink(scope, element, attrs, controlsPauseButtonController) {
            //
        }

        ControlsPauseButtonController.$inject = ['$scope', 'RprEngineService'];

        function ControlsPauseButtonController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.pauseButton = new PIXI.Sprite.fromImage("pause.png");
                vm.pauseButton.interactive = true;
                vm.pauseButton.anchor.x = 0.5;
                vm.pauseButton.anchor.y = 0.5;
                vm.pauseButton.alpha = 0;
                vm.pauseButton.visible = false;
                vm.pauseButton.type = "button";
                vm.pauseButton.mousedown = vm.pauseButton.touchstart = function(event) {
                    event.stopPropagation();
                    vm.pauseButton.scale.set(0.5);
                    new TWEEN.Tween(vm.pauseButton.scale).to({
                            x : 1,
                            y : 1
                        }, 500)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .start();
                    $rootScope.$broadcast('pausePressed');
                }
                vm.container.addChild(vm.pauseButton);
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });

            $scope.$on('gameover', function updateEvent() {
                vm.pauseButton.interactive = false;
            });

            $scope.$on('countdownCompleted', function countdownCompleted() {
                vm.pauseButton.visible = true;
                new TWEEN.Tween(vm.pauseButton).to({
                        alpha: 1
                    }, 600)
                    .onComplete(function onCompleted(){
                        vm.pauseButton.interactive = true;
                    })
                    .start();
            });
        }

        return directive;
    }
})();