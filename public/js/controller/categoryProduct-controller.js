

app.controller('categoryProductController',[ '$routeParams', 'productFactory', function($routeParams, productFactory){
	
	var cpCtl = this,
	category = $routeParams.categoryIdentifier.split(" ").join("").toLowerCase(),
	product = $routeParams.productIdentifier.split(" ").join("").toLowerCase();

	console.log($routeParams.categoryIdentifier);
	console.log($routeParams.productIdentifier);

	cpCtl.init = function(){
		
		productFactory.getProduct(category, product)
			.then(function(response){
				cpCtl.cpData = response.data;
				cpCtl.renderData();
				console.log(cpCtl.cpData);
			})
	};

	cpCtl.renderData = function(){
		var data = cpCtl.cpData[category][product];
		
		cpCtl.pageTitle = data.pageTitle;
		cpCtl.products = data.products;
		console.log(cpCtl.products);
	};

	cpCtl.init();
}]);