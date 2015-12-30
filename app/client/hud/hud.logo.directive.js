/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudLogoView', HudLogoView);

    HudLogoView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudLogoView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudLogoViewLink,
            templateUrl: 'app/client/hud/hud.logo.view.ng.html',
            restrict: 'EA',
            controller: HudLogoViewController,
            controllerAs: 'hudLogoViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudLogoViewLink(scope, element, attrs, hudLogoViewController) {
            //
        }

        HudLogoViewController.$inject = ['$scope', 'RprEngineService'];

        function HudLogoViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.logo = new PIXI.Sprite.fromImage("runLogo.png");
                vm.logo.anchor.x = 0.5;
                vm.logo.anchor.y = 0.5;
                vm.logo.alpha = 0;
                vm.container.addChild(vm.logo);
            });

            $scope.$on('update', function updateEvent() {
                //
            });
        }

        return directive;
    }
})();