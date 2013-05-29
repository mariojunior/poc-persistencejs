function AlbumCtrl($scope, $location, $routeParams, PersistenceJSEngine) {
    
    $scope.album = {};

    PersistenceJSEngine.fetchAllArtist(function(result) {
        $scope.artistProvider = result;
        $scope.$apply();
    });

    //URL watcher to form edition/creation list all objects, according url parameter
    $scope.$watch(function () { return $location.path() },
		function () {
		    if ($location.$$url.indexOf("/albums") > -1) {
		        if ($location.$$url.indexOf("new") > -1) {
		            $scope.album = {};
		        } else if ($location.$$url.indexOf("edit") > -1) {
		            getAlbum($routeParams.albumId);
		        } else {
		            list();
		        }
		    }
		}
	);

// --- scoped functions -------
	$scope.backToIndex = function() {
		$location.path("/offline/albums/");
        // $scope.$apply();
	}

    $scope.save = function() {
    	PersistenceJSEngine.saveAlbum($scope.album, function(result) {
    		$scope.backToIndex();
    	});
    }

    $scope.cancel = function() {
        $scope.backToIndex();
    }

    $scope.remove = function(obj) {
        PersistenceJSEngine.removeAlbum(obj.id, function(result) {
            setTimeout(function(){
                $scope.$apply();
                $scope.backToIndex();
            },300);
        });
    }

// --- private functions -------
	function list() {
		PersistenceJSEngine.fetchAllAlbums(function(result) {
    		$scope.dataProvider = result;
    		$scope.$apply();
    	});
    }
    
    function getAlbum(albumId) {
    	PersistenceJSEngine.getAlbum(albumId, function(result) {
    		$scope.album = result;
    		$scope.pageTitle = "Editing Album " + (!result) ? '' : result.name;
    		$scope.$apply();
    	});
    }



};
