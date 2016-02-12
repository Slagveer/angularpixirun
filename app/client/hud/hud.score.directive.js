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

        HudScoreViewController.$inject = ['$rootScope', '$scope', 'RprEngineService', 'ResizeService'];

        function HudScoreViewController($rootScope, $scope, RprEngineService, ResizeService) {
            var vm = this;

            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.score = new GAME.Score();
                vm.score.position.x = 300;
                vm.score.alpha = 0;
                vm.container.addChild(vm.score);
            });

            $scope.$on('scorejump', function updateEvent() {
                vm.score.jump();
            });

            $scope.$on('update', function updateEvent() {
                vm.score.setScore(Math.round(vm.engine.score));
            });

            $scope.$on('countdownCompleted', function countdownCompleted() {
                vm.score.alpha = 1;
                vm.score.position.x = ResizeService.width + 300;
                vm.score.position.y -= 14;
                new TWEEN.Tween(vm.score.position).to({
                        x: ResizeService.width - 295 - 20,
                    }, 1000)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.score.position.x = ResizeService.newWidth - 295 - 20;
                vm.score.position.y = 12;
            }
        }

        return directive;
    }
})();
