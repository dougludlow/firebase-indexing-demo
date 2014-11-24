'use strict';

angular
  .module('indexingApp')
  .service('dataservice', dataservice);

function dataservice($firebase, _) {
  var ref = new window.Firebase('https://indexing.firebaseio.com/');

  return function (scope, property) {
    bind(scope, property);

    return {
      record: record,
      total: total
    };

    function bind(scope, property) {
      var obj = $firebase(ref).$asObject();
      obj.$bindTo(scope, property);
    }

    function record(count) {
      var obj = scope.$eval(property);

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
}
