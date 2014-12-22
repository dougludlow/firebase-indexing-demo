'use strict';

/**
 * @ngdoc function
 * @name indexingApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the indexingApp
 */
angular
  .module('indexingApp')
  .controller('ChartCtrl', ChartCtrl);

function ChartCtrl(_, dataservice) {
  var vm = this;

  vm.batches = dataservice.batches;
  vm.xAxisTickFormat = xAxisTickFormat;
  vm.data = _.memoize(data);

  function xAxisTickFormat() {
    return function(d) {
      return window.d3.time.format('%m/%d/%y')(new Date(d));
    };
  }

  function data(batches) {
    return [{
      key: 'Total batches',
      values: totalBatchesOverTime(batches),
      color: '#18bc9c',
      area: true
    }, {
      key: 'Batches per day',
      values: batchesPerDay(batches),
      color: '#3498Db',
      area: true
    }];
  }

  function batchesPerDay(batches) {

    var values = [];

    if (batches && batches.length) {
      values = _(batches)
        .where(function(b) {
          return b.date && b.count;
        })
        .groupBy(function(b) {
            var date = new Date(b.date);
            date.setHours(0,0,0,0);
            date.setMinutes(date.getTimezoneOffset());
            return date.toDateString();
        })
        .reduce(function(values, batches, key) {
          values.push([new Date(key), _(batches)
            .pluck('count')
            .reduce(function(total, count) {
              return total + count;
            })]);

          return values;
        }, []);
    }

    return values;
  }

  function totalBatchesOverTime(batches) {
    var values = [], count = 0;

    if (batches && batches.length) {
      values = _(batches)
        .where(function(b) {
          return b.date && b.count;
        })
        .groupBy(function(b) {
          var date = new Date(b.date);
          date.setHours(0,0,0,0);
          date.setMinutes(date.getTimezoneOffset());
          return date.toDateString();
        })
        .reduce(function(values, batches, key) {

          count += _(batches)
            .pluck('count')
            .reduce(function(total, count) {
              return total + count;
            });

          values.push([new Date(key), count]);

          return values;
        }, []);
    }

    return values;
  }
}
