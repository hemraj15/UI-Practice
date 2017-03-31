

app.controller('myOrderController', ['$http', 'authService',function($http, authService){
	var order = this;

	var customerId = 8,
	url = "http://printkaari.com:8080/printkaari-api/customers/my-orders";
	
	$http.get(url, {headers:{'Authorization' : 'Bearer '+ authService.getAccessToken()}})
		.then(function(res){
			order.orderDetails = res.data;
		});
}]);