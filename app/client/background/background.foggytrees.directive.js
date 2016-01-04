/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundFoggyTrees', BackgroundFoggyTrees);

    BackgroundFoggyTrees.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundFoggyTrees($window, RprEngineService, GameConstants, AssetsLoadService) {
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

        BackgroundFoggyTreesController.$inject = ['$scope', 'RprEngineService'];

        function BackgroundFoggyTreesController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.foggyTrees = new GAME.BackgroundElement(PIXI.Texture.fromFrame("05_far_BG.jpg"), 40, vm.container);
                vm.foggyTrees.speed = 1/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });
        }

        return directive;
    }
})();