/**
 * Created by patricslagveer on 23/12/15.
 */
(function() {
    angular
        .module('hud')
        .directive('backgroundTree', BackgroundTree);

    BackgroundTree.$inject = ['$window', 'RprEngineService', 'GameConstants', 'AssetsLoadService', 'RprEngineValues'];

    function BackgroundTree($window, RprEngineService, GameConstants, AssetsLoadService, RprEngineValues) {
        var directive = {
            link: BackgroundTreeLink,
            templateUrl: 'app/client/background/background.tree.view.ng.html',
            restrict: 'EA',
            controller: BackgroundTreeController,
            controllerAs: 'backgroundTreeController',
            bindToController: true,
            scope: {
                container: '=',
                image: '@'
            }
        }

        function BackgroundTreeLink(scope, element, attrs, backgroundTreeController) {
            //
        }

        BackgroundTreeController.$inject = ['$scope', '$attrs', 'RprEngineService'];

        function BackgroundTreeController($scope, $attrs, RprEngineService) {
            var vm = this;
            
            vm.engine = RprEngineService;
            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.tree = PIXI.Sprite.fromFrame(vm.image);
                vm.tree.anchor.x = 0.5;
                vm.container.addChild(vm.tree);

                angular.forEach($attrs, function (value, key) {
                    if(key === 'y') {
                        vm.tree.position.y = 50;
                    }
                });
            });

            $scope.$on('update', function updateEvent() {
                //
            });

            $scope.$on('updateTransform', function updateTransformEvent(evt, data) {
                vm.scrollPosition = data.scrollPosition;
                setPosition();
            });

            function setPosition() {
                var treePos = vm.scrollPosition * 1.5 / 2;

                treePos %= vm.container.width + 556;
                treePos += vm.container.width + 556;
                treePos -= vm.tree.width / 2;
                vm.tree.position.x = treePos - 1000 - RprEngineValues.XOFFSET;
            }
        }

        return directive;
    }
})();