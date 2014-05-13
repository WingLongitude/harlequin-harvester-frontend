angular.module('sibIndexerApp.services', []).
  factory('collectorAPIservice', function($http, $q) {

    var collectorAPI = {};

    collectorAPI.getDataSets = function() {
    	apiPath:'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK';
    	
    	//Creating a deferred object
        var deferred = $q.defer();
 
        //Calling Web API to fetch shopping cart items
        $http({
        	method: 'JSONP', 
        	url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      }).success(function(data){
	         //Passing data to deferred's resolve function on successful completion
	          deferred.resolve(data);
      }).error(function(){
	        //Sending a friendly error message in case of failure
	        deferred.reject("An error occured while fetching items");
      });
 
      //Returning the promise object
      return deferred.promise;
    }
    
    return collectorAPI;
  });