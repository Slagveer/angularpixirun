(function(){
    'use strict';
    if (Meteor.isClient) {
      Meteor
          .startup(function () {
            angular
                .module('angularPixirun')
                .config(config);

            config.$inject = ['$urlRouterProvider', '$stateProvider', '$interpolateProvider'];

            function config($urlRouterProvider, $stateProvider, $interpolateProvider) {
              $urlRouterProvider
                  .otherwise(function($injector, $location) {
                      $location.path('/stresstest');
                  });

              //$interpolateProvider
              //    .startSymbol('[[').endSymbol(']]');

            $stateProvider
                .state('stresstest', {
                    url: '/stresstest',
                    views: {
                        'appView@': {
                            templateUrl: 'app/client/app/app.ng.html',
                            controller: 'AppController',
                            controllerAs: 'appController'
                        }
                    }
                })

            }

            if (Meteor.isCordova) {
              angular.element(document).on("deviceready", onReady);
            } else {
              angular.element(document).ready(onReady);
            }

            function onReady() {
              angular.bootstrap(document, ['angularPixirun']);
            }
          });
    }
})();
