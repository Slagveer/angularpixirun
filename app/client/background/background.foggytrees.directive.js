/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundFoggyTrees', BackgroundFoggyTrees);

    BackgroundFoggyTrees.$inject = ['$window', 'RprEngineValues', 'GameConstants', 'RprEngineValues', 'AssetsLoadService'];

    function BackgroundFoggyTrees($window, RprEngineValues, GameConstants, RprEngineValues, AssetsLoadService) {
        var directive = {
            link: BackgroundFoggyTreesLink,
            templateUrl: 'app/client/background/background.foggytrees.view.ng.html',
            restrict: 'EA',
            controller: BackgroundFoggyTreesController,
            controllerAs: 'backgroundFoggyTreesController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function BackgroundFoggyTreesLink(scope, element, attrs, backgroundFoggyTreesController) {
            //
        }

        BackgroundFoggyTreesController.$inject = ['$scope', 'RprEngineValues'];

        function BackgroundFoggyTreesController($scope, RprEngineValues) {
            var vm = this;

            vm.engine = RprEngineValues;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.foggyTrees = new GAME.BackgroundElement(PIXI.Texture.fromFrame("05_far_BG.jpg"), 40, vm.container);
                vm.foggyTrees.speed = 1/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                vm.scrollPosition = data.scrollPosition;
                vm.foggyTrees.setPosition(vm.scrollPosition, RprEngineValues);
            });
        }

        return directive;
    }
})();
