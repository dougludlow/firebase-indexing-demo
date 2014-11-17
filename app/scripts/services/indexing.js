'use strict';

angular
  .module('indexingApp')
  .factory('indexing', Indexing);

function Indexing($firebase) {
  var ref = new window.Firebase('https://indexing.firebaseio.com/');
  return $firebase(ref).$asObject();
}
