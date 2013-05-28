var APP_NAME = "poc-persistenceJS";

var MODULES = [
				//declare here your services/directives components
				"albums", "mariojunior.ui"
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
            .when('/online', { controller: OnlineCtrl, templateUrl: TEMPLATE_DIR + 'online/list.html' })
            .when('/offline', { controller: OfflineCtrl, templateUrl: TEMPLATE_DIR + 'offline/list.html' })
            .when('/offline/:albumId/rating', { controller: OfflineCtrl, templateUrl: TEMPLATE_DIR + 'offline/rating.html' })
	});
