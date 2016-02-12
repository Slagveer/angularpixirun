(function() {
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('background')
            .value({
                'BackgroundValues': {
                    POINT: new PIXI.Point()
                }
            });
    }
})();