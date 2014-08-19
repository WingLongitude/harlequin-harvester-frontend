angular.module('sibIndexerApp.services', []).
  service('collectorAPIservice', function($http, $q) {

	return({
		getDataSets: getDataSets,
		deleteDataSet: deleteDataSet,
		saveDataSet: saveDataSet,
		index: index,
		discover: discover
    });
                
    function getDataSets() {
        //Calling Web API 
        var request = $http({
        	url: 'http://192.168.16.119:9000/resource',
        	method: 'GET', 
        	headers: {'Content-Type': 'application/json; charset=utf-8'}
      });
      //Returning 
     return(request.then( handleSuccess, handleError ) );
    }

    function deleteDataSet(dataSet){
        //Calling Web API 
    	var request = $http({ method: 'DELETE',
    			url: 'http://192.168.16.119:9000/resource/' + encodeURIComponent(dataSet.url)
    	});
    	//Returning 
     	return(request.then(handleSuccess,handleError));
    }
    
    function saveDataSet(dataSet) {
      	var request = $http({
      		method : "POST", 
      		url : "http://192.168.16.119:9000/resource",
      		data : dataSet, 
      		headers: {'Content-Type': 'application/json'}
      	});
        //Returning 
     	return(request.then( handleSuccess, handleError ) );
    }
    
    function index(dataSetsToIndex) {
      	var request = $http({
      		method : "POST", 
      		url : "http://192.168.16.119:9000/index",
      		data : dataSetsToIndex, 
      		headers: {'Content-Type': 'application/json'}
      	});
        //Returning 
     	return(request.then( handleSuccess, handleError ) );
    }
    
    function discover() {
      	var request = $http({
      		method : "POST", 
      		url : "http://192.168.16.119:9000/discover",
      		headers: {'Content-Type': 'application/json'}
      	});
        //Returning 
     	return(request.then( handleSuccess, handleError ) );
    }

  function handleError( response ) {
	if (!angular.isObject(response.data)|| !response.data.message){
		return( $q.reject("An unknown error occurred."));
    }
    return($q.reject(response.data.message));
  }
 

  function handleSuccess(response) {
	return(response.data);
  }
});