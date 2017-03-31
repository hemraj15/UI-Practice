/**
 * @author Kamlesh Uikey
 *
 * This file contain xhr request required for making auth related work
 */

app.factory('paymentFactory', ['$http', function($http){
	var paymentFactory = {},
	baseUrl = 'http://162.220.61.86:8080/printkaari-api/payment/',
	config = {};

	
	paymentFactory.updateTransaction = function(params){
		return $http.post(baseUrl + 'trxComplete/', params);
	}

	paymentFactory.initiateTransaction = function(params){
		return $http.post(baseUrl + 'cartTrxInitiate/', params);
	}
	
	return paymentFactory;
}]);