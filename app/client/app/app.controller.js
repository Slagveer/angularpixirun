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

                AppController.$inject = ['$scope'];

                function AppController($scope) {
                    var vm = this;

                    vm.hideStressTest = false;

                    $scope.$on('stressTestFinished', function stressTestFinished(evt, data) {
                        vm.hideStressTest = true;
                        $scope.$apply();
                    });
                }
            });
    }
})();
