angular.module('angularPixirun').config(['$stateProvider',
  function($stateProvider){

    $stateProvider
      .state('tweets', {
        parent: 'root',
        url: '/tweets',
        templateUrl: 'app/client/tweets/views/tweets-list.ng.html',
        controller: 'TweetsListCtrl'
      });
  }]);
