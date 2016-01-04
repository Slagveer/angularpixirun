(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('rprengine')
            .value({
                'GameValues': {
                    CAMERA: null,
                    INTERACTIVE: false
                }
            });
    }
})();