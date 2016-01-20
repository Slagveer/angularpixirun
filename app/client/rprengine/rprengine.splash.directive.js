/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("rprengine")
        .directive("rprengineSplashView", RprengineSplashView);

    function RprengineSplashView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/rprengine/rprengine.splash.view.ng.html',
            restrict: 'EA',
            controller: RprengineSplashViewController,
            controllerAs: 'rprengineSplashViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, RprengineSplashViewController) {
            //
        }

        RprengineSplashViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'BackgroundConstants', 'GameConstants', 'GameValues', 'AssetsLoadService'];

        function RprengineSplashViewController($rootScope, $scope, $window, $state, RprEngineService,
                                          ResizeService, BackgroundConstants, GameConstants, GameValues, AssetsLoadService) {
            var vm = this;

            vm.joyrideComplete = joyrideComplete;
            vm.engine = RprEngineService;

            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.splash = new GAME.Splash(GameValues.CAMERA);
                vm.container.addChild(vm.splash);
                vm.splash.position.y = 300;
                vm.splash.position.x = 300;
            });

            $scope.$on('update', function updateEvent() {

            });

            $scope.$on('dospash', function updateEvent() {
                vm.splash.splash(SteveValues.POSITION);
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {

            }

            function joyrideComplete() {

            }
        }

        return directive;
    }
})();
