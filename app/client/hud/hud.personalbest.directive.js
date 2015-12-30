/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudPersonalBestView', HudPersonalBestView);

    HudPersonalBestView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudPersonalBestView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudPersonalBestViewLink,
            templateUrl: 'app/client/hud/hud.personalbest.view.ng.html',
            restrict: 'EA',
            controller: HudPersonalBestViewController,
            controllerAs: 'hudPersonalBestViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudPersonalBestViewLink(scope, element, attrs, hudPersonalBestViewController) {
            //
        }

        HudPersonalBestViewController.$inject = ['$scope', 'RprEngineService'];

        function HudPersonalBestViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.personalBest = new PIXI.Sprite.fromImage("PersonalBest.png");
                vm.personalBest.anchor.x = 0.5;
                vm.personalBest.anchor.y = 0.5;
                vm.personalBest.alpha = 0;
                vm.personalBest.scale.x = 1.5;
                vm.personalBest.scale.y = 1.5;
                vm.container.addChild(vm.personalBest);
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();