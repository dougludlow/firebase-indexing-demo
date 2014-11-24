'use strict';

angular
  .module('indexingApp')
  .factory('dataservice', dataservice);

function dataservice($firebase, _, ipaddress, uuid) {
  var ref = new window.Firebase('https://indexing.firebaseio.com/');

  return function (scope, property) {
    var last;
    bind(scope, property);

    return {
      record: record,
      remove: remove,
      undo: undo,
      total: total,
      getLast: getLast
    };

    function prop() {
      var obj = scope.$eval(property);

      if (!obj.batches) {
        obj.batches = [];
      }

      return obj;
    }

    function bind(scope, property) {
      var obj = $firebase(ref).$asObject();
      obj.$bindTo(scope, property);
    }

    function record(count) {
      var obj = prop();

      var r = {
        id: uuid.new(),
        date: new Date().toISOString(),
        count: count,
        approved: true
      };

      last = r;
      obj.batches.push(r);

      ipaddress.get().then(function (ip) {
        r.ip = ip || 'unknown';
      });
    }

    function undo() {
      remove(getLast());
    }

    function remove(record) {
      if (!record) {
        return;
      }

      var obj = prop();

      if (angular.isString(record)) {
        record = _.find(obj.batches, {'id': record});
      }

      if (angular.isObject(record)) {
        obj.batches.splice(obj.batches.indexOf(record), 1);
      }
    }

    function total(batches) {
      return _(batches)
        .filter('approved')
        .pluck('count')
        .reduce(function (sum, count) {
          return sum + parseInt(count, 10);
        }, 0)
        .valueOf();
    }

    function getLast() {
      return last || null;
    }
  };
}
