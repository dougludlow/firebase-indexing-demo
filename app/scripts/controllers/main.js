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

function Main($timeout, dataservice) {
  var vm = this;

  vm.batches = dataservice.batches;
  vm.record = record;
  vm.total = dataservice.total;
  vm.undo = undo;

  function record() {
    var count = parseInt(vm.count);

    if (!isNaN(count)) {
      dataservice.record(count);
      vm.count = '';
      vm.countSuccess = count;
      vm.undoVisible = false;

      $timeout(function(){
        vm.undoVisible = true;
      });
    }
  }

  function undo() {
    vm.undoVisible = false;
    dataservice.undo();
  }
}
