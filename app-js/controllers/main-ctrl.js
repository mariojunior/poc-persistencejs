function MainCtrl($scope, $rootScope, $location, PersistenceJSEngine) {
    
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


	$scope.resetDatabase = function() {
		PersistenceJSEngine.rebuildDB();
	}

};
