/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('hudCountDownView', HudCountDownView);

    HudCountDownView.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function HudCountDownView($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: HudCountDownViewLink,
            templateUrl: 'app/client/hud/hud.countdown.view.ng.html',
            restrict: 'EA',
            controller: HudCountDownViewController,
            controllerAs: 'hudCountDownViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        }

        function HudCountDownViewLink(scope, element, attrs, hudCountDownViewController) {
            //
        }

        HudCountDownViewController.$inject = ['$scope', 'RprEngineService'];

        function HudCountDownViewController($scope, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.countdown = new GAME.Countdown();
                vm.countdown.position.x = 200;
                vm.countdown.position.y = 200;
                vm.container.addChild(vm.countdown);
                vm.countdown.startCountDown(function countdownCompleted(){
                    $scope.$emit('countdownCompleted');
                });
            });

            $scope.$on('update', function updateEvent() {
                //console.log(vm.container);
            });
        }

        return directive;
    }
})();