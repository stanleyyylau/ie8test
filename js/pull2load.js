'use strict';

var BUTTON = '<button class="am-pull2load">下条更精彩，点击加载</button>';

function Pull2Load(callback, opt) {
  this.init();
  this._buildParams(opt);
  this._buildEvents(callback);
};

Pull2Load.prototype = {
  init: function() {
    this.TRIGGER = 1;
  },

  _buildParams: function(opt) {
    var self = this;

    if (opt == undefined || opt == null) {
      opt = {};
    }
  
    //设定参数初值，无参数则给定默认参数
    function setParams(k, v){
      var gaven = opt[k];
      self[k] = (v === undefined || v === null) ? v: gaven;
    }

    $.each({
        "loadbutton":       false,
        "container":        '',
        "prerender":        0,  //预先加载
        "buttonTemplate": BUTTON,
      }, setParams);
  },

  _buildEvents: function(callback) {
    if (this['loadbutton'] && this['container']) {
      $(this['container']).append(this.buttonTemplate);
      callback();
    }else {
      var _self = this;
      $(window).on('scroll', (function() {
        var scrollPos = $(window).scrollTop();
        var totalHeight = parseFloat($(window).height()) + parseFloat(scrollPos) + _self['prerender'];
        if((($(document).height()) <= totalHeight) && (_self.TRIGGER === 1)) {
          callback();
        }
      }));
    }
  },
  
  pause: function() {
    this.TRIGGER = 0; 
  },

  run: function() {
    this.TRIGGER = 1; 
  },

  stop: function() {
    $(window).off('scroll');
  },
};

