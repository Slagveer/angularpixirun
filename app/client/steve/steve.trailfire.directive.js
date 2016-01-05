/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("steve")
        .directive("steveTrailFireView", SteveTrailFireView);

    function SteveTrailFireView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/steve/steve.trailfire.view.ng.html',
            restrict: 'EA',
            controller: SteveTrailFireViewController,
            controllerAs: 'steveTrailFireViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, steveTrailFireViewController) {
            //
        }

        SteveTrailFireViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'SteveConstants', 'GameConstants', 'AssetsLoadService',
            'RprEngineValues', 'GameValues', 'TimeService', 'SteveValues'];

        function SteveTrailFireViewController($rootScope, $scope, $window, $state, RprEngineService,
                                    ResizeService, SteveConstants, GameConstants, AssetsLoadService,
                                     RprEngineValues, GameValues, TimeService, SteveValues) {
            var vm = this;

            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.trailFire = new GAME.SteveTrailFire(vm.container);
            });

            $scope.$on('update', function updateEvent() {
                vm.trailFire.target = SteveValues.STEVE;
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {

            }
        }

        return directive;
    }
})();