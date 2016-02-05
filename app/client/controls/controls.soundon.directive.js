/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('controlsSoundOnButton', ControlsSoundOnButton);

    ControlsSoundOnButton.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function ControlsSoundOnButton($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: ControlsSoundOnButtonLink,
            templateUrl: 'app/client/controls/controls.soundon.view.ng.html',
            restrict: 'EA',
            controller: ControlsSoundOnButtonController,
            controllerAs: 'controlsSoundOnButtonController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function ControlsSoundOnButtonLink(scope, element, attrs, controlsSoundOnButtonController) {
            //
        }

        ControlsSoundOnButtonController.$inject = ['$scope', 'RprEngineService'];

        function ControlsSoundOnButtonController($scope, RprEngineService) {
            var vm = this;

            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.soundOnButton = new PIXI.Sprite.fromImage("soundOn.png");
                vm.soundOnButton.interactive = true;
                vm.soundOnButton.anchor.x = 0.5;
                vm.soundOnButton.anchor.y = 0.5;
                vm.soundOnButton.alpha = 0;
                vm.soundOnButton.type = "button";
                vm.soundOnButton.mousedown = vm.soundOnButton.touchstart = function(event) {
                    event.stopPropagation();
                    //$rootScope.$broadcast('soundOnPressed');
                    vm.engine.soundon();
                }
                vm.container.addChild(vm.soundOnButton);
            });

            $scope.$on('showSoundOn', function showSoundOn() {
                vm.soundOnButton.visible = true;
                new TWEEN.Tween(vm.soundOnButton).to({
                        alpha: 1
                    }, 600)
                    .onComplete(function onCompleted(){
                        vm.soundOnButton.interactive = true;
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
