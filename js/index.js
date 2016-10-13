// Plugin @RokoCB :: Return the visible amount of px
// of any element currently in viewport.
// stackoverflow.com/questions/24768795/
;(function($, win) {
  $.fn.inViewport = function(cb) {
     return this.each(function(i,el){
       function visPx(){
         var H = $(this).height(),
             r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
         return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
       } visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}(jQuery, window));


var app = {
  $DOM: {
    bwItem: $('.bw-item'),
    joinUsBtn: $('.section.join a'),
    videoPopup: $('.video-popup'),
    videoPopupLayer: $('.pop-up-layer'),
    videoContainer: $('.video-container'),
    videoPlayBox: $('.video-play-box'),
    sliderViewport: $('.slider-viewport')
  },

  showVideoPopUp: function(){
    console.log('clicking show video')
    app.$DOM.videoPopup.show();
    app.$DOM.videoPopupLayer.show();
    app.$DOM.videoPlayBox.show(400);
  },

  hideVideoPopUp: function(){
    app.$DOM.videoPopup.hide();
    app.$DOM.videoPopupLayer.hide();
    app.$DOM.videoPlayBox.hide();
  },

  fadeInWhenVis: function(vis){
    if(vis) $(this).addClass("fadeInUp");
  },

  bounceInWhenVis: function(vis){
    if(vis) $(this).addClass("bounceIn");
  },

  bindEvent: function(){
    app.$DOM.bwItem.inViewport(app.fadeInWhenVis);
    app.$DOM.joinUsBtn.inViewport(app.bounceInWhenVis);
    app.$DOM.videoContainer.on('click', app.showVideoPopUp);
    app.$DOM.videoPopupLayer.on('click', app.hideVideoPopUp);
  },

  init: function(){
    app.bindEvent();
    app.$DOM.sliderViewport.slider({isResponsive: true});
  }
}

app.init();
