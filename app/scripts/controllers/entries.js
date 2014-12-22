'use strict';

/**
* @ngdoc function
* @name indexingApp.controller:EntriesCtrl
* @description
* # MainCtrl
* Controller of the indexingApp
*/
angular
.module('indexingApp')
.controller('EntriesCtrl', Entries);

function Entries(dataservice) {
  var vm = this;

  vm.batches = dataservice.batches;
}
