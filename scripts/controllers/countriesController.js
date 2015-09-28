app.controller('countriesController', [
	'$scope',
	'$location',
	'countriesService',
	'$filter',
	function($scope, $location, countriesService, $filter) {
		$scope.countries = [];

		countriesService.getCountriesInfo().then(function (data) {
			angular.forEach(data.geonames, function (value, key) {
				var row = [
					value.countryName,
					value.countryCode,
					value.capital,
					$filter('number')(value.areaInSqKm),
					$filter('number')(value.population),
					value.continent
				];
				$scope.countries.push(row);
			})
		});

		$scope.selectCountry = function (countryCode) {
			$location.path('/country/' + countryCode);
		}

		$scope.numberMatching = new RegExp(/^\d*\.?\d+$/);
	}
]);