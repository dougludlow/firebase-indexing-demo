'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('indexingApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl as vm', {
      $scope: scope
    });
  }));

  it('should add batches array when record is called', function () {

    scope.vm.count = 1;
    scope.vm.record().then(function() {
      expect(scope.vm.batches.length).toBe(1);
      done();
    });
  });

  it('should show undo message when record is called', function () {

    expect(scope.vm.undoVisible).toBe(undefined);

    scope.vm.count = 1;
    scope.vm.record().then(function() {
      expect(scope.vm.undoVisible).toBe(true);
      done();
    });
  });
});
