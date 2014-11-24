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

function Main($scope, dataservice) {
  var vm = this;
  var ds = dataservice($scope, 'vm.indexing');

  vm.record = record;
  vm.total = ds.total;

  function record() {
    var batches = parseInt(vm.batches);

    if (!isNaN(batches)) {
      ds.record(batches);
      vm.batches = '';
    }
  }
}
