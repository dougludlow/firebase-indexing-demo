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
  vm.batchesPerDay = _.memoize(batchesPerDay);
  vm.totalBatchesOverTime = _.memoize(totalBatchesOverTime);

  function xAxisTickFormat() {
    return function(d) {
      return window.d3.time.format('%m/%d/%y')(new Date(d));
    };
  }

  function batchesPerDay(batches) {

    var values = [];

    if (batches && batches.length) {
      values = _(batches)
        .where(function(b) {
          return b.date && b.count;
        })
        .groupBy(function(b) {
            return b.date.substring(0, 10); //by day
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

    return [{
      key: 'Batches',
      values: values,
      color: '#18bc9c',
      area: true
    }];
  }

  function totalBatchesOverTime(batches) {
    var values = [], count = 0;

    if (batches && batches.length) {
      values = _(batches)
        .where(function(b) {
          return b.date && b.count;
        })
        .groupBy(function(b) {
          return b.date.substring(0, 10); //by day
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

    return [{
      key: 'Batches',
      values: values,
      color: '#18bc9c',
      area: true
    }];
  }
}
