app.factory('countriesService', [
	'$http',
	'$q',
	function ($http, $q) {
		var geoUsername = 'thinkfulusertest';
		var countriesInfo;
		return {
			getCountriesInfo: function () {
				if (angular.isDefined(countriesInfo)) {
					return $q.when(countriesInfo);
				} else {
					return $http({
						method: 'GET',
						url: 'http://api.geonames.org/countryInfoJSON',
						params: {
							username: geoUsername
						}
					}).then(function (ret) {
						countriesInfo = ret.data;
						return $q.when(countriesInfo);
					}, function () {
						countriesInfo = [];
						return $q.when(countriesInfo);
					});
				}
			}
		};
	}
]);