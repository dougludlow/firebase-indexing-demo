'use strict';

angular
  .module('indexingApp')
  .factory('IpAddress', IpAddress);

function IpAddress($http) {
  var url = 'http://freegeoip.net/json/';

  return {
    get: get
  };

  function get() {
    $http.get(url).then(function(data){
      return data.ip;
    });
  }
}
