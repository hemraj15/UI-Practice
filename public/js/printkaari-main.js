var app = angular.module('printkaariApp',["ngRoute", "angular-storage"]);


app.controller('mainController',['$http', function($http){
	var main = this;
}]);


app.directive('pageHeader', function(){
	return {
		templateUrl: '/partials/header.html',
		controller: 'navTabController',
		controllerAs: 'navCtl'
	}
});


app.directive('pageFooter', function(){
	return {
		templateUrl: '/partials/footer.html'
	}
});

// to support input[file] data-binding
app.directive('fileInput', function(){
	return {
		scope : {
			file : '='
		},
		link : function(scope, element){

			element.bind('change', function(event){
				scope.file = event.target.files[0];
				scope.$apply(scope.file);
			});
		}
	}
});
