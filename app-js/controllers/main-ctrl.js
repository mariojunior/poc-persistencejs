function MainCtrl($scope, $rootScope, $location) {
    
	$rootScope.user = {};
	$rootScope.logged = false;

	$scope.logoutIndex = function() {
		$rootScope.user = {};
		$rootScope.logged = false;
		$location.path("/");
	}

	$scope.amIatRoute = function(path) {
		return $location.$$path.indexOf(path) > -1;
	}

};
