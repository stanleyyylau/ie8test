// API for testing message sending : https://st-portfolio-on.herokuapp.com/message

var app = (function(){
  // Let's handle slider here
  var slider = {
      const: {
        $controlBtns: $('.status-bar li'),
        activeClassName: 'immigrate_control_btn_active',
        $sliderViewPort: $('.slider-viewport')
      },

      makeActive: function(index){
        slider.const.$controlBtns.removeClass(slider.const.activeClassName);
        slider.const.$controlBtns.eq(index).addClass(slider.const.activeClassName)
      },

      goTo: null,

      whenBtnIsClicked: function(){
        var str = $(this).html();
        var number = Number(str);
        number = number - 1;
        slider.goTo(number);
      },

      bindEvent: function(){
        slider.const.$controlBtns.on('click', slider.whenBtnIsClicked);
        slider.goTo = slider.const.$sliderViewPort.slider({
          doItAfterEachSlide: function(index){
            slider.makeActive(index);
          }
        }).goTo;
      }
  }

  // Let's handle form here
  var sendMessage = {
    message: '',
    url: "https://st-portfolio-on.herokuapp.com/message",

    sendToServer: function(d){
      $.ajax({
        url: sendMessage.url,
        method: 'POST',
        data: {message: sendMessage.message},
        success: function(data){
          if(data.status === 200){
             d.close();
            dialog({
                content: '发送成功',
                ok: function () {},
                cancel: false
            }).show();


          }else{
            d.close();
            dialog({
                content: '发送失败',
                ok: function () {},
                cancel: false
            }).show();

          }
        },
        error: function(){
          d.close();
            dialog({
                content: '网络出错',
                ok: function () {},
                cancel: false
              }).show();

        }
      });
    },

    onSubmitClick: function(e){
      event.preventDefault();
       message = $( this ).serialize();
      sendMessage.d = dialog({
          title: '确定',
          content: '是否确认提交申请?',
          okValue: '确定',
          ok: function () {
              sendMessage.sendToServer(sendMessage.d);
              this.title('提交中…');
              return false;
          },
          cancelValue: '取消',
          cancel: function () {}
      });
      sendMessage.d.show();
    },

    bindEvent: function(){
      $( "form" ).on( "submit", sendMessage.onSubmitClick )
    }
  }

  // Let's handle other stuff
  var temp = {
    handlerIn: function(){
      $(this).toggleClass('related_material_on_hover_01');
    },
    handlerOut: function(){
      $(this).toggleClass('related_material_on_hover_01');
    },
    bindEvent: function(){
      $('.related-item').mouseenter(temp.handlerIn).mouseleave(temp.handlerOut);
      $('.enroll-now').on('click',function(){
        $('.assistance').scrollView();
      });
      $('.to-top').backToTop();
    }
  }

  // Edit init when new stuff are added
  var init = function(){
    temp.bindEvent();
    slider.bindEvent();
    sendMessage.bindEvent();
  }

  init();
  // API for other developer to use
  return {
    sliderGoTo: slider.goTo,
    backEndUrl: sendMessage.url
  }
}
)();
