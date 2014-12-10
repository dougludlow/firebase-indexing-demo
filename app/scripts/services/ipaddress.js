'use strict';

angular
  .module('indexingApp')
  .factory('ipaddress', ipaddress);

function ipaddress($http) {
  var url = 'http://www.telize.com/jsonip';

  return {
    get: get
  };

  function get() {
    return $http.get(url).then(function(response){
      return response.data.ip;
    });
  }
}
