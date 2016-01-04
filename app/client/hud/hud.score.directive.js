/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudScoreView', HudScoreView);

    HudScoreView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudScoreView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudScoreViewLink,
            templateUrl: 'app/client/hud/hud.score.view.ng.html',
            restrict: 'EA',
            controller: HudScoreViewController,
            controllerAs: 'hudScoreViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudScoreViewLink(scope, element, attrs, hudScoreViewController) {
            //
        }

        HudScoreViewController.$inject = ['$scope', 'RprEngineService'];

        function HudScoreViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.score = new GAME.Score();
                vm.score.position.x = 300;
                vm.score.alpha = 0;
                vm.container.addChild(vm.score);
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();