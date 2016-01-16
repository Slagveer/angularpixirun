/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudView', HudView);

    HudView.$inject = ['$window', 'RprEngineService'];

    function HudView($window, RprEngineService) {
        var directive = {
            link: HudViewLink,
            templateUrl: 'app/client/hud/hud.view.ng.html',
            restrict: 'EA',
            controller: HudViewController,
            controllerAs: 'hudViewController',
            bindToController: true,
            scope: {
                container: '=',
                gameController: '=',
                rprengineController: '='
            }
        }

        function HudViewLink(scope, element, attrs, hudViewController) {
            //
        }

        HudViewController.$inject = ['$scope', 'RprEngineService'];

        function HudViewController($scope, RprEngineService) {
            var vm = this;

            vm.engine = RprEngineService;console.log(vm.rprengineController)

            $scope.$on('update', function updateEvent() {
                //
            });
        }

        return directive;
    }
})();
