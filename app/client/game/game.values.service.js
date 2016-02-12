/**
 * Created by patricslagveer on 26/12/15.
 */
(function() {
    'use strict';
    angular
        .module('game')
        .factory('GameValues', ['GameConstants', function(GameConstants) {
            var factory = {
                GAMEMODE: GameConstants.GAME_MODE.TITLE,
                INTERACTIVE: false,
            }

            return factory;
        }]);
})();