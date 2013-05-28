function ArtistCtrl($scope, $location, $routeParams, ArtistRepository) {
    
    $scope.artist = {};

    //URL watcher to form edition/creation list all objects, according url parameter
    $scope.$watch(function () { return $location.path() },
		function () {
		    if ($location.$$url.indexOf("/artists") > -1) {
		        if ($location.$$url.indexOf("new") > -1) {
		            $scope.artist = {};
		        } else if ($location.$$url.indexOf("edit") > -1) {
		            get($routeParams.artistId);
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
		ArtistRepository.query(null, function(result) {
    		$scope.dataProvider = result;
    	});
    }

    function get(artistId) {
    	ArtistRepository.get({id: artistId}, function(result) {
    		$scope.artist = result;
    		$scope.pageTitle = "Editing Artist " + result.name;
    	});
    }



};
