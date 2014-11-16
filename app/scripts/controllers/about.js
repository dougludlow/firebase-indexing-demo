'use strict';

/**
 * @ngdoc function
 * @name indexingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the indexingApp
 */
angular.module('indexingApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
