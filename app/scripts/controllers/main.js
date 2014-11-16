'use strict';

/**
 * @ngdoc function
 * @name indexingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the indexingApp
 */
angular.module('indexingApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
