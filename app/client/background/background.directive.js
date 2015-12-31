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

        BackgroundViewController.$inject = ['$scope', '$window', '$state', 'RprEngineService'];

        function BackgroundViewController($scope, $window, $state, RprEngineService) {
            var vm = this;

            vm.engine = RprEngineService;
            vm.background = new GAME.Background();
            vm.container.addChild(vm.background);

            $scope.$on('update', function updateEvent() {
                //
            });
        }

        return directive;
    }
})();