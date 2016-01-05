/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundFrontSilhouette', BackgroundFrontSilhouette);

    BackgroundFrontSilhouette.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundFrontSilhouette($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: BackgroundFrontSilhouetteLink,
            templateUrl: 'app/client/background/background.frontsilhouette.view.ng.html',
            restrict: 'EA',
            controller: BackgroundFrontSilhouetteController,
            controllerAs: 'backgroundFrontSilhouetteController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function BackgroundFrontSilhouetteLink(scope, element, attrs, backgroundFrontSilhouetteController) {
            //
        }

        BackgroundFrontSilhouetteController.$inject = ['$scope', 'RprEngineService'];

        function BackgroundFrontSilhouetteController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.frontSilhouette = new GAME.BackgroundElement(PIXI.Texture.fromFrame("01_front_silhouette.png"), 424, vm.container);
                vm.frontSilhouette.speed =  1.2/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                vm.scrollPosition = data.scrollPosition;
                vm.frontSilhouette.setPosition(vm.scrollPosition);
            });
        }

        return directive;
    }
})();