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

function Main($rootScope, $scope, $timeout, dataservice) {
  var vm = this;

  vm.batches = dataservice.batches;
  vm.record = record;
  vm.total = dataservice.total;
  vm.undo = undo;

  activate();

  function activate() {
    $scope.$watch('vm.sum', function(sum) {
      $timeout(function(){
        $rootScope.success = (sum >= 1000);
      }, 100);
    });
  }

  function record() {
    var count = parseInt(vm.count);

    if (!isNaN(count)) {
      vm.count = '';
      vm.undoVisible = false;

      return dataservice.record(count).then(function() {
        vm.countSuccess = count;
        vm.undoVisible = true;
      });
    }
  }

  function undo() {
    vm.undoVisible = false;
    dataservice.undo();
  }
}
