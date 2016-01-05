(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('rprengine')
            .value({
                'GameValues': {
                    GAME_MODE: '',
                    CAMERA: null,
                    INTERACTIVE: false
                }
            });
    }
})();