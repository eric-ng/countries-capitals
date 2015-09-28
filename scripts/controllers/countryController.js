app.controller('countryController', [
	'$scope',
	'$routeParams',
	'countriesService',
	'countryService',
	'$filter',
	function($scope, $routeParams, countriesService, countryService, $filter) {
		$scope.country;
		$scope.neighbours = [];
		$scope.loading = true;

		countriesService.getCountriesInfo().then(function (data) {
			countryService.getCountryInfoByCountryCode(data.geonames, $routeParams.countryCode).then(function (returnVal) {
				$scope.loading = false;
				if (angular.isDefined(returnVal)) {
					$scope.country = returnVal;
					$scope.neighbours = returnVal.neighbours;
					$scope.country.map = 'http://www.geonames.org/img/country/250/' + $routeParams.countryCode.toUpperCase() + '.png';
					$scope.country.flag = 'http://www.geonames.org/flags/x/' + $routeParams.countryCode.toLowerCase() + '.gif';
				}
			});
		});

		$scope.numberMatching = new RegExp(/^\d*\.?\d+$/);
	}
]);