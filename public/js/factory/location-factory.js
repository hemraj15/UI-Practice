

app.factory('locationFactory', ['$http', function($http){
	var locationFactory = {};
	var baseUrl = "http://162.220.61.86:8080/printkaari-api/location/"


	locationFactory.getCountryList = function(){
		return $http.get(baseUrl + 'countries');
	}

	locationFactory.getStateListByCountryId = function(countryId){
		return $http.get(baseUrl + 'country/' + countryId + '/states');
	}

	locationFactory.getCityListByStateId = function(stateId){
		return $http.get(baseUrl + 'states/'+ stateId +'/cities')
	}

	return locationFactory;
}]);