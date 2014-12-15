'use strict';

describe('Directive: animateIncrements', function() {

  var $compile, $rootScope;

  beforeEach(module('indexingApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('isolate scope', function() {
    var $interval, isolated;

    beforeEach(inject(function(_$interval_) {
      $interval = _$interval_;
      var element = $compile('<span animate-increments="{{val}}"></span>')($rootScope);
      isolated = element.isolateScope();
      $rootScope.$digest();
    }));

    it('responds to external changes', function() {
      $rootScope.val = 1;
      $rootScope.$digest();
      $interval.flush(100);
      expect(isolated.value).toBe(1);
    });

    it('is not accessible via rootScope', function() {
      $rootScope.val = 1;
      $rootScope.$digest();
      expect($rootScope.value).toBe(undefined);
    });
  });

  describe('markup', function() {

    var $interval, element;

    beforeEach(inject(function(_$interval_) {
      $interval = _$interval_;

      element = $compile('<span animate-increments="{{val}}"></span>')($rootScope);
      $rootScope.$digest();
    }));

    it('is replaced with the appropriate content', function() {
      expect(element.html()).toContain('0');
    });

    it('updates after external changes are made', function() {
      $rootScope.val = 1;
      $rootScope.$digest();
      $interval.flush(2000);

      expect(element.html()).toContain('1');
    });

    it('fully increments within 100 milliseconds', function() {
      $rootScope.val = 1000;
      $rootScope.$digest();
      $interval.flush(100);

      expect(element.html()).toContain('1000');
    });
  });

});
