var app = angular.module('app', [
	'ngRoute',
	'ngAnimate'
])
.config([
	'$routeProvider', 
	'$locationProvider',
	function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
		.when('/', {
			templateUrl: 'scripts/templates/home.html',
			controller: function () {},
			resolve: {}
		})
		.when('/countries', {
			templateUrl: 'scripts/templates/countries.html',
			controller: 'countriesController',
			resolve: {}
		})
		.when('/country/:countryCode', {
			templateUrl: 'scripts/templates/country.html',
			controller: 'countryController',
			resolve: {}
		})
		.otherwise('/');
	}
]);


//<img src="http://www.geonames.org/flags/x/??.gif" />
//<img id='myImage' src="http://www.geonames.org/img/country/250/??.png" />

//http://api.geonames.org/countryInfoJSON?username=demo
//http://api.geonames.org/neighbours?geonameId=2658434&username=demo 
//api.geonames.org/search?q=