(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('rprengine')
            .value({
                'GameValues': {
                    GAME_MODE: 0,
                    CAMERA: null,
                    INTERACTIVE: true
                }
            });
    }
})();