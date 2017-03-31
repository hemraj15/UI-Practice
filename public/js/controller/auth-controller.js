app.controller('authController',['$scope', '$http', '$window', '$route','$routeParams','authService','$location', 'locationFactory', 'authFactory', '$rootScope', function($scope,$http,$window, $route,$routeParams,authService,$location,locationFactory, authFactory, $rootScope){
    
	$scope.errorMessage = "";
	$scope.loginBox = false;
	$scope.signupBoxStepOne = false;
	$scope.signupBoxStepTwo = false;
	$scope.resetPasswordBox = false;
	$scope.forgetPasswordBox = false;
	$scope.resetPasswordSuccessBox = false;
	
	
	// var  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
    // var zipCodeRegex = new RegExp("^[1-9][0-9]{4,5;
    // var expRegex = new RegExp("^[0-9]{1,10}$");
    // var currencyRegex = new RegExp("^[a-zA-Z]*$");
    // var urlRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;
    // var docRegex = new RegExp("(.?)\.(docx|doc)$");
    
    var action = $routeParams.action,
    token = $routeParams.token;
    if(action === 'login'){
    	
    	$scope.loginBox = true;
    }else if(action === 'signup' && angular.isUndefined(token)){

    	$scope.signupBoxStepOne = true;
    }else if(action === 'signup' && angular.isString(token)){

    	$scope.signupBoxStepTwo = true;
    }else if(action === 'resetpassword' && angular.isString(token)){

    	$scope.resetPasswordBox = true;
    }else{

    	$window.alert('Bad URL, redirecting to home page');
    	$location.path('/');
    }


	$scope.doLogin = function(){
		
		var params = {      
			"username": $scope.username,
			"password": $scope.password
		};

		authFactory.login(params)
			.then(function(response){
		
				var loggedinUser=response.data;
				authService.setAuthData(loggedinUser);

				// to update navbar when ever as success login happen
				$rootScope.$emit('login', loggedinUser);

				if (loggedinUser.userType ==="CUSTOMER") {
		
					console.log(response.data.full_name);
					$location.path('/custDashboard');
				} else {
		
					$location.path('/admin');
				}

			}, function(error){

				console.log(error);	
	            $scope.errorMessage = error.data.errorCode;		
				console.log($scope.errorMessage);
	            $window.alert(error.data.errorCode);		
			});
	}

	$scope.SignUpIntiate = function(){
		var params = {
			"firstName" : $scope.firstName,
			"lastName"  : $scope.lastName,
			"email"     : $scope.email,
			"password"  : $scope.password,
			//"userType"  : $scope.userType,
			"userType" : "CUSTOMER"
		};
				
		authFactory.intiateSignUp(params)
			.then(function(response){
				$scope.step1Data=response.data;
				$scope.emailToken=$scope.step1Data.emailToken;
				$scope.signupBoxStepOne=false;
				$scope.signupBoxStepTwo=true;

				console.log(response);
				console.log($scope.step1Data.emailToken);

			}, function(error){
				console.log(error);	
				$window.alert(error.data.errorCode);			
				//$scope.error = error.status;	
				return false;			 
			});
	}	

	$scope.SignUpFinal = function(){	
		var params = {
			"emailToken"	: $scope.emailToken,
			"contactNo"		: $scope.contactNo,
			"countryId"		: $scope.country.id,
			"stateId"		: $scope.state.id,
			"cityId"		: $scope.city.id,
			"zipCode"		: $scope.zipCode,
			//"userType"		: $scope.userType,
			"houseNo"		: $scope.houseNo,
			"street"		: $scope.street,
			"landMark"		: $scope.landMark,
			"area"			: $scope.area
		};
		
		authFactory.completeSignUp(params)
			.then(function(response){
				$scope.User=response.data;
				authService.setLoginData($scope.User);
				$scope.emailToken='';
				
				if ($scope.User.userType === 'CUSTOMER') {
					
					$location.path('/custDashboard');
					$window.location.reload();
				} else {
					
					$location.path('/admin');
					//$route.reload();
					$window.location.reload();
				}

				console.log(response);		
			}, function(error){

				console.log(error);
	            $window.alert(error.data.errorCode);
	            return false;			
			});
					
	}
	
	$scope.transformRequestForFormEncoded = function(obj) {
		var str = [];
		
		for (var p in obj){
			str.push(encodeURIComponent( p ) + "=" + encodeURIComponent(obj[p]));
		}
		
		return str.join("&");    
    }
	
	$scope.getCountryList=function(){

		locationFactory.getCountryList()
			.then(function(response){
				$scope.countryList = response.data; 
			});
		
		var onSuccess = function(response){
			$scope.countryList=response.data;
			console.log(response);
			console.log($routeParams);

			if($routeParams.tokenId !== undefined ){
				console.log("token Id is not undefined");
				$scope.emailToken=$routeParams.tokenId;
				$scope.loginBox = false;
				$scope.signupBoxStepTwo = true;
			}
			
			if($routeParams.tokenForPwd !== undefined ){
				console.log("tokenForPwd  is not undefined");
				$scope.passwordToken=$routeParams.tokenForPwd;
				$scope.loginBox = false;
				$scope.resetPasswordBox = true;
			}
		};
	}
	
	$scope.getStateListByCountryId = function(){
	
		locationFactory.getStateListByCountryId($scope.country.id)
			.then(function(response){
				$scope.stateList = response.data;
				console.log(response.data);
			});
	}

	$scope.getCityListByStateId=function(){

		locationFactory.getCityListByStateId($scope.state.id)
			.then(function(response){
				$scope.cityList = response.data;
			});
	}
	
	//Forgot and Reset Password	
	$scope.ForgotPassword=function(){
		
		authFactory.forgetPassword($scope.email)
			.then(function(response){
				
		        $scope.forogtPasswordData=response.data;
				$scope.emailToken=$scope.forogtPasswordData.emailToken;
				$scope.forgetPasswordBox = false;
				$scope.resetPasswordBox=true;
			}, function(error){
				
				console.log(error);
	             //alert(error.message);
	            $window.alert(error.data.errorCode);
	            return false;			
			});
	}
	
	//Reset password
	$scope.ResetPassword = function(){
		
		var emailTokenId="";
		
		if($scope.passwordToken !== undefined){
			emailTokenId=$scope.passwordToken;			
		}
		else{
			emailTokenId=$scope.emailToken ;
		}
	    
	    var params = {                        
            "newPassword": $scope.newPassword,
			"confirmPassword":$scope.confirmPwd,
			"emailToken":emailTokenId
        }; 
				
		if(angular.equals($scope.newPassword, $scope.confirmPwd)){
			
			authFactory.resetPassword(params)
				.then(function(response){
					
				    $scope.message=response.data;
					emailTokenId='';
					$scope.resetPasswordBox=false;				
					$scope.resetPasswordSuccessBox=true;
						
				     console.log(response);
			}, function(error){
				
				//alert(error.message);
				$window.alert(error.data.errorCode);
				console.log(error);
	            return false;			
			});
		}
		else{
			$window.alert("New Password and Confirm Password are different");
		}
	}
	
	
	$scope.analyzeEmailId = function(email){
		var  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
		    $scope.isEmailIdvalid = "";
			if(angular.isDefined(email) && !reg.test(email)){
			  $scope.isEmailIdvalid = "Enter Valid Email Id";
			}
			else if(!angular.isDefined(email) || email === "" || email === null){
			  $scope.isEmailIdvalid = "Email Id is required";
			}
			else {
			$scope.isEmailIdvalid = "";
			}
	}	
	$scope.analayzePassword=function(pwd){
				//var reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{5,15}$/;
				var pwdReg=/^.{5,15}$/;
				$scope.isPasswordValid = "";
				
				//$window.alert(pwd.length);
			if(angular.isDefined(pwd) && !pwdReg.test(pwd)){
			   $scope.isPasswordValid = "Enter Valid Password of length between 5 to 15";
			}
			else if(!angular.isDefined(pwd) || pwd === "" || pwd === null ){
			  $scope.isPasswordValid = "Password is required  ";
			}
			else {
			$scope.isPasswordValid = "";
			}
				
	}
	
	$scope.isFieldValid=function(fieldStr){
		
		  $scope.isFieldStrValid="";
		  if(!angular.isDefined(fieldStr)|| fieldStr ==="" || fieldStr ===null){
			  
			 $scope.isFieldStrValid="This Field is Required"; 
		  }
	}

}]);
