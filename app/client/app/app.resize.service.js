/**
 * Created by patricslagveer on 30/12/15.
 */
(function() {
    'use strict';
    angular
        .module('angularPixirun')
        .factory('ResizeService', function($rootScope) {
            var factory = {
                subscribe: subscribe,
                notify: notify
            };

            function subscribe(scope, callback) {
                var handler = scope.$on('resized', callback);
                scope.$on('$destroy', handler);
            }

            function notify(windowService, documentService) {
                factory.h = 640;
                factory.width = windowService.innerWidth || documentService.body.clientWidth;
                factory.height = windowService.innerHeight || documentService.body.clientHeight;
                factory.ratio = factory.height / factory.h;
                factory.newWidth = (factory.width / factory.ratio);
                $rootScope.$emit('resized', {
                    window: windowService,
                    document: documentService
                });
            }

            return factory;
    });
})();