function IndexCtrl($scope, $rootScope, $location) {

    $scope.doOfflineLogin = function() {
    	$rootScope.user = $scope.user;
        console.log("Off line: \n" + $rootScope.user.email + " - " + $rootScope.user.password);
        $rootScope.logged = true;
        $location.path("/offline/artists/");
	}

};
