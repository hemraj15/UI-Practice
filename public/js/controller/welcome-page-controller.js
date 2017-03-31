app.controller('welcomePageController', ['$http', function($http){
	var wc = this;

	wc.init = function(){




			/* ========================================================================= */
			/*	Menu item highlighting
			/* ========================================================================= */

			angular.element('ul.nav li.dropdown').hover(function() {
			  angular.element(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
			}, function() {
			  angular.element(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
			});
			
		    angular.element(window).scroll(function () {
		        if (angular.element(window).scrollTop() > 400) {
		            angular.element(".navbar-brand a").css("color","#fff");
		            angular.element("#navigation").removeClass("animated-header");
		        } else {
		            angular.element(".navbar-brand a").css("color","#fff");
		            angular.element("#navigation").addClass("animated-header");
		        }
		    });
			
		/* ========================================================================= */
		/*	Fix Slider Height
		/* ========================================================================= */	

	    // Slider Height
	    var slideHeight = angular.element(window).height();
	    
	    angular.element('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);

	    angular.element(window).resize(function(){'use strict',
	        angular.element('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);
	    });
		
		
		
		angular.element("#works, #testimonial").owlCarousel({	 
			navigation : true,
			pagination : false,
			slideSpeed : 700,
			paginationSpeed : 400,
			singleItem:true,
			navigationText: ["<i class='fa fa-angle-left fa-lg'></i>","<i class='fa fa-angle-right fa-lg'></i>"]
		});
		
	
		/* ========================================================================= */
		/*	Featured Project Lightbox
		/* ========================================================================= */

		angular.element(".fancybox").fancybox({
			padding: 0,

			openEffect : 'elastic',
			openSpeed  : 650,

			closeEffect : 'elastic',
			closeSpeed  : 550,

			closeClick : true,
				
			beforeShow: function () {
				this.title = angular.element(this.element).attr('title');
				this.title = '<h3>' + this.title + '</h3>' + '<p>' + angular.element(this.element).parents('.portfolio-item').find('img').attr('alt') + '</p>';
			},
			
			helpers : {
				title : { 
					type: 'inside' 
				},
				overlay : {
					css : {
						'background' : 'rgba(0,0,0,0.8)'
					}
				}
			}
		});
	

		var wow = new WOW ({
			offset:       75,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
		});
		wow.init();
	}
}]);

// taking google annotation function which will never execute 
(function(){

	// When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);

	function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

	    var myLatLng = new google.maps.LatLng(22.402789, 91.822156);

	    var mapOptions = {
	        zoom: 15,
	        center: myLatLng,
	        disableDefaultUI: true,
	        scrollwheel: false,
	        navigationControl: true,
	        mapTypeControl: false,
	        scaleControl: false,
	        draggable: true,

	        // How you would like to style the map. 
	        // This is where you would paste any style found on Snazzy Maps.
	        styles: [{
	            featureType: 'water',
	            stylers: [{
	                color: '#46bcec'
	            }, {
	                visibility: 'on'
	            }]
	        }, {
	            featureType: 'landscape',
	            stylers: [{
	                color: '#f2f2f2'
	            }]
	        }, {
	            featureType: 'road',
	            stylers: [{
	                saturation: -100
	            }, {
	                lightness: 45
	            }]
	        }, {
	            featureType: 'road.highway',
	            stylers: [{
	                visibility: 'simplified'
	            }]
	        }, {
	            featureType: 'road.arterial',
	            elementType: 'labels.icon',
	            stylers: [{
	                visibility: 'off'
	            }]
	        }, {
	            featureType: 'administrative',
	            elementType: 'labels.text.fill',
	            stylers: [{
	                color: '#444444'
	            }]
	        }, {
	            featureType: 'transit',
	            stylers: [{
	                visibility: 'off'
	            }]
	        }, {
	            featureType: 'poi',
	            stylers: [{
	                visibility: 'off'
	            }]
	        }]
	    };
	}

	var mapElement = document.getElementById('map-canvas');

	var map = new google.maps.Map(mapElement, mapOptions);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(22.402789, 91.822156),
		map: map,
		icon: 'img/icons/map-marker.png',
	});
});