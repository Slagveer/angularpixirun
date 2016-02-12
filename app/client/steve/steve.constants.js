(function(){
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('steve')
            .constant({
                'SteveConstants': {
                    'RUNNINGFRAMES': [
                        'characterRUNscaled_01.png',
                        'characterRUNscaled_02.png',
                        'characterRUNscaled_03.png',
                        'characterRUNscaled_04.png',
                        'characterRUNscaled_05.png',
                        'characterRUNscaled_06.png',
                        'characterRUNscaled_07.png',
                        'characterRUNscaled_08.png',
                        'characterRUNscaled_09.png'
                    ],
                    'FLYINGFRAMES': [
                        'characterFLATflying_01.png',
                        'characterFLATflying_02.png',
                        'characterFLATflying_03.png'
                    ],
                    'CRASHFRAMES': [
                        'characterFALLscaled3.png',
                        'characterFALLscaled1.png',
                        'characterFALLscaled3.png'
                    ]
                }
            });
    }
})();