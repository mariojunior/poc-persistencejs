function TrackCtrl($scope, $location, $routeParams, TrackRepository) {
    
    $scope.track = {};

    //URL watcher to form edition/creation list all objects, according url parameter
    $scope.$watch(function () { return $location.path() },
		function () {
		    if ($location.$$url.indexOf("/tracks") > -1) {
		        if ($location.$$url.indexOf("new") > -1) {
		            $scope.album = {};
		        } else if ($location.$$url.indexOf("edit") > -1) {
		            get($routeParams.trackId);
		        } else {
		            list();
		        }
		    }
		}
	);

// --- scoped functions -------
	$scope.backToIndex = function() {
		$location.path("/offline");
	}


// --- private functions -------
	function list() {
		TrackRepository.query(null, function(result) {
    		$scope.dataProvider = result;
    	});
    }

    function get(trackId) {
    	TrackRepository.get({id: trackId}, function(result) {
    		$scope.track = result;
    		$scope.pageTitle = "Editing Track " + result.name;
    	});
    }



};
