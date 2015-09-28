app.factory('countryService', [
	'$http',
	'$q',
	function ($http, $q) {
		var geoUsername = 'thinkfulusertest';
		return {
			getCountryInfoByCountryCode: function (countriesInfo, countryCode) {
				var returnVal;
				var promises = [];
				angular.forEach(countriesInfo, function (value, key) {
					if (value.countryCode === countryCode) {
						returnVal = value;
					}
				});
				promises.push(this.getNeighboursByCountryCode(countryCode));
				promises.push(this.getCapitalInfoByCountryInfo(returnVal));
				return $q.all(promises).then(function (resolves) {
					// resolves = [neighbours, capitalInfo]
					returnVal.neighbours = resolves[0];
					angular.forEach(resolves[1], function (value, key) {
						if (value.fcl === 'P') {
							returnVal.capitalInfo = value;
						}
					});
					return $q.when(returnVal);
				}, function () {
					return $q.when(returnVal);
				});
			},
			getNeighboursByCountryCode: function (countryCode) {
				return $http({
					method: 'GET',
					url: 'http://api.geonames.org/neighboursJSON',
					params: {
						country: countryCode,
						username: geoUsername
					}
				}).then(function (ret) {
					return $q.when(ret.data.geonames);
				}, function () {
					return $q.when([]);
				});
			},
			getCapitalInfoByCountryInfo: function (countryInfo) {
				return $http({
					method: 'GET',
					url: 'http://api.geonames.org/searchJSON',
					params: {
						country: countryInfo.countryCode,
						username: geoUsername,
						name: countryInfo.capital,
						name_equals: countryInfo.capital,
						isNameRequired: true
					}
				}).then(function (ret) {
					return $q.when(ret.data.geonames);
				}, function () {
					return $q.when([]);
				});
			}
		};
	}
]);