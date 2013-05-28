function OnlineCtrl($scope, $location) {
    
	
	$scope.saveLocal = function(album) {
		console.log("storing object on [Local] WebSQL database.");

	}


	$scope.backToIndex = function() {
		console.log("coming back to index page.");
	}

};
