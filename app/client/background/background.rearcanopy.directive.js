/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundRearCanopy', BackgroundRearCanopy);

    BackgroundRearCanopy.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundRearCanopy($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: BackgroundRearCanopyLink,
            templateUrl: 'app/client/background/background.rearcanopy.view.ng.html',
            restrict: 'EA',
            controller: BackgroundRearCanopyController,
            controllerAs: 'backgroundRearCanopyController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function BackgroundRearCanopyLink(scope, element, attrs, backgroundRearCanopyController) {
            //
        }

        BackgroundRearCanopyController.$inject = ['$scope', 'RprEngineService'];

        function BackgroundRearCanopyController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.rearCanopy = new GAME.BackgroundElement(PIXI.Texture.fromFrame("03_rear_canopy.png"), 0, vm.container);
                vm.rearCanopy.speed =  1.2/2;
            });

            $scope.$on('update', function updateEvent() {
                //
            });
        }

        return directive;
    }
})();