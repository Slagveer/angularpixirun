/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("steve")
        .directive("stevePixiDustView", StevePixiDustView);

    function StevePixiDustView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/steve/steve.pixidust.view.ng.html',
            restrict: 'EA',
            controller: StevePixiDustViewController,
            controllerAs: 'stevePixiDustViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, stevePixiDustViewController) {
            //
        }

        StevePixiDustViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'SteveConstants', 'GameConstants', 'AssetsLoadService',
            'RprEngineValues', 'GameValues', 'TimeService'];

        function StevePixiDustViewController($rootScope, $scope, $window, $state, RprEngineService,
                                    ResizeService, SteveConstants, GameConstants, AssetsLoadService,
                                     RprEngineValues, GameValues, TimeService) {
            var vm = this;

            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.pixiDust = new GAME.PixiDust(GameValues.CAMERA);
                vm.container.addChild(vm.pixiDust);
            });

            $scope.$on('update', function updateEvent() {
                vm.pixiDust.update();
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {

            }
        }

        return directive;
    }
})();