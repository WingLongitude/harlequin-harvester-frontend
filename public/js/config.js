var sibIndexerApp = angular.module('sibIndexerApp.config', ["ngRoute"]);

sibIndexerApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : '/list',
				controller  : 'dataSetsController'
			})
			
			.when('/stats', {
				templateUrl : '/stats',
				controller  : 'dataSetsController'
			});
	});