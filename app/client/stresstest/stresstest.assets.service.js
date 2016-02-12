/**
 * Created by patricslagveer on 26/12/15.
 */
(function() {
    'use strict';
    angular
        .module('stresstest')
        .factory('StressTestAssetsLoadService', ['$q', '$rootScope', function($q, $rootScope) {
            var deferred = $q.defer();
            var factory = {
                loaded: false,
                progress: false,
                load: function(assets) {
                    if(!this.progress) {
                        this.progress = true;
                        for (var i = 0, l = assets.length; i < l; i++) {
                            loader.add(assets[i]);
                        }
                        loader.load(function (loader, resources) {
                            //
                        });
                    }
                    return deferred.promise;
                }
            }
            var loader = new PIXI.loaders.Loader();
            loader.on('complete', function(event) {
                factory.loaded = true;
                deferred.resolve(event);
            });
            loader.on('error', function(error) {
                deferred.reject(error);
            });

            return factory;
        }]);
})();