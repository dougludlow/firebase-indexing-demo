'use strict';

/**
* @ngdoc function
* @name indexingApp.controller:ChartCtrl
* @description
* # ChartCtrl
* Controller of the indexingApp
*/
angular
  .module('indexingApp')
  .controller('ChartCtrl', ChartCtrl);

function ChartCtrl(dataservice) {
  var vm = this;

  vm.batches = dataservice.batches;
}
