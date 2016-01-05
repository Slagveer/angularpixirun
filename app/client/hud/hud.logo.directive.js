/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudLogoView', HudLogoView);

    HudLogoView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'GameValues', 'AssetsLoadService'];

    function HudLogoView($window, RprEngineService, GameConstants, GameValues, AssetsLoadService) {
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

        HudLogoViewController.$inject = ['$rootScope', '$scope', 'RprEngineService', 'ResizeService'];

        function HudLogoViewController($rootScope, $scope, RprEngineService, ResizeService) {
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

            $scope.$on('tapped', function updateEvent() {
                vm.logo.alpha = 0;
                vm.logo.scale.x = 1.5;
                vm.logo.scale.y = 1.5;
                vm.logo.texture = (PIXI.Texture.fromFrame("pixieRevised_controls.png"));

                new TWEEN.Tween(vm.logo).to({
                    alpha:1
                }, 100).start();

                new TWEEN.Tween(vm.logo.scale).to({
                        x: 1,
                        y: 1,
                    },1000)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function onCompleted(){
                        GameValues.INTERACTIVE = true;
                    }).start();

            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.logo.position.x = ResizeService.newWidth / 2;
                vm.logo.position.y = ResizeService.h/2 - 20;
            }
        }

        return directive;
    }
})();