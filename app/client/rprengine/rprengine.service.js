/**
 * Created by patricslagveer on 24/12/15.
 */
(function() {
    'use strict';
    angular
        .module('rprengine')
        .factory('RprEngineService', ['$q', '$rootScope', function($q, $rootScope) {
            var factory = {
                send: function(msg, data) {
                    $rootScope.$broadcast(msg, data);
                }
            }
            return factory;
        }]);
})();