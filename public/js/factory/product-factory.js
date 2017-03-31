

app.factory('productFactory',['$http', function($http){
	var productFactory = {};

	productFactory.getProduct = function(category, product){
		return $http.get('/js/jsonData/productCategory.json');
	};

	productFactory.getCategory = function(category){

	};

	return productFactory;
}]);