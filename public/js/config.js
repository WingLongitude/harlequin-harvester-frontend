var sibIndexerApp = angular.module('sibIndexerApp.config', ["ngRoute"]);

sibIndexerApp.config(function($routeProvider,$httpProvider) {
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
			
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
});