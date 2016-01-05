/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundRoofLeaves', BackgroundRoofLeaves);

    BackgroundRoofLeaves.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundRoofLeaves($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: BackgroundRoofLeavesLink,
            templateUrl: 'app/client/background/background.roofleaves.view.ng.html',
            restrict: 'EA',
            controller: BackgroundRoofLeavesController,
            controllerAs: 'backgroundRoofLeavesController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function BackgroundRoofLeavesLink(scope, element, attrs, backgroundRoofLeavesController) {
            //
        }

        BackgroundRoofLeavesController.$inject = ['$scope', 'RprEngineService'];

        function BackgroundRoofLeavesController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.roofLeaves = new GAME.BackgroundElement(PIXI.Texture.fromFrame("00_roof_leaves.png"), 0, vm.container);
                vm.roofLeaves.speed =  2/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                vm.scrollPosition = data.scrollPosition;
                vm.roofLeaves.setPosition(vm.scrollPosition);
            });
        }

        return directive;
    }
})();