(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('rprengine')
            .value({
                'RprEngineValues': {
                    LOW_MODE: false,
                    HIGH_MODE: false,
                    XOFFSET: 0,
                    JOYRIDEMODE: false,
                    IS_PLAYING: false
                }
            });
    }
})();