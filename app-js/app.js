var APP_NAME = "poc-persistenceJS";

var MODULES = [
				//declare here your services/directives components
                        "album-repository",
                        "artist-repository",
				"track-repository",
                        "ui.component"
			  ]; 

var TEMPLATE_DIR = "templates/";


/**
* App initialization
*
*/
var pocPersistenceJS = angular.module(APP_NAME, MODULES)
	.config(function ($routeProvider) {

	    $routeProvider
            .when('/', { controller: IndexCtrl, templateUrl: TEMPLATE_DIR + 'main/login.html' })
            // .when('/offline', { controller: OfflineCtrl, templateUrl: TEMPLATE_DIR + 'offline/list.html' })
            
            .when('/offline/artists/', { controller: ArtistCtrl, templateUrl: TEMPLATE_DIR + 'artists/list.html' })
            .when('/offline/artists/new', { controller: ArtistCtrl, templateUrl: TEMPLATE_DIR + 'artists/form.html' })
            .when('/offline/artists/:artistId/edit', { controller: ArtistCtrl, templateUrl: TEMPLATE_DIR + 'artists/form.html' })
            
            .when('/offline/albums/', { controller: AlbumCtrl, templateUrl: TEMPLATE_DIR + 'albums/list.html' })
            .when('/offline/albums/new', { controller: AlbumCtrl, templateUrl: TEMPLATE_DIR + 'albums/form.html' })
            .when('/offline/albums/:albumId/edit', { controller: AlbumCtrl, templateUrl: TEMPLATE_DIR + 'albums/form.html' })
            
            .when('/offline/tracks/', { controller: TrackCtrl, templateUrl: TEMPLATE_DIR + 'tracks/list.html' })
            .when('/offline/tracks/new', { controller: TrackCtrl, templateUrl: TEMPLATE_DIR + 'tracks/form.html' })
            .when('/offline/tracks/:trackId/edit', { controller: TrackCtrl, templateUrl: TEMPLATE_DIR + 'tracks/form.html' })
	});
