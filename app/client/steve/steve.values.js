(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('steve')
            .value({
                'SteveValues': {
                    STEVE: {}
                }
            });
    }
})();