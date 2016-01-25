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
                'RprEngineService', 'AssetsLoadService', 'RprEngineValues', 'GameValues'];

        function GameViewController($interval, $document, $scope, $window, $state, GameConstants,
                                    RprEngineService, AssetsLoadService, RprEngineValues, GameValues) {
            var vm = this;

            vm.init = init;
            vm.prevState = false;

            GameValues.GAMEMODE = GameConstants.GAME_MODE.TITLE;

            $scope.$watch(function() {
                return GameValues.GAME_MODE;
            }, function(newVal) {
                vm.mode = newVal;
            }, true);

            $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                GameValues.INTERACTIVE = true;
                $scope.$apply();
                $document[0].body.scroll = "no";
                init();
            });

            $scope.$on('tapped', function onTapped(evt, data) {
                if(GameValues.GAMEMODE === GameConstants.GAME_MODE.INTRO){

                }else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.TITLE) {

                }else if(GameValues.GAMEMODE === GameConstants.GAME_MODE.GAME_OVER) {
                    GameValues.INTERACTIVE = false;
                } else {

                }
            });

            $scope.$on('gameover', function gameover(evt, data) {
                //GameValues.GAMEMODE = GameConstants.GAME_MODE.GAME_OVER;
                GameValues.INTERACTIVE = false;
            });

            $scope.$on('pausePressed', function pausePressed(evt, data) {
                if(GameValues.GAMEMODE === GameConstants.GAME_MODE.PAUSED){
                    GameValues.INTERACTIVE = true;
                    vm.gameMode = prevState;
                    vm.prevState = false;
                }
            });

            $scope.$on('countdownCompleted', function countdownCompleted() {
                GameValues.INTERACTIVE = true;
                GameValues.GAMEMODE = GameConstants.GAME_MODE.PLAYING;
            });

            function init() {
                //GameValues.GAMEMODE = GameConstants.GAME_MODE.INTRO;
                vm.engine = RprEngineService;

                AssetsLoadService
                    .load(GameConstants.GAME_ASSETS)
                    .then(onSucces, onError);

                if(RprEngineValues.LOW_MODE === true) {
                    $interval(update, 1000/30);
                } else {
                    requestAnimationFrame(update);
                }
            }

            function update() {
                RprEngineService.update();
                requestAnimationFrame(update);
            }

            function onSucces(data) {
                GameValues.GAMEMODE = GameConstants.GAME_MODE.INTRO;
                GameValues.INTERACTIVE = true;
            }

            function onError(error) {
                console.log(err);
            }
        }
    }
})();
