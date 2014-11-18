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

  vm.record = record;
  vm.total = dataservice.total;

  activate();

  function activate() {
    dataservice.bindTo($scope, 'vm.indexing');
  }

  function record() {
    var batches = parseInt(vm.batches);

    if (!isNaN(batches)) {
      dataservice.record(vm.indexing, batches);
      vm.batches = '';
    }
  }
}
