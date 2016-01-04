/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudBestScoreView', HudBestScoreView);

    HudBestScoreView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudBestScoreView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudBestScoreViewLink,
            templateUrl: 'app/client/hud/hud.bestscore.view.ng.html',
            restrict: 'EA',
            controller: HudBestScoreViewController,
            controllerAs: 'hudBestScoreViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudBestScoreViewLink(scope, element, attrs, hudBestScoreViewController) {
            //
        }

        HudBestScoreViewController.$inject = ['$scope', 'RprEngineService'];

        function HudBestScoreViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.bestScore = new GAME.BestScore();
                vm.bestScore.alpha = 0;
                vm.container.addChild(vm.bestScore);
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();