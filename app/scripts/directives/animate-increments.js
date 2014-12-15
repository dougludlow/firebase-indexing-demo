'use strict';

angular
  .module('indexingApp')
  .directive('animateIncrements', Incrementer);

function Incrementer() {
  return {
    restrict: 'A',
    scope: {
      current: '@animateIncrements'
    },
    template: '{{value}}',
    controller: IncrementCtrl
  };
}

/* @ngInject */
function IncrementCtrl($scope, $interval) {

  $scope.value = 0;

  $scope.$watch('current', function(current, old) {
    animateChange(+old, +current, 100);
  });

  function animateChange(start, end, duration) {
    start = start || 0;
    end = end || 0;

    if (start !== end) {

      var range = end - start;
      var current = start;
      var increment = Math.abs(Math.ceil(range / duration));
      var step = Math.abs(Math.floor(duration / range));

      var stop = $interval(function() {

        if (end > start) {
          current += increment;
          if (current > end) {
            current = end;
          }
        } else {
          current -= increment;
          if (current < end) {
            current = end;
          }
        }

        if (current === end) {
          $interval.cancel(stop);
        }

        $scope.value = current;

      }, step);
    }
    else {
      $scope.value = end;
    }
  }
}
