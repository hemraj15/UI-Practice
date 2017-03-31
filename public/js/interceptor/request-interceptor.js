
 
app.factory('httpRequestInterceptor', ['authService', function (authService) {
	
	return {
		request: function (config) {

			console.log(config.url);
			var url = config.url.split('/');
			console.log(url[url.length - 1]);

			if(authService.getAccessToken() && config.method == 'POST'){
				config.headers['Authorization'] = 'Bearer ' + authService.getAccessToken();
			}
			// config.headers['Accept'] = 'application/json;odata=verbose';

			return config;
		}
	};
}]);

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('httpRequestInterceptor');
});