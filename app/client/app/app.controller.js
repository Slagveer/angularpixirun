/**
 * Created by patricslagveer on 30/12/15.
 */
(function(){
    'use strict';
    if (Meteor.isClient) {
        Meteor
            .startup(function () {
                angular
                    .module('angularPixirun')
                    .controller('AppController', AppController);

                AppController.$inject = ['$scope', '$window', '$document', 'ResizeService'];

                function AppController($scope, $window, $document, ResizeService) {
                    var vm = this;

                    vm.hideStressTest = false;

                    $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                        vm.hideStressTest = true;
                        $scope.$apply();
                        // Send a default resize event
                        ResizeService.notify($window, $document);
                    });

                    angular.element($window).bind('resize', resize);

                    function resize() {
                        ResizeService.notify($window, $document);
                    }
                }
            });
    }
})();
