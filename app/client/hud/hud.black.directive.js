/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudBlackView', HudBlackView);

    HudBlackView.$inject = ['$window', 'RprEngineService', 'AssetsLoadService', 'GameConstants', 'GameValues'];

    function HudBlackView($window, RprEngineService, AssetsLoadService, GameConstants, GameValues) {
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

        HudBlackViewController.$inject = ['$rootScope', '$scope', 'RprEngineService', 'ResizeService'];

        function HudBlackViewController($rootScope, $scope, RprEngineService, ResizeService) {
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

            $scope.$on('tapped', function updateEvent() {
                if(GameValues.GAMEMODE === GameConstants.GAME_MODE.TITLE) {
                    if(vm.black) {
                        new TWEEN.Tween(vm.black)
                            .to({
                                alpha: 0
                            }, 200)
                            .start();
                    }
                }

            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.black.scale.x = ResizeService.newWidth/16;
                vm.black.scale.y = ResizeService.h/16;
            }
        }

        return directive;
    }
})();