/*!
* AddThisShare v1.0.5 (http://okize.github.com/)
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
  var pluginName = 'addThisShare';
  var defaults = {
    addThisApiVersion: '300', // 300, 250, 200, 150
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'], // email, linkedin, facebook, twitter, googleplus, addthis
    addThisCss: true, // set to false to disable addthis styles
    addThisButtonSize: 'small', // small, medium, large,
    addThisButtonOrientation: 'horizontal', // horizontal, vertical
    addThisButtonFollow: false, // enable to allow the buttons to 'follow' while scrolling
    addThisButtonFollowBoundary: '', // pass selector to override default bounds to follow functionality
    addThisTwitterTemplate: '{{title}} {{url}}', // template for twitter sharing
    googleAnalyticsId: false // include GA Account Id for tracking
  };

  // plugin constructor
  var Share = function (element, options) {
    this.element = element;
    this.$el = $(this.element); // featured Share component dom container
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.addThisButtonsContainer = {}; // will hold reference to jq object of buttons parent div
    this.addThisButtonsContainerHeight = null; // will hold the height of the buttons, which can't be determined until the buttons have loaded async
    this.addThisButtonFollowLimit = null; // will hold height of 'limit' where the buttons stop following as page scrolls
    this.addThisScript = '//s7.addthis.com/js/' + this.options.addThisApiVersion + '/addthis_widget.js'; // url of addthis script
    this.addThisConfiguration = {
      pubid: 'ra-4f0c7ed813520536', // change this to whatever profile should be used
      url: window.location.href,
      title: window.document.title,
      ui_use_css: this.options.addThisCss,
      domready: true,
      async: true,
      data_track_clickback: false,
      data_track_addressbar: false,
      data_ga_tracker: this.options.googleAnalyticsId,
      data_ga_social: true
    };
    this.init();
  };

  Share.prototype = {

    init: function() {

      var self = this;

      if (!this.isAddThisLoaded) {

        // callback fired after script loaded so should be safe to display
        this.loadAddthisScript( function () {
          if (self.isAddthisLoaded() === true && typeof window.addthis_config === 'undefined') {
            window.addthis_config = self.addThisConfiguration;
            window.addthis_share = { templates: { twitter: self.options.addThisTwitterTemplate }};
          }
          self.$el.append( self.buildAddthisHtml( self.options.addThisButtons ) );
          if (self.options.addThisButtonFollow) {
            self.initializeFollow();
          }

          self.addThisButtonsContainer.show();

        });

      }

      return this;

    },

    isAddthisLoaded: function () {

      // check for global addthis object
      // doesn't seem to be a public method for getting version loaded
      // otherwise there should be a check here to compare version loaded is
      // the same as the version requested in the plugin init
      if (typeof window.addthis === 'undefined') {
        return false;
      } else {
        return true;
      }

    },

    loadAddthisScript: function (callback) {

      // var self = this;

      // load addthis script
      // cache:true prevents it from being loaded multiple times in the event
      // of multiple instances of plugin being used on a page
      $.ajax({
        url: this.addThisScript,
        cache: true,
        dataType: 'script'
      }).done(function () {

        if (typeof callback !== 'undefined') {
          callback.call();
        }

      });

    },

    buildAddthisHtml: function (buttons) {

      // all possible services: http://www.addthis.com/services/list
      var servicesMap = {
          email: {
            className: 'addthis_button_email',
            title: 'Email A Friend'
          },
          linkedin: {
            className: 'addthis_button_linkedin',
            title: 'Share on LinkedIn'
          },
          facebook: {
            className: 'addthis_button_facebook',
            title: 'Share on Facebook'
          },
          twitter: {
            className: 'addthis_button_twitter',
            title: 'Share on Twitter'
          },
          googleplus: {
            className: 'addthis_button_google_plusone_share',
            title: 'Share on Google+'
          },
          addthis: {
            className: 'addthis_button_compact',
            title: 'Share with AddThis Services'
          }
      };

      // class names for various icon sizes from addthis
      var iconSizes = {
        small: 'addthis_default_style',
        medium: 'addthis_20x20_style',
        large: 'addthis_32x32_style'
      };

      // class names for different button orientations
      var buttonOrientation = {
        horizontal: 'addThisHorizontal',
        vertical: 'addThisVertical'
      };

      // creates the html for the buttons that addthis consumes and returns as icons
      var addThisButtonHtml = function (buttons) {
        var html = '';
        for (var i = 0, len = buttons.length; i < len; i++) {
          if (buttons[i] in servicesMap) {
            html += '<a class="' + servicesMap[ buttons[i] ].className + '" title="' + servicesMap[ buttons[i] ].title + '" href="#"></a>';
          }
        }
        return html;
      };

      // div that holds the buttons for addthis services
      var addThisButtonsContainer = $('<div>', {
        'class': 'socialShare-addThis ' + buttonOrientation[this.options.addThisButtonOrientation] + ' ' + iconSizes[this.options.addThisButtonSize],
        html: addThisButtonHtml( buttons )
      });

      this.addThisButtonsContainer = addThisButtonsContainer;

      return addThisButtonsContainer;

    },

    initializeFollow: function () {

      var buttons = this.addThisButtonsContainer,
          wrapOuter = $('<div>', {
            'class': 'socialShare-outer'
          }),
          wrapInner = $('<div>', {
            'class': 'socialShare-inner',
            width: this.$el.width()
          }),
          posConst = {
            cssTop: parseInt(buttons.css('top'), 10), // the original 'top' value set in the css
            offTop: parseInt(this.$el.offset().top, 10), // the top of the element that the buttons container would normally be in
            contentHeight: parseInt(this.$el.outerHeight(), 10)
          },
          self = this,
          win = $(window);

      // ripped from underscore
      // http://documentcloud.github.com/underscore/#throttle
      var throttle = function(func, wait) {
        var context, args, timeout, result;
        var previous = 0;
        var later = function() {
          previous = new Date();
          timeout = null;
          result = func.apply(context, args);
        };
        return function() {
          var now = new Date();
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
          } else if (!timeout) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      };

      // sets (caches) a couple of variables that we can't set until
      // this buttons have loaded; unfortunately the AddThis api
      // doesn't provide an event hook for this
      var setLimit = function () {

        // check if button height has been set yet
        if (self.addThisButtonsContainerHeight === null) {
          self.addThisButtonsContainerHeight = buttons.outerHeight();
        }

        // check if button limit has been set yet
        if (self.addThisButtonFollowLimit === null) {
          self.addThisButtonFollowLimit = posConst.contentHeight + posConst.offTop - posConst.cssTop - self.addThisButtonsContainerHeight;
        }

        // self-destruct function
        setLimit = function(){};

      };

      // determines when the buttons will follow and when they'll stay
      var updatePosition = function () {

        // toggles the position (fixed or absolute) of wrapOuter
        // and adjusts the top position of the buttons
        var adjustCss = function (pos, top) {
          wrapOuter.css({
            'position': pos
          });
          buttons.css({
            'top': top + 'px'
          });
        };

        // @todo; this can be improved
        if (posConst.offTop - win.scrollTop() <= 0) {
          if (self.addThisButtonFollowLimit <= win.scrollTop()) {
            adjustCss('absolute', self.addThisButtonFollowLimit + posConst.cssTop);
          } else {
            adjustCss('fixed', posConst.cssTop);
          }
        } else if (posConst.offTop - win.scrollTop() > 0) {
          adjustCss('absolute', posConst.cssTop + posConst.offTop);
        }

      };

      // performance improvement by lowering the frequency of scroll events firing
      var throttled = throttle(updatePosition, 25);

      // move buttons to body top in dom, adjust position top,
      // add class to container & wrap divs around buttons container
      buttons
        .css({
          'top': posConst.cssTop + posConst.offTop + 'px'
        })
        .prependTo('body')
        .addClass('following')
        .wrap(wrapOuter)
        .wrap(wrapInner);

      // reset wrapOuter to hold jq object of itself
      wrapOuter = $('.socialShare-outer');

      // event handler for scrolling
      win.on('scroll', function () {
        setLimit();
        throttled();
      });

    }

  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Share( this, options ));
      }
    });
  };

}));