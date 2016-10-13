// Your HTML should be like this
//
//.slider-viewport
//  .slides-container
//    .slides
//			.slider-back
//			.slider-forward

;(function($) {

	$.fn.slider = function( options ) {

		// Establish our default settings
		var settings = $.extend({
			sliderViewport: 780,
      isResponsive: null,
      playPerSecond: null,
      doItAfterEachSlide: null
		}, options);

    var slider = {
      currentSlide: 0,
      totalSlides: 0,

      setUp: function(isResponsive){
        // If you want reponsive slider
        var viewportWidth, containerWidth, totalSlides;

        slider.totalSlides = $('.slides').length;

        if(isResponsive){
          viewportWidth = $(window).width();
					settings.sliderViewport = viewportWidth;
          containerWidth = slider.totalSlides * viewportWidth;
        }else{
          viewportWidth = settings.sliderViewport;
          containerWidth = slider.totalSlides * settings.sliderViewport;
        }
				$('.slides').css('width', viewportWidth+'px');
        $('.slider-viewport').css('width', viewportWidth+'px');
        $('.slides-container').css('width', containerWidth+'px');
        $('.slider-back').click(function() { slider.slide('back'); });
        $('.slider-forward').click(function() { slider.slide('forward'); });
      },

      slide: function(direction){
        // this will determine the direction and call slide(num)
        if(direction == 'back'){
          if(slider.currentSlide == 0){
            slider.currentSlide = slider.totalSlides-1;
            slider.slideIt(slider.currentSlide);
          }else{
            slider.currentSlide--;
            slider.slideIt(slider.currentSlide);
          }
        };

        if(direction == 'forward'){
          if(slider.currentSlide == slider.totalSlides-1){
            slider.currentSlide = 0;
            slider.slideIt(slider.currentSlide);
          }else{
            slider.currentSlide++;
            slider.slideIt(slider.currentSlide);
          }
        }
      },

      slideIt: function(index){
        slider.currentSlide = index;
        var position = '-' + index*settings.sliderViewport +'px';
        $('.slides-container').css('left',position);
				// Callback
				if ( $.isFunction( settings.doItAfterEachSlide ) ) {
					settings.doItAfterEachSlide.call(this,index);
				}
      },

      playPerSecond: function(num){
        setInterval(function(){
          slider.slide('forward');
        },num)
      },

      init: function(){
        if(settings.isResponsive == true){
          slider.setUp(true);
          $(window).resize(function(){
						settings.sliderViewport = $(window).width();
						var containerWidth = $('.slides').length * settings.sliderViewport;
						$('.slider-viewport').css('width', settings.sliderViewport+'px');
						$('.slides').css('width', settings.sliderViewport+'px');
		        $('.slides-container').css('width', containerWidth+'px');
						slider.slideIt(slider.currentSlide);
					});
        }else{
          slider.setUp(false);
        }
        if(settings.playPerSecond){
          slider.playPerSecond(settings.playPerSecond);
        }
      }
    }

    slider.init();
		return {
      goTo: slider.slideIt
    };

	};

}(jQuery));


// http://codepen.io/stanleyyylau/pen/QKxEpR
// How to use
