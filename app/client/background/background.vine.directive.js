/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundVine', BackgroundVine);

    BackgroundVine.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService'];

    function BackgroundVine($window, RprEngineService, GameConstants, AssetsLoadService) {
        var directive = {
            link: BackgroundVineLink,
            templateUrl: 'app/client/background/background.vine.view.ng.html',
            restrict: 'EA',
            controller: BackgroundVineController,
            controllerAs: 'backgroundVineController',
            bindToController: true,
            scope: {
                container: '=',
                image: '@',
                nr: '@'
            }
        }

        function BackgroundVineLink(scope, element, attrs, backgroundVineController) {
            //
        }

        BackgroundVineController.$inject = ['$scope', '$attrs', 'RprEngineService'];

        function BackgroundVineController($scope, $attrs, RprEngineService) {
            var vm = this;

            vm.setPosition = setPosition;
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.vine = PIXI.Sprite.fromFrame(vm.image);
                vm.vine.offset = parseInt(vm.nr) * 100 + Math.random() * 50;
                vm.vine.speed = (1.5 + Math.random() * 0.25 )/2;
                vm.vine.position.y = Math.random() * -200;
                vm.vine.position.x = 200;
                vm.container.addChild(vm.vine);
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                setPosition(data.scrollPosition);
            });

            function setPosition(position) {
                var pos = -(position + vm.vine.offset) * vm.vine.speed;
                pos %=  vm.container.width;
                pos +=  vm.container.width;
                vm.vine.position.x = pos;
            }
        }

        return directive;
    }
})();