(function(){
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('lava')
            .constant({
                'LavaConstants': {
                    TEXTURES: [
                        'lava_slosh_01.png',
                        'lava_slosh_02.png',
                        'lava_slosh_03.png',
                        'lava_slosh_04.png',
                        'lava_slosh_05.png',
                        'lava_slosh_06.png',
                        'lava_slosh_07.png',
                        'lava_slosh_08.png',
                        'lava_slosh_07.png',
                        'lava_slosh_06.png',
                        'lava_slosh_05.png',
                        'lava_slosh_04.png',
                        'lava_slosh_03.png',
                        'lava_slosh_02.png',
                        'lava_slosh_01.png'
                    ],
                    AMOUNT: 8
                }
            });
    }
})();