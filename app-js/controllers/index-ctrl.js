function IndexCtrl($scope, $rootScope, $location) {

    $scope.doOfflineLogin = function() {
    	$rootScope.user = $scope.user;
        $rootScope.logged = true;
        $location.path("/offline/artists/");
	}


};
