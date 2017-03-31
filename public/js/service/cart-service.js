app.service('cartService',['store', function(store){
	
	var service = this;
	
	service.addProduct = function(data){


		service.cartData.push(data);
		service._updateCart();
	};

	service._updateCart = function(){
		store.remove('cartData');
		store.set('cartData', service.cartData);
	};

	service._initCartData = function(){
		service.cartData = store.get('cartData') || [];
	};

	service.emptyCart = function(){
		store.remove('cartData');
		service._initCartData();
	};

	service.removeProduct = function(orderId){

		for (var i = 0; i < service.cartData.length; i++) {
			
			if(service.cartData[i].orderId == orderId){
				
				// removing product from the array
				service.cartData.splice(i, 1);
				service._updateCart();
				break;
			} 
		}
	};

	service.getProductCount = function(){

		return service.cartData.length ? service.cartData.length : 0;
	};


	service.getTotalAmount = function() {

		return service.getTotal('Amount');
	}

	service.getTotalDiscount = function() {
		
		return service.getTotal('Discount');
	}

	service.getNetTotal = function() {
		
		return service.getTotal('amountToBePaid');
	}

	
	service.getTotal = function(key){
		
		var total = 0;
		
		for (var i = 0; i < service.cartData.length; i++) {
			total += service.cartData[i][key];
		}

		return total;
	}
	
	service.getCartData = function(){
		return service.cartData;
	};

	service.getOrderIdList = function(){
		var orderIdList = [];

		for (var i = 0; i < service.cartData.length; i++) {
			orderIdList.push(service.cartData[i].orderId);
		}

		return orderIdList;
	};

	service._initCartData();
}]);