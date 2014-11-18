'use strict';

/**
 * @ngdoc function
 * @name indexingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the indexingApp
 */
angular
  .module('indexingApp')
  .controller('MainCtrl', Main);

function Main($scope, Dataservice) {
  var vm = this;
  var service = new Dataservice($scope, 'vm.indexing');

  vm.record = record;
  vm.total = service.total;

  function record() {
    var batches = parseInt(vm.batches);

    if (!isNaN(batches)) {
      service.record(batches);
      vm.batches = '';
    }
  }
}
