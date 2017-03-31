

app.controller('myProfileController',['$http', 'authService',function($http, authService){
	var profile = this;



	profile.message = "this is profile section and it is working";

	var url = "http://printkaari.com:8080/printkaari-api/customers/profile";
	
	$http.get(url, {headers:{'Authorization' : 'Bearer '+ authService.getAccessToken()}})
		.then(function(res){
			profile.customerDetail = res.data;
		});
}]); 