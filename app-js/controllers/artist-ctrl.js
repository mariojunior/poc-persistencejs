function ArtistCtrl($scope, $location, $routeParams, PersistenceJSEngine) {
    
    $scope.artist = {};

    //URL watcher to form edition/creation list all objects, according url parameter
    $scope.$watch(function () { return $location.path() },
		function () {
		    if ($location.$$url.indexOf("/artists") > -1) {
		        if ($location.$$url.indexOf("new") > -1) {
		            $scope.artist = {};
		        } else if ($location.$$url.indexOf("edit") > -1) {
		            getArtist($routeParams.artistId);
		        } else {
		            list();
		        }
		    }
		}
	);

// --- scoped functions -------
	$scope.backToIndex = function() {
		$location.path("/offline/artists/");
	}

	$scope.save = function() {
		PersistenceJSEngine.saveArtist($scope.artist, function(result) {
    		$scope.backToIndex();
    	});
	}

	$scope.cancel = function() {
		$scope.backToIndex();
	}

	$scope.remove = function(obj) {
		PersistenceJSEngine.removeArtist(obj.id, function(result) {
			setTimeout(function(){
                $scope.$apply();
                $scope.backToIndex();
            },300);
    	});
	}


// --- private functions -------
	function list() {
		PersistenceJSEngine.fetchAllArtist(function(result) {
    		$scope.dataProvider = result;
    		$scope.$apply();
    	});
    }

    function getArtist(artistId) {
    	PersistenceJSEngine.getArtist(artistId, function(result) {
    		$scope.artist = result;
    		$scope.pageTitle = "Editing Artist " + (!result) ? '' : result.name;
    		$scope.$apply();
    	});
    }



};
