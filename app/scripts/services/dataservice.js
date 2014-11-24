'use strict';

angular
  .module('indexingApp')
  .factory('dataservice', dataservice);

function dataservice($firebase, _, ipaddress) {
  var ref = new window.Firebase('https://indexing.firebaseio.com/batches'),
    batches = $firebase(ref).$asArray(),
    last;

  return {
    batches: batches,
    record: record,
    remove: remove,
    undo: undo,
    total: total,
    getLast: getLast
  };

  function record(count) {
    var batch = {
      date: new Date().toISOString(),
      count: count,
      approved: true
    };

    return batches.$add(batch).then(function (ref) {
      var b = $firebase(ref).$asObject();

      // Save reference to last record added.
      last = b;

      ipaddress.get().then(function (ip) {
        b.ip = ip || 'unknown';
        b.$save();
      });

      return b;
    });
  }

  function remove(record) {
    if (record && record.$id) {
      batches.$remove(batches.$indexFor(record.$id));
    }
  }

  function getLast() {
    return last || null;
  }

  function undo() {
    remove(getLast());
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
}
