/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundRearSilhouette', BackgroundRearSilhouette);

    BackgroundRearSilhouette.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundRearSilhouette($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: BackgroundRearSilhouetteLink,
            templateUrl: 'app/client/background/background.rearsilhouette.view.ng.html',
            restrict: 'EA',
            controller: BackgroundRearSilhouetteController,
            controllerAs: 'backgroundRearSilhouetteController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function BackgroundRearSilhouetteLink(scope, element, attrs, backgroundRearSilhouetteController) {
            //
        }

        BackgroundRearSilhouetteController.$inject = ['$scope', 'RprEngineService'];

        function BackgroundRearSilhouetteController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.rearSilhouette = new GAME.BackgroundElement(PIXI.Texture.fromFrame("03_rear_silhouette.png"), 358, vm.container);
                vm.rearSilhouette.speed =  1.2/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                vm.scrollPosition = data.scrollPosition;
                vm.rearSilhouette.setPosition(vm.scrollPosition);
            });
        }

        return directive;
    }
})();