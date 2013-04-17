/*!
 * Slide Projector Carousel v1.0.1 (http://okize.github.com/)
 * A jQuery plugin that displays a large 'hero image' and a navigable thumbnail list
 * Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

// use AMD or browser globals to create a jQuery plugin.
;(function (factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }

}(function ($) {

	// the default settings
	var pluginName = 'slideProjectorCarousel';
	var defaults = {
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 3,
		slidesToMove: 3
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
		var o = this.options;
		var carousel = $(this.element);
		var projectionContainer = carousel.find('.projection');
		var projections = projectionContainer.find('li');
		var slidesContainer = carousel.find('.slides');
		var slidesList = slidesContainer.find('ul');
		var slides = slidesList.find('li');
		var slideWidth = 0; // can't get width here since width will depend on whether there are navigation controls or not
		var slideCount = slides.length;
		var currentSlide = -1;
		var nextSlide = 0;
		var autoplayOverride = carousel.data('autoplay');


		var navigation = {}; // the navigation object

		// creates the html that compromises the navigation elements
		// inserts itself into dom and binds event handlers to arrows
		var addNavigation = function() {

			// @todo
			navigation.btnPrevious = $('<a>', {
				'class': 'slideControls previous disabled',
				href: '#',
				title: 'Previous',
				text: 'Previous'
			}).on('click', function (e) {
				e.preventDefault();
				if ( !$(this).hasClass('disabled') ) {
					slidesContainer.trigger('slides.move', 'previous');
				}
			});

			// @todo
			navigation.btnNext = $('<a>', {
				'class': 'slideControls next',
				href: '#',
				title: 'Next',
				text: 'Next'
			}).on('click', function (e) {
				e.preventDefault();
				if ( !$(this).hasClass('disabled') ) {
					slidesContainer.trigger('slides.move', 'next');
				}
			});

			// @todo
			slidesContainer.addClass('hasControls').append(navigation.btnPrevious, navigation.btnNext);

			// @todo
			slideWidth = slides.outerWidth();

		};

		// @todo
		var moveStrip = function(e, direction) {

			if (direction === 'previous') {
				navigation.btnPrevious.addClass('disabled');
				navigation.btnNext.removeClass('disabled');
				slidesList.css('left', 0);
			}

			if (direction === 'next') {
				navigation.btnPrevious.removeClass('disabled');
				navigation.btnNext.addClass('disabled');
				slidesList.css('left', -(slideWidth * o.slidesToMove));
			}

		};


		// inline override for autoplay; use the attribute 'data-autoplay' to control autoplay speed in the view layer
		// setting 'data-autoplay' to 0 will disable autoplay
		if (typeof autoplayOverride !== 'undefined') {
			if (autoplayOverride > 0) {
				o.autoplay = true;
				o.autoplaySpeed = autoplayOverride;
			} else {
				o.autoplay = false;
				o.autoplaySpeed = 0;
			}
		}

		// autoplay object
		var autoplay = {

			// initialize autoplay
			start: function() {
				this.timer = setTimeout(
					$.proxy(this.getNextSlide, this),
					o.autoplaySpeed
				);
			},

			// determine the next item to select
			getNextSlide: function(){

				// increment the next item index or reset if at end of list
				nextSlide = (nextSlide === slideCount - 1) ? 0 : nextSlide + 1;

				// select next item in list
				slides.eq(nextSlide).trigger('click');

			},

			// stop autoplay
			stop: function() {
				clearTimeout(this.timer);
			}

		};

		// @todo
		slides.on('click', function (e) {
			e.preventDefault();
			if (o.autoplay) { autoplay.stop(); }
			slides.removeClass('active');
			var $this = $(this);
			$this.addClass('active');
			var index = $this.index();
			currentSlide = index;
			nextSlide = index;
			projections.css('z-index', 0);
			projections.eq(index).css({'z-index': 1, 'top': 0});
			// restart autplay
			if (o.autoplay) { autoplay.start(); }
		});

		// @todo
		projections.on('click', function (e) {
			e.preventDefault();
			var link = $(this).find('a');
			var openIn = !!link.attr('target') ? '_blank' : '_self';
			window.open( link.attr('href'), openIn );
		});

		// if there are more slides than the amount set in slidesToShow, add navigation to slides
		if (slideCount > o.slidesToShow) {
			addNavigation();
		}

		// restart autplay
		if (o.autoplay) { autoplay.start(); }

		// bind handlers
		slidesContainer.on('slides.move', moveStrip);

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