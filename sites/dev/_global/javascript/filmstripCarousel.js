/*!
* Filmstrip Carousel v1.0.4 (http://okize.github.com/)
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

  // the default settings
  var pluginName = 'filmstripCarousel';
  var defaults = {
    autoplay: false,
    autoplaySpeed: 5000,
    itemsToShow: 3,
    linkEntireItem: false,
    navigation: true,
    navigationPosition: 'Outside', // Inline, Outside
    pagination: true,
    paginationEvent: 'click', // click, mouseover
    verboseClasses: true
  };

  // plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype.init = function () {

    // plugin vars
    var o = this.options,
        filmstrip = $(this.element),
        itemsContainer = filmstrip.children('.filmstripWindow').children('ul'),
        items = itemsContainer.find('> li'),
        itemCount = items.size(),
        itemWidth = items.outerWidth(),
        itemsToShow = o.itemsToShow,
        itemsContainerWidth = (itemWidth * itemCount),
        itemGroups = Math.ceil(itemCount/itemsToShow),
        itemGroupShowing = 0,
        filmstripWindowWidth = itemWidth * itemsToShow,
        showControls = o.navigation || o.pagination;

    // adjust width of filmstrip list to contain all the items
    itemsContainer.width(itemsContainerWidth);

    // autoplay object
    var autoplay = {

      // initialize autoplay
      start: function() {
        this.timer = setInterval(
          $.proxy(this.triggerSlide, this),
          o.autoplaySpeed
        );
      },

      // trigger slide
      triggerSlide: function(){

        // temp kludge
        if ((itemGroupShowing + 1) === itemGroups) { itemGroupShowing = -1; }

        filmstrip.trigger('filmstrip.move', 'next');

      },

      // stop autoplay
      stop: function() {
        clearTimeout(this.timer);
      }

    };

    // if linkSlide enabled, wrap the contents of the slide in an href
    if (o.linkEntireItem) {
      var item, href;
      items.each( function(i) {
        item = items.eq(i);
        href = item.find('a').attr('href');
        if (typeof href !== 'undefined') {
          item.contents().wrapAll('<a href="' + href + '">');
        }
      });
    }

    // check if navigation or pagination is enabled
    if (showControls) {

      // bail if navigation or pagination is unnecessary (ie. not enough items)
      if (itemCount <= itemsToShow) {
        return;
      }

      // dom element that contains the filmstrip controls
      var controls = $('<div/>', {
        'class': 'filmstripControls'
      });

      // the pagination object
      var pagination;

      // the navigation object
      var navigation = {
        btnNext: '',
        btnPrev: ''
      };

      // if pagination is enabled, build the markup to display it
      if (o.pagination) {

        // @todo
        var paginationGroupIndex = 0;

        // @todo
        var paginationItems = [];

        // @todo
        var className = ['active'];

        // @todo
        for (var i = 0; i < itemGroups; i++) {
          paginationItems.push('<a href="#" class="' + (className[i] || ' ') + '" data-filmstrip-group="' + i + '">' + (i+1) + '</a>');
        }

        // append pagination items to pagination object
        pagination = $('<span/>', {
          'class': 'filmstripPagination'
        }).on(o.paginationEvent, 'a', function (e) {
          e.preventDefault();
          if (o.autoplay) { autoplay.stop(); }
          paginationGroupIndex = $(this).data('filmstripGroup');
          filmstrip.trigger('filmstrip.move', paginationGroupIndex);
          if (o.autoplay) { autoplay.start(); }
        }).append(paginationItems.join(''));

      }

      // if navigation is enabled, build the markup to display it
      if (o.navigation) {

        // previous button
        navigation.btnPrev = $('<a>', {
          'class': 'filmstripPrevious disabled',
          href: '#',
          title: 'Previous',
          text: 'Previous'
        }).on('click', function (e) {
          e.preventDefault();
          if (o.autoplay) { autoplay.stop(); }
          if ( !$(this).hasClass('disabled') ) {
            filmstrip.trigger('filmstrip.move', 'previous');
          }
          if (o.autoplay) { autoplay.start(); }
        });

        // next button
        navigation.btnNext = $('<a>', {
          'class': 'filmstripNext',
          href: '#',
          title: 'Next',
          text: 'Next'
        }).on('click', function (e) {
          e.preventDefault();
          if (o.autoplay) { autoplay.stop(); }
          if ( !$(this).hasClass('disabled') ) {
            filmstrip.trigger('filmstrip.move', 'next');
          }
          if (o.autoplay) { autoplay.start(); }
        });

      }

      // add the navigation buttons to controls
      controls
        .append(navigation.btnPrev)
        .append(pagination)
        .append(navigation.btnNext);

      // @todo
      var moveStrip = function(e, direction) {

        // @todo
        var mover = function() {
          itemsContainer.css('left', -filmstripWindowWidth*itemGroupShowing);
        };

        // @todo
        var selectDot = function(index) {

            // @todo fix var name
            var tmp = pagination.find('a');
            tmp.removeClass('active');
            tmp.eq(index).addClass('active');

        };

        // direction is overloaded & can either be a number (item group index) or a string (next/previous)
        if (typeof direction === 'number') {

          // @todo
          if (o.pagination) {
            selectDot(direction);
            itemGroupShowing = direction;
            mover();
          }

        } else {

          // this prevents queue buildup as the filmstrip is shifting position
          //if (!filmstripIsMoving) {

            if (direction === 'previous' && itemGroupShowing > 0) {
              //filmstripIsMoving = true;
              itemGroupShowing--;
              mover();
            }

            if (direction === 'next' && itemGroupShowing < itemGroups - 1) {
              //filmstripIsMoving = true;
              itemGroupShowing++;
              mover();
            }


            if (o.pagination) {
              selectDot(itemGroupShowing);
            }

          //}

        }

        // @todo this sucks; rewrite this next
        if (o.navigation) {

          if (itemGroupShowing === 0) {
            navigation.btnPrev.addClass('disabled');
          } else {
            navigation.btnPrev.removeClass('disabled');
          }
          if (itemGroupShowing === itemGroups - 1) {
            navigation.btnNext.addClass('disabled');
          } else {
            navigation.btnNext.removeClass('disabled');
          }
        }

      };

      // add class names for styling
      if (o.verboseClasses) {
        filmstrip
          .addClass('filmstripNavigationShow')
          .addClass('filmstripNavigation' + o.navigationPosition);
      }

      // add controls to the dom & bind handlers
      filmstrip
        .append(controls)
        .on('filmstrip.move', moveStrip);

    }

    // if there are no items, remove container from dom
    if (itemCount === 0) {
      filmstrip.remove();
      return;
    }

    // autoplay
    // this whole plugin needs to be rewritten
    if (o.autoplay) {
      autoplay.start();
    }

  };

  // a lightweight plugin wrapper around the constructor preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  };

}));