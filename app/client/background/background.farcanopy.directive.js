/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundFarCanopy', BackgroundFarCanopy);

    BackgroundFarCanopy.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundFarCanopy($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: BackgroundFarCanopyLink,
            templateUrl: 'app/client/background/background.farcanopy.view.ng.html',
            restrict: 'EA',
            controller: BackgroundFarCanopyController,
            controllerAs: 'backgroundFarCanopyController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function BackgroundFarCanopyLink(scope, element, attrs, backgroundFarCanopyController) {
            //
        }

        BackgroundFarCanopyController.$inject = ['$scope', 'RprEngineService'];

        function BackgroundFarCanopyController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.farCanopy = new GAME.BackgroundElement(PIXI.Texture.fromFrame("02_front_canopy.png"), 0, vm.container);
                vm.farCanopy.speed =  1.5/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                vm.scrollPosition = data.scrollPosition;
                vm.farCanopy.setPosition(vm.scrollPosition);
            });
        }

        return directive;
    }
})();