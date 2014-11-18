'use strict';

angular
  .module('indexingApp')
  .factory('dataservice', dataservice);

function dataservice($firebase, _) {
  var ref = new window.Firebase('https://indexing.firebaseio.com/');
  var base = $firebase(ref).$asObject();

  return {
    base: base,
    bindTo: bindTo,
    record: record,
    total: total
  };

  function bindTo($scope, property) {
    base.$bindTo($scope, property);
  }

  function record(obj, count) {

    if (!obj.batches) {
      obj.batches = [];
    }

    obj.batches.push({
      date: new Date().toISOString(),
      count: count,
      approved: true
    });
  }

  function total(batches) {
    var sum = _(batches)
      .filter('approved')
      .pluck('count')
      .reduce(function(sum, count) {
        return sum + parseInt(count, 10);
      }, 0)
      .valueOf();
    return sum;
  }
}
