/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('controlsSoundOffButton', ControlsSoundOffButton);

    ControlsSoundOffButton.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function ControlsSoundOffButton($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: ControlsSoundOffButtonLink,
            templateUrl: 'app/client/controls/controls.soundoff.view.ng.html',
            restrict: 'EA',
            controller: ControlsSoundOffButtonController,
            controllerAs: 'controlsSoundOffButtonController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function ControlsSoundOffButtonLink(scope, element, attrs, controlsSoundOffButtonController) {
            //
        }

        ControlsSoundOffButtonController.$inject = ['$scope', 'RprEngineService'];

        function ControlsSoundOffButtonController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.soundOffButton = new PIXI.Sprite.fromImage("soundOff.png");
                vm.soundOffButton.interactive = true;
                vm.soundOffButton.anchor.x = 0.5;
                vm.soundOffButton.anchor.y = 0.5;
                vm.soundOffButton.alpha = 0;
                vm.soundOffButton.type = "button";
                vm.soundOffButton.mousedown = vm.soundOffButton.touchstart = function(event) {
                    event.stopPropagation();
                    $rootScope.$broadcast('soundOffPressed');
                }
                vm.container.addChild(vm.soundOffButton);
            });

            $scope.$on('showSoundOff', function showSoundOff() {
                vm.soundOffButton.visible = true;
                new TWEEN.Tween(vm.soundOffButton).to({
                        alpha: 1
                    }, 600)
                    .onComplete(function onCompleted(){
                        vm.soundOffButton.interactive = true;
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