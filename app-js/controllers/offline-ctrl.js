function OfflineCtrl($scope, $location, $routeParams, Albums) {
    
    

    //URL watcher to rate a specific album or list all them, according url parameter
    $scope.$watch(function () { return $location.path() },
		function () {
		    if ($location.$$url.indexOf("/offline") > -1) {
		        if ($location.$$url.indexOf("rating") > -1) {
		            get($routeParams.albumId);
		        } else {
		            list();
		        }
		    }
		}
	);

// --- scoped functions -------
	$scope.backToAlbums = function() {
		$location.path("/offline");
	}


// --- private functions -------
	function list() {
		Albums.query(null, function(result) {
    		$scope.dataProvider = result;
    	});
    }

    function get(albumId) {
    	Albums.get({id: albumId}, function(result) {
    		$scope.album = result;
    		$scope.pageTitle = "Rating Album " + result.name;
    	});
    }



};
