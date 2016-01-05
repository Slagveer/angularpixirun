/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("background")
        .directive("backgroundView", BackgroundView);

    function BackgroundView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/background/background.view.ng.html',
            restrict: 'EA',
            controller: BackgroundViewController,
            controllerAs: 'backgroundViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, backgroundViewController) {
            //
        }

        BackgroundViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'BackgroundConstants', 'GameValues'];

        function BackgroundViewController($rootScope, $scope, $window, $state, RprEngineService,
                                          ResizeService, BackgroundConstants, GameValues) {
            var vm = this;

            vm.joyrideComplete = joyrideComplete;
            vm.engine = RprEngineService;
            vm.normalBackground = new GAME.Background(GameValues.CAMERA);
            vm.joyBackground = new GAME.JoyBackground(GameValues.CAMERA);
            if(GameValues.LOW_MODE) {
                vm.normalBackground = new GAME.LowFiBackground();
            } else {
                vm.normalBackground = new GAME.Background(GameValues.CAMERA);
            }
            vm.background = vm.normalBackground;
            vm.background.on('backgroundUpdated', function backgroundUpdated(data) {
                $scope.$broadcast('updateTransform', {
                    scrollPosition: data.scrollPosition
                });
            });
            vm.vines = BackgroundConstants.VINES;
            vm.container.addChild(vm.background);

            $scope.$on('update', function updateEvent() {

            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {
                vm.background.width = ResizeService.newWidth;
            }

            function joyrideComplete() {
                vm.container.removeChild(vm.background);
                vm.background = this.normalBackground;
                vm.container.addChildAt(vm.background, 0);
            }
        }

        return directive;
    }
})();