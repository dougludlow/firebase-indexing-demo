'use strict';

/**
 * @ngdoc overview
 * @name indexingApp
 * @description
 * # indexingApp
 *
 * Main module of the application.
 */
angular
  .module('indexingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    'firebase',
    'ui.bootstrap',
    'ui.route',
    'angular.filter',
    'percentage',
    'nvd3ChartDirectives'
  ])
  .constant('_', window._)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'vm'
      })
      .when('/entries', {
        templateUrl: 'views/entries.html',
        controller: 'EntriesCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
