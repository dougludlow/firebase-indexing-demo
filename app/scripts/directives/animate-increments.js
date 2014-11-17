'use strict';

angular
  .module('indexingApp')
  .directive('animateIncrements', Incrementer);

function Incrementer() {
  return {
    restrict: 'A',
    scope: {
      current: '&animateIncrements'
    },
    template: '{{value}}',
    controller: IncrementCtrl
      //link: link
  };

  // function link(scope, element, attr) {
  //
  // }
}

/* @ngInject */
function IncrementCtrl($scope, $interval) {

  $scope.value = 0;

  $scope.$watch('current()', function(current, old) {
    animateChange(old, current, 50);
  });

  function animateChange(start, end, duration) {
    start = start || 0;
    end = end || 0;

    if (start !== end) {

      var range = end - start;
      var current = start;
      var increment = 1;
      var step = Math.abs(Math.floor(duration / range));

      var stop = $interval(function() {

        if (end > start) {
          current += increment;
        } else {
          current -= increment;
        }

        $scope.value = current;

        if (current === end) {
          $interval.cancel(stop);
        }
      }, step);
    }
  }
}
