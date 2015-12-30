/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudBlackView', HudBlackView);

    HudBlackView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudBlackView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudBlackViewLink,
            templateUrl: 'app/client/hud/hud.black.view.ng.html',
            restrict: 'EA',
            controller: HudBlackViewController,
            controllerAs: 'hudBlackViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudBlackViewLink(scope, element, attrs, hudBlackViewController) {
            //
        }

        HudBlackViewController.$inject = ['$scope', 'RprEngineService'];

        function HudBlackViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.black = new PIXI.Sprite.fromImage("blackSquare.jpg");
                vm.container.addChild(vm.black);
                new TWEEN.Tween(vm.black)
                    .to({
                        alpha:0.75,
                        delay:0.5
                    }, 300)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .start();
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();