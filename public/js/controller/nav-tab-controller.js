app.controller('navTabController',['$window','$location','authService', 'cartService', '$rootScope', function($window,$location,authService,cartService,$rootScope){
	    
	var navCtl = this;
	navCtl.isLogin = false;
    navCtl.cart = null;
    /*
    While page load this init function check for tokens, if exists then it will display the profile
     */
    navCtl.init = function(){
		var data = authService.getAuthData();
		var noOfProduct = cartService.getProductCount();
		noOfProduct = noOfProduct || null;

		if(data){
			navCtl.isLogin=true;
			navCtl.loginData = data;
		}

		navCtl.noOfProduct = noOfProduct;
	}
	
	/*
	 logout function should not concern with user activity,
	 it enchance user xp
	 */
	navCtl.logout=function(){		
		
		authService.clearAuthData();
		$window.alert("You have logged out success fully redirect to Home");
		navCtl.isLogin = false;
		navCtl.loginData = {};
        $window.location.reload();		
	}

	/*
	To update nav-bar whenever login happen 
	 */
	$rootScope.$on('login', function(event, data){
		navCtl.init();
	});
   	

   	/*
   	To update num of product to be diplayed for numver of cart
   	 */
   	$rootScope.$on('updateCart', function(event, data){
   		navCtl.init();
   	});
	this.init();
}]);

