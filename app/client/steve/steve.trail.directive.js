/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("steve")
        .directive("steveTrailView", SteveTrailView);

    function SteveTrailView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/steve/steve.trail.view.ng.html',
            restrict: 'EA',
            controller: SteveTrailViewController,
            controllerAs: 'steveTrailViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, steveTrailViewController) {
            //
        }

        SteveTrailViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'SteveConstants', 'GameConstants', 'AssetsLoadService',
            'RprEngineValues', 'GameValues', 'TimeService', 'SteveValues'];

        function SteveTrailViewController($rootScope, $scope, $window, $state, RprEngineService,
                                    ResizeService, SteveConstants, GameConstants, AssetsLoadService,
                                     RprEngineValues, GameValues, TimeService, SteveValues) {
            var vm = this;

            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.trail = new GAME.SteveTrail(vm.container);
            });

            $scope.$on('update', function updateEvent() {
                vm.trail.target = SteveValues.STEVE;
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {

            }
        }

        return directive;
    }
})();