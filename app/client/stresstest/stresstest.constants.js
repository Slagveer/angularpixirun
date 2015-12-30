(function(){
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('stresstest')
            .constant({
                'StressTestConstants': {
                    GAME_ASSETS: [
                        "loading_01.png",
                        "loading_02.png",
                        "loading_03.png",
                        "loading_04.png"
                        ],
                    GAME_BUNNYS: 300
                }
            });
    }
})();