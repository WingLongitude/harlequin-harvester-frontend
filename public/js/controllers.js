var sibIndexerApp = angular.module('sibIndexerApp.controllers', []);

  sibIndexerApp.controller('dataSetsController', function($scope, $modal, collectorAPIservice) {
   
  
   $scope.nameFilterDataSet = null;
   
   $scope.areAllDataSetSelected = false;

   $scope.dataSetsList = [];

   collectorAPIservice.getDataSets().then(function(response) {
        
        //dataSetsListEx = response;
        
        dataSetsListEx = [
		{
			id: 1,
			url: "http://ejemplo.com",
			name: "Ejemplo",
			organization: "Organización de Ejemplo",
			dataSetUUID: "xxxx",
			organizationUUID:"xxxx",
			type:"eje",
			user: 'pepito@pinguino.com',
			status:"discovered",
			country:"Colombia"
		}
		];
	
        for (var i = 0; i < dataSetsListEx.length; i++)
		{
			dataSet = {
				id: dataSetsListEx[i].id,
				url: dataSetsListEx[i].url,
				name: dataSetsListEx[i].name,
				organization: dataSetsListEx[i].organization,
				dataSetUUID: dataSetsListEx[i].dataSetUUID,
				organizationUUID: dataSetsListEx[i].organizationUUID,
				type: dataSetsListEx[i].type,
				user: dataSetsListEx[i].user,
				status: dataSetsListEx[i].status,
				country: dataSetsListEx[i].country,
				isSelected:false}
			$scope.dataSetsList.push(dataSet);
		}
		
    },function(errorMessage){
      $scope.error=errorMessage;
  });
	
	$scope.updateDataSetSelection = function (dataSetArray, selectionValue) {
		for (var i = 0; i < dataSetArray.length; i++)
		{
			dataSetArray[i].isSelected = selectionValue;
		}
	};
	
	$scope.searchFilterDataSet = function (dataSet) {
	    var keyword = new RegExp($scope.nameFilterDataSet, 'i');
	    return !$scope.nameFilterDataSet || keyword.test(dataSet.url) || keyword.test(dataSet.name) || keyword.test(dataSet.organization);
	};
	
	$scope.new = function() {
		var modalInstance = $modal.open({
			templateUrl: 'new.html',
			controller: 'ModalInstanceCtrl',
			resolve: {
				dataSetsList: function(){
					return $scope.dataSetsList;
				},
				userEmail: function(){
					return email;
				}
			}
		});
		
		modalInstance.result.then(function(dataSet){
			$scope.dataSetsList.push(dataSet);	
		});
	};
	
	$scope.delete = function(id) {
         
        //search contact with given id and delete it
        for(i in $scope.dataSetsList) {
            if($scope.dataSetsList[i].id == id) {
                $scope.dataSetsList.splice(i,1);
                $scope.dataSet = {};
            }
        }
         
    };
    
    $scope.index = function() {
    	var dataSetsToIndex = [];
		for (var i = 0; i < $scope.dataSetsList.length; i++)
		{
			if($scope.dataSetsList[i].isSelected==true &&  $scope.dataSetsList[i].status == 'discovered'){
				$scope.dataSetsList[i].status = 'Indexing';
				dataSetsToIndex.push($scope.dataSetsList[i]);
			}
			$scope.dataSetsList[i].isSelected=false;
		}
		alert(dataSetsToIndex);
	};
  });
  
  sibIndexerApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http','dataSetsList', 'userEmail' ,function($scope, $modalInstance, $http, dataSetsList, userEmail){
	  
	  $scope.dataSetsList = dataSetsList;
	  
	  $scope.dataSet ={};
	  
	  $scope.dataSet.status = "discovering";
	  
	  $scope.dataSet.user = email;
	  
	  $scope.countriesArray = ['Colombia','Example'];
	  
	  $scope.saveDataSet = function (dataSet, resultVarName) {

	  	var config ={
	  		params:{
	  			dataSet: dataSet
	  		}
	  	}
	  	
      	$http.post("server.php", null, config)
        .success(function (data, status, headers, config)
        {
          $scope[resultVarName] = data;
        })
        .error(function (data, status, headers, config)
        {
          $scope[resultVarName] = "SUBMIT ERROR";
        });
	  	$modalInstance.close($scope.dataSet);
	  };
	
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
  
  }]);