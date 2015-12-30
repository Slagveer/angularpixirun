(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('rprengine')
            .value({
                'RprEngineValues': {
                    LOW_MODE: false,
                    HIGH_MODE: false
                }
            });
    }
})();