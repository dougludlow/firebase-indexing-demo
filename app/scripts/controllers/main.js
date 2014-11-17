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

function Main($scope, indexing) {
  var vm = this;

  vm.record = record;
  activate();

  function activate() {
    indexing.$bindTo($scope, 'vm.indexing');
  }

  function record() {
    var batches = parseInt(vm.batches);

    if (!isNaN(batches)) {

      if (!vm.indexing.totalBatches) {
        vm.indexing.totalBatches = 0;
      }

      vm.batches = '';
      vm.indexing.totalBatches += batches;
    }
  }
}
