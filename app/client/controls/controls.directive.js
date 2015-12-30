/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("controls")
        .directive("controlsView", ControlsView);

    function ControlsView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/controls/controls.view.ng.html',
            restrict: 'EA',
            controller: ControlsViewController,
            controllerAs: 'controlsViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, controlsViewController) {
            //
        }

        ControlsViewController.$inject = ['$scope', '$window', '$state', 'RprEngineService'];

        function ControlsViewController($scope, $window, $state, RprEngineService) {
            var vm = this;

            vm.engine = RprEngineService;

            $scope.$on('update', function updateEvent() {
                //
            });
        }

        return directive;
    }
})();