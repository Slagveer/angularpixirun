/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("stresstest")
        .directive("stressTestView", StressTestView);

    function StressTestView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/stresstest/stresstest.view.ng.html',
            restrict: 'EA',
            controller: StressTestViewController,
            controllerAs: 'stressTestViewController',
            bindToController: true,
            scope: {
                //
            }
        };
        return directive;

        function link(scope, element, attrs, stressTestViewController) {
            element[0].appendChild(stressTestViewController.renderer.view);
        }

        StressTestViewController.$inject = ['$rootScope', '$scope', '$window', '$document', '$state', 'StressTestConstants'
            , 'RprEngineService', 'StressTestAssetsLoadService', 'SpritePool'];

        function StressTestViewController($rootScope, $scope, $window, $document, $state, StressTestConstants,
                                          RprEngineService, StressTestAssetsLoadService, SpritePool) {
            var vm = this;

            vm.begin = begin;
            vm.resize = resize;

            init();

            function begin() {
                vm.testSprites = [];
                for (var i=0;i<StressTestConstants.GAME_BUNNYS;i++) {
                    var bunny = new PIXI.Sprite(vm.texture);

                    bunny.anchor.x = 0.5;
                    bunny.anchor.y = 0.5;
                    bunny.position.x = 50 + Math.random() * 400;
                    bunny.position.y = 10;

                    vm.stage.addChild(bunny);
                    vm.testSprites.push(bunny);

                };
                vm.graphics2 = new PIXI.Graphics();
                vm.graphics2.beginFill(0x25284A);
                vm.graphics2.drawRect(0, 0, vm.width, vm.height);
                vm.stage.addChild(vm.graphics2);

                var logo = new PIXI.Sprite(PIXI.Texture.fromImage('goodboy_logo.png'));
                logo.anchor.x = 0.5;
                logo.anchor.y = 0.5;
                logo.position.x = vm.width * 0.5;
                logo.position.y = vm.height * 0.48;

                if(vm.Device.cocoonJS) {
                    logo.scale.set(1);
                    logo.position.y = vm.height * 0.47;
                } else {
                    logo.scale.set(1);
                }
                vm.stage.addChild(logo);
                vm.startTime = Date.now();
                vm.lastTime = Date.now();

                requestAnimationFrame(update);
            }

            function resize(w, h) {
                vm.width = w;
                vm.height = h;
            }

            function init() {
                if(!StressTestAssetsLoadService.loaded) {
                    StressTestAssetsLoadService.load(StressTestConstants.GAME_ASSETS)
                        .then(onSucces, onError);
                }
                vm.Device = new Fido.Device();
                vm.width = $window.innerWidth || $document.body.clientWidth;
                vm.height = $window.innerHeight || $document.body.clientHeight;
                vm.frameCount = 0;
                vm.tick = 0;
                vm.currentLoadSprite = false;
                vm.renderer = PIXI.autoDetectRenderer($window.innerWidth, $window.innerHeight);
                vm.stage = new PIXI.Stage(0x25284A);
                vm.graphics = new PIXI.Graphics();
                vm.graphics.beginFill(0x25284A);
                vm.graphics.drawRect(0, 0, vm.width, vm.height);
                vm.stage.addChild(vm.graphics);
                vm.duration = 3;
                vm.texture = PIXI.Texture.fromImage("testImage.png");
                vm.texture.listeners('loaded', function loaded() {
                    vm.begin();
                });
                vm.frameRate = [];
            }

            function update() {
                vm.frameCount++;

                if(vm.frameCount % 12 === 1) {
                    if(vm.tick === StressTestConstants.GAME_ASSETS.length) {
                        vm.tick = 0;
                    }

                    var sprite = SpritePool.get(StressTestConstants.GAME_ASSETS[vm.tick]);
                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;
                    sprite.position.x = vm.width * 0.5;
                    sprite.position.y = vm.height * 0.5 + 40;

                    if(vm.Device.cocoonJS) {
                        sprite.position.y = vm.height * 0.5 + 40;
                    }

                    vm.stage.addChild(sprite);
                    if(vm.currentLoadSprite !== false) vm.stage.removeChild(vm.currentLoadSprite);

                    vm.currentLoadSprite = sprite;

                    vm.tick++;
                }

                var currentTime = Date.now();

                for (var i=0; i < vm.testSprites.length; i++) {
                    vm.testSprites[i].rotation += 0.3;
                }

                vm.renderer.render(vm.stage);

                var diff = currentTime - vm.lastTime;
                diff *= 0.06;
                vm.frameRate.push(diff);
                vm.lastTime = currentTime;

                var elapsedTime = currentTime - vm.startTime;

                if(elapsedTime < vm.duration * 1000) {
                    requestAnimationFrame(update);
                } else {
                    $rootScope.$broadcast('stressTestFinished', {
                        result: vm.frameRate.length / vm.duration
                    });
                }
            }

            function onSucces(data) {
                vm.begin();
            }

            function onError(error) {
                console.log(err);
            }
        }
    }
})();