/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("lava")
        .directive("lavaView", LavaView);

    function LavaView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/lava/lava.view.ng.html',
            restrict: 'EA',
            controller: LavaViewController,
            controllerAs: 'lavaViewController',
            bindToController: true,
            scope: {
                container: '='
            }
        };

        function link(scope, element, attrs, lavaViewController) {
            //
        }

        LavaViewController.$inject = ['$rootScope', '$scope', '$window', '$state', 'RprEngineService',
            'ResizeService', 'LavaConstants', 'GameConstants', 'AssetsLoadService', 'RprEngineValues', 'GameValues'];

        function LavaViewController($rootScope, $scope, $window, $state, RprEngineService,
        ResizeService, LavaConstants, GameConstants, AssetsLoadService, RprEngineValues, GameValues) {
            var vm = this;
            var amount = LavaConstants.AMOUNT;
            var texture = null;

            vm.setPosition = setPosition;
            vm.engine = RprEngineService;
            vm.sprites = [];
            vm.speed = 1;
            vm.offset = 0;
            vm.count = 0;
            vm.textures = [];

            AssetsLoadService.load(GameConstants.GAME_ASSETS).then(function(){
                vm.lava = new GAME.Lava(vm.container, LavaConstants.TEXTURES, RprEngineValues.XOFFSET);
            });

            $scope.$on('update', function updateEvent() {
                vm.lava.setPosition(GameValues.CAMERA.x + 4000, RprEngineValues.XOFFSET);
            });

            ResizeService.subscribe($rootScope, resized);

            function resized(event, data) {

            }

            function setPosition(position) {
                var h = vm.spriteWidth;
                var frame = (vm.count) % vm.textures.length;

                frame = Math.floor(frame);
                vm.offset += 2.5;
                position += this.offset;
                vm.count += 0.3;
                for (var i=0;i<vm.sprites.length;i++) {
                    var pos = -position * this.speed;
                    pos += i *  h ;
                    pos %=  h * vm.sprites.length ;
                    pos +=  h * 2;

                    vm.sprites[i].textture = (this.textures[frame]);
                    vm.sprites[i].position.x = Math.floor(pos) + 800 - RprEngineValues.XOFFSET;
                };
            }
        }

        return directive;
    }
})();