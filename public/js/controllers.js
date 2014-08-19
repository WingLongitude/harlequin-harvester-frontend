var sibIndexerApp = angular.module('sibIndexerApp.controllers',[]);

sibIndexerApp.controller('dataSetsController',function($scope, $modal, collectorAPIservice){
	$scope.nameFilterDataSet = null;

	$scope.areAllDataSetSelected = false;

	$scope.dataSetsList = [];

	collectorAPIservice.getDataSets().then(function(response){
		dataSetsListEx = response;
	
		for (var i = 0; i < dataSetsListEx.length; i++){
			dataSet = {
				id: dataSetsListEx[i].id,
				url: dataSetsListEx[i].url,
				name: dataSetsListEx[i].name,
				organization: dataSetsListEx[i].organization,
				dataSetUUID: dataSetsListEx[i].dataSetUUID,
				organizationUUID: dataSetsListEx[i].organizationUUID,
				type: dataSetsListEx[i].type,
				user: dataSetsListEx[i].user,
				status: "discovered",
				country: dataSetsListEx[i].country,
				isSelected:false}
			$scope.dataSetsList.push(dataSet);
		}
	},function(errorMessage){
		$scope.error=errorMessage;
	});

	
	$scope.updateDataSetSelection = function (dataSetArray, selectionValue) {
		for (var i = 0; i < dataSetArray.length; i++){
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
		modalInstance.result.then(function(response){
			$scope.error="";
		});
	};
	
	$scope.drop = function(dataSet){
		collectorAPIservice.deleteDataSet(dataSet).then(function(response){
			if(response.code==200){
				var index = $scope.dataSetsList.indexOf(dataSet);
				if (index != -1) {
					$scope.dataSetsList.splice(index,1);
				}
			}
    	},function(errorMessage){
			$scope.error=errorMessage;
  		});
  	};
         
    $scope.index = function(){
    	var dataSetsIdsToIndex = [];
		for (var i = 0; i < $scope.dataSetsList.length; i++)
		{
			if($scope.dataSetsList[i].isSelected==true &&  $scope.dataSetsList[i].status == 'discovered'){
				$scope.dataSetsList[i].status = 'Indexing';
				dataSetsIdsToIndex.push($scope.dataSetsList[i].url);
			}
			$scope.dataSetsList[i].isSelected=false;
		}
		var dataSetsToIndex = [dataSetsIdsToIndex, email];
		collectorAPIservice.index(dataSetsToIndex).then(function(response){
			alert(response.message);
		});
    },function(errorMessage){
    	$scope.error=errorMessage;
	};
  
   $scope.discover = function(){
		collectorAPIservice.discover().then(function(response){
			alert(response.message);
		});
    },function(errorMessage){
		$scope.error=errorMessage;
	};
});
  
sibIndexerApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http','dataSetsList' , 'collectorAPIservice' ,function($scope, $modalInstance, $http, dataSetsList, collectorAPIservice){
	$scope.dataSetsList = dataSetsList;
	$scope.dataSet ={};
	$scope.dataSet.user = email;
	$scope.countriesArray = ['Colombia','Example'];
	$scope.saveDataSet = function (dataSet) {
		collectorAPIservice.saveDataSet(dataSet).then(function(response){
			if(response.code==400){
				alert(response.message);
			}else{
				$scope.dataSetsList.push(dataSet);
			}
			$modalInstance.close(response.data);
		},function(errorMessage){
			$scope.error=errorMessage;
		}
	)};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);