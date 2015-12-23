angular.module('angularPixirun', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
]);

function onReady() {
  angular.bootstrap(document, ['angularPixirun']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
