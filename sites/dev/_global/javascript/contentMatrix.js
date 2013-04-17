/*!
* contentMatrix v1.0.0 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/

// use AMD or browser globals to create a jQuery plugin.
;(function (factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }

}(function ($) {

  'use strict';

  // defaults
  var pluginName = 'contentMatrix';
  var defaults = {
    effectType: 'hover', // hover, expand
    effectSpeed: 500 // the speed at which the effect transitions
  };

  // plugin constructor
  var Plugin = function (element, options) {
    this.el = element;
    this.options = $.extend({}, defaults, options);
    this.effects = {
      'hover': 'hoverEffect',
      'expand': 'expandEffect'
    };
    this.init();
  };

  Plugin.prototype = {

    init: function() {

      this.$el = $(this.el);
      this.blocks = this.$el.children('.contentBlock'); // contentMatrix component dom container
      var self = this;

      this.blocks.on({

        mouseenter: function (e) {
          self[self.effects[self.options.effectType]]('on', e.target);
        },

        mouseleave: function () {
          self[self.effects[self.options.effectType]]('off');
        }

      });

    },

    hoverEffect: function (state, target) {

      var self = $(target).parents('.contentBlock'),
          opacity = (state === 'on') ? 0.75 : 1;

      // select all the divs except the one that's being moused-over and fade them by 25%
      this.blocks.not(self).stop().fadeTo(this.options.effectSpeed, opacity);

    },

    expandEffect: function (state, target) {

      // @todo: NONE OF THIS WORKS

      if (state === 'on') {

        this.self = $(target).parents('.contentBlock'),
        this.selfPosition = this.self.position(),
        this.selfWidth = this.self.width(),
        this.selfHeight = this.self.height(),
        this.container = this.$el,
        this.containerPosition = this.container.position();

        this.self.css({
          'z-index': 1,
          'position': 'absolute',
          'float': 'none',
          'width': this.container.width(),
          'height': this.container.height(),
          'top': 0,
          'left': 0
        });

      } else {

        this.self.css({
          'z-index': 0,
          'position': 'relative',
          'float': 'left',
          'width': this.selfWidth,
          'height': this.selfHeight,
          'top': this.selfPosition.top,
          'left': this.selfPosition.left
        });

      }

    }

  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new Plugin( this, options ));
      }
    });
  };

}));