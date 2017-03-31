app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/', {templateUrl: 'partials/welcome-page.html',   controller: 'welcomePageController'})
		.when('/auth/:action', {templateUrl: 'partials/auth.html',   controller: 'authController'})
		.when('/auth/:action/token/:token', {templateUrl: 'partials/auth.html',   controller: 'authController'})
		.when('/custDashboard' ,{templateUrl: 'partials/custDashboard.html',   controller: 'dashboardController'})
		.when('/myprofile' ,{templateUrl: 'partials/my-profile.html',   controller: 'myProfileController', controllerAs: 'myProfile'})
		.when('/myorder' ,{templateUrl: 'partials/my-order.html',   controller: 'myOrderController', controllerAs: 'myOrder'})
		.when('/admin' ,{templateUrl: 'partials/empDashboard.html',   controller: 'dashboardController'})
		.when('/product/college' ,{templateUrl: 'partials/college-minor.html',   controller: 'productController', controllerAs: 'product'})
		.when('/category/:categoryIdentifier' ,{templateUrl: 'partials/category.html',   controller: 'categoryController', controllerAs: 'category'})
		.when('/category/:categoryIdentifier/product/:productIdentifier' ,{templateUrl: 'partials/product.html',   controller: 'categoryProductController', controllerAs: 'cpCtl'})
		.when('/cart' ,{templateUrl: 'partials/cart.html',   controller: 'cartController', controllerAs: 'cart'})
		.when('/payment/:action', {templateUrl: 'partials/paymentMsg.html', controller: 'afterPaymentController', controllerAs: 'afterpayment'})
		.otherwise({redirectTo: '/' });
	
}]);