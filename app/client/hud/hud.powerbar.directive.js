/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudPowerBarView', HudPowerBarView);

    HudPowerBarView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudPowerBarView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudPowerBarViewLink,
            templateUrl: 'app/client/hud/hud.powerbar.view.ng.html',
            restrict: 'EA',
            controller: HudPowerBarViewController,
            controllerAs: 'hudPowerBarViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudPowerBarViewLink(scope, element, attrs, hudPowerBarViewController) {
            //
        }

        HudPowerBarViewController.$inject = ['$scope', 'RprEngineService'];

        function HudPowerBarViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.powerBar = new GAME.PowerBar();
                vm.powerBar.alpha = 0;
                vm.container.addChild(vm.powerBar);
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();