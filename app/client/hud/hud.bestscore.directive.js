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

        HudBestScoreViewController.$inject = ['$rootScope', '$scope', 'RprEngineService', 'ResizeService'];

        function HudBestScoreViewController($rootScope, $scope, RprEngineService, ResizeService) {
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

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.bestScore.position.x = ResizeService.newWidth - 20;
                vm.bestScore.position.y = 100;
            }
        }

        return directive;
    }
})();