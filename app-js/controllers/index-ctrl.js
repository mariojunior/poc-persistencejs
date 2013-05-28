function IndexCtrl($scope, $location) {
    
	$scope.doOnlineLogin = function() {
        console.log("On line: \n" + $scope.user.email + " - " + $scope.user.password);
        $location.path("/online");
    }

    $scope.doOfflineLogin = function() {
        console.log("Off line: \n" + $scope.user.email + " - " + $scope.user.password);
        $location.path("/offline");
	}

};
