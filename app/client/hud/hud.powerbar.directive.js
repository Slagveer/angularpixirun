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

        HudPowerBarViewController.$inject = ['$rootScope', '$scope', 'RprEngineService', 'ResizeService'];

        function HudPowerBarViewController($rootScope, $scope, RprEngineService, ResizeService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.powerBar = new GAME.PowerBar();
                vm.powerBar.alpha = 0;
                vm.container.addChild(vm.powerBar);
            });

            $scope.$on('update', function updateEvent() {
                vm.powerBar.bar.scale.x = ( (vm.engine.pickupCount/(50 *  vm.engine.bulletMult) )*(248/252) )
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.powerBar.position.x = ResizeService.newWidth - 295;
                vm.powerBar.position.y = 12;
            }
        }

        return directive;
    }
})();