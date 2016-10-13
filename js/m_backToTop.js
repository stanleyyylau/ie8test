;(function($){
    $.fn.backToTop = function(){
      $(this).click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
      return this;
    }
    $.fn.scrollView = function () {
      return this.each(function () {
          $('html, body').animate({
              scrollTop: $(this).offset().top
          }, 1000);
      });
      }
})(jQuery);
