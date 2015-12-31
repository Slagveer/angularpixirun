/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('controlsResumeButton', ControlsResumeButton);

    ControlsResumeButton.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function ControlsResumeButton($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: ControlsResumeButtonLink,
            templateUrl: 'app/client/controls/controls.resume.view.ng.html',
            restrict: 'EA',
            controller: ControlsResumeButtonController,
            controllerAs: 'controlsResumeButtonController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function ControlsResumeButtonLink(scope, element, attrs, controlsResumeButtonController) {
            //
        }

        ControlsResumeButtonController.$inject = ['$scope', 'RprEngineService'];

        function ControlsResumeButtonController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.resumeButton = new PIXI.Sprite.fromImage("ContinuePlay.png");
                vm.resumeButton.interactive = true;
                vm.resumeButton.anchor.x = 0.5;
                vm.resumeButton.anchor.y = 0.5;
                vm.resumeButton.alpha = 0;
                vm.resumeButton.type = "button";
                vm.resumeButton.mousedown = vm.resumeButton.touchstart = function(event) {
                    event.stopPropagation();
                    $rootScope.$broadcast('resumePressed');
                    $rootScope.$broadcast('pausePressed');
                }
                vm.container.addChild(vm.resumeButton);
            });

            $scope.$on('showResume', function showResumed() {
                vm.resumeButton.visible = true;
                new TWEEN.Tween(vm.resumeButton).to({
                        alpha: 1
                    }, 600)
                    .onComplete(function onCompleted(){
                        vm.resumeButton.interactive = true;
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