(function(){
    'use strict';
    if (Meteor.isClient) {
        angular
            .module('game')
            .constant({
                'GameConstants': {
                    GAME_MODE: {
                        TITLE: 0,
                        COUNT_DOWN: 1,
                        PLAYING: 2,
                        GAME_OVER: 3,
                        INTRO: 4,
                        PAUSED: 5
                    },
                    GAME_ASSETS: [
                        "stretched_hyper_tile.jpg",
                        "SplashAssets.json",
                        "WorldAssets-hd.json",
                        "HudAssets-hd.json",
                        "PixiAssets-hd.json",
                        "iP4_BGtile.jpg",
                        "blackSquare.jpg",
                        "pausedPanel.png",
                        "pixieRevised_controls.png",
                        "ContinuePlay.png",
                        "RestartPlay.png",
                        "soundOff.png",
                        "soundOn.png",
                        "pause.png",
                        "PersonalBest.png"
                        ]
                }
            });
    }
})();