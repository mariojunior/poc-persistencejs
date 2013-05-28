function AlbumCtrl($scope, $location, $routeParams, AlbumRepository) {
    
    $scope.album = {};

    //URL watcher to form edition/creation list all objects, according url parameter
    $scope.$watch(function () { return $location.path() },
		function () {
		    if ($location.$$url.indexOf("/albums") > -1) {
		        if ($location.$$url.indexOf("new") > -1) {
		            $scope.album = {};
		        } else if ($location.$$url.indexOf("edit") > -1) {
		            get($routeParams.albumId);
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
		AlbumRepository.query(null, function(result) {
    		$scope.dataProvider = result;
    	});
    }

    function get(albumId) {
    	AlbumRepository.get({id: albumId}, function(result) {
    		$scope.album = result;
    		$scope.pageTitle = "Editing Album " + result.name;
    	});
    }



};
