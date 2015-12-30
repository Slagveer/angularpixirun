/**
 * Created by patricslagveer on 23/12/15.
 */
(function(){
    'use strict';
    angular
        .module("game")
        .directive("gameView", GameView);

    function GameView() {
        var directive = {
            link: link,
            templateUrl: 'app/client/game/game.view.ng.html',
            restrict: 'EA',
            controller: GameViewController,
            controllerAs: 'gameViewController',
            bindToController: true,
            scope: {
                //
            }
        };
        return directive;

        function link(scope, element, attrs, gameViewController) {
            //
        }

        GameViewController.$inject = ['$interval', '$document', '$scope', '$window', '$state', 'GameConstants',
                'RprEngineService', 'AssetsLoadService', 'RprEngineValues'];

        function GameViewController($interval, $document, $scope, $window, $state, GameConstants,
                                    RprEngineService, AssetsLoadService, RprEngineValues) {
            var vm = this;

            vm.init = init;
            vm.showGame = true;

            $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                vm.interactive = false;
                $document[0].body.scroll = "no";
                init();
            });

            function init() {
                vm.gameMode = GameConstants.GAME_MODE.INTRO;
                vm.game = RprEngineService;

                if(!AssetsLoadService.loaded) {
                    AssetsLoadService.load(GameConstants.GAME_ASSETS)
                        .then(onSucces, onError);
                }

                $scope.$on('countdownCompleted', function countdownCompleted() {
                    vm.interactive = true;
                    vm.gameMode = GameConstants.GAME_MODE.PLAYING;
                    $scope.$broadcast('showPause');
                });

                if(RprEngineValues.LOW_MODE === true) {
                    $interval(update, 1000/30);
                } else {
                    requestAnimationFrame(update);
                }
            }

            function update() {
                RprEngineService.send('update');
                requestAnimationFrame(update);
            }

            function onSucces(data) {
                vm.gameMode = GameConstants.GAME_MODE.INTRO;
                vm.interactive = false;
            }

            function onError(error) {
                console.log(err);
            }
        }
    }
})();