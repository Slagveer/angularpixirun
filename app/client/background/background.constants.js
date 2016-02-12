(function(){
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('background')
            .constant({
                'BackgroundConstants': {
                    VINES: [
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png',
                        '01_hanging_flower3.png'
                    ]
                }
            });
    }
})();