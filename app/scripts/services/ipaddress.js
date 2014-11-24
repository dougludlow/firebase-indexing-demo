'use strict';

angular
  .module('indexingApp')
  .factory('ipaddress', ipaddress);

function ipaddress($http) {
  var url = 'http://freegeoip.net/json/';

  return {
    get: get
  };

  function get() {
    return $http.get(url).success(function(data){
      return data.ip;
    });
  }
}
