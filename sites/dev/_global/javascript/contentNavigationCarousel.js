/*!
 * Content Navigation Carousel v0.5 (http://okize.github.com/)
 * Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

;(function ( $, window, undefined ) {

	'use strict';

	// the default settings
	var pluginName = 'contentNavigationCarousel';
	var defaults = {
		autoplay: true,
		autoplaySpeed: 10000,
		mouseEvent: 'click',
		switchSpeed: 500,
		equalizeHeights: true
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
		var contentCollection = carousel.find('.contentCollection');
		var contentCollectionHeight = 0;
		var contentItems = contentCollection.find('.contentItem');
		var contentItemHeight = 0;
		var contentItemOffset = 0;
		var contentLinks = contentItems.find('.contentLink');
		var list = $('<div />', {'class': 'contentNavigation'});
		var listHeight = 0;
		var listItems;
		var listItemsCount = 0;
		var listItem;
		var activeItemIndex = -1;
		var nextItemIndex = 0;
		var autoplayOverride = carousel.attr('data-autoplay');

		// autoplay object
		var autoplay = {

			// initialize autoplay
			start: function() {
				this.timer = setTimeout(
					$.proxy(this.pause, this),
					o.autoplaySpeed
				);
			},

			// don't restart the autoplay until the user moves their mouse pointer off list item
			// this pause is in order to give them as much time as they want to read the content
			pause: function(){

				this.interval = window.setInterval(
					$.proxy(this.checkMouseLocation, this),
					500
				);

			},

			// check the location of the mouse pointer and continue with autoplay progression
			// unless mouse is over active list item
			checkMouseLocation: function() {
				if (listItems.eq(activeItemIndex).find('a').data('mouse') !== 'on') {
					clearInterval(this.interval);
					this.getNextItem();
				}
			},

			// determine the next item to select
			getNextItem: function(){

				// increment the next item index or reset if at end of list
				nextItemIndex = (nextItemIndex === listItemsCount - 1) ? 0 : nextItemIndex + 1;

				// select next item in list
				itemSelect(nextItemIndex);

			},

			// stop autoplay
			stop: function() {
				clearTimeout(this.timer);
			}

		};

		// select item to trigger mouseEvent by index
		// also pass data as 'triggered' to indicate this was not a user event
		var itemSelect = function (index) {
			listItems.eq(index).find('a').trigger(o.mouseEvent, ['triggered']);
		};

		// event handler to show the selected content item
		var showContent = function (e, eType) {

			// stop autoplay
			if (o.autoplay) { autoplay.stop(); }

			// if mouse event is a click, prevent the browser following the href
			if (o.mouseEvent === 'click') {
				e.preventDefault();
			}

			// cache item selector
			listItem = $(this);

			// if we got here through a trigger, than change 'mouse' data attr to off
			if (eType === 'triggered') {
				listItem.data('mouse','off');
			}

			// get index of current item focus
			nextItemIndex = listItem.data('index');

			// remove active class
			// need to check entire item stack because of animation race conditions
			listItems.removeClass('active');

			// add active class to current item
			listItems.eq(nextItemIndex).addClass('active');

			// if we're not on the active item then switch out visible content
			if (nextItemIndex !== activeItemIndex) {

				contentItems.eq(activeItemIndex).fadeOut(o.switchSpeed/2, function() {

					//fade in content on callback
					contentItems.eq(nextItemIndex).fadeIn(o.switchSpeed/2);

				});

				// update activeItemIndex
				activeItemIndex = nextItemIndex;

			}

			// restart autplay
			if (o.autoplay) { autoplay.start(); }

		};

		// this is an inline override for the autoplay; by using the attribute 'data-autoplay' autoplay could be
		// turned on (or it's speed changed) on a widget-level; it can also turn off autoplay if it's set to 0
		if (autoplayOverride) {
			if (autoplayOverride > 0) {
				o.autoplay = true;
				o.autoplaySpeed = autoplayOverride;
			} else {
				o.autoplay = false;
				o.autoplaySpeed = 0;
			}
		}

		// don't show a list of just one link
		if (contentLinks.length <= 1) { return; }

		// 'hover' is a helper name, change to 'mouseenter'
		if (o.mouseEvent === 'hover') { o.mouseEvent = 'mouseenter'; }

		// get list of links from content items; adding index as data attr since it will be faster to add here rather than figure out index later
		listItems = $.map(contentLinks, function(link, i) {
			listItemsCount++;
			return '<li><a href="' + link.href + '" data-index="' + i + '">' + (link.textContent || link.innerText) + '</a></li>';
		});

		// create jQ collection of of list items since we'll need it later
		listItems = $(listItems.join(''));

		// insert list into DOM
		list.append( $('<ul>').append(listItems) ).insertAfter(contentCollection);

		// get the height of content navigation
		listHeight = list.height();

		// get the height of the tallest content item
		contentCollectionHeight = Math.max.apply(null, contentItems.map(function () { return $(this).height(); }).get());

		// set the height of the content container to the tallest content item if it's overflow is hidden
		// otherwise no content will show
		if (contentCollection.css('overflow') === 'hidden') {
			contentCollection.height(contentCollectionHeight);
		}

		// equalize the heights of the collection and nav or
		// if set to false, set height of collection to tallest contant item
		if (o.equalizeHeights) {

			// is there a more clever way to write this?
			if (listHeight > contentCollectionHeight) {
				contentCollection.height(listHeight);
			} else {
				list.height(contentCollectionHeight);
			}

		}

		// set the top offsets of all the content items and
		// now that their heights are known set display to none
		contentItems.each( function() {

			contentItemHeight = $(this).height();
			contentItemOffset = Math.round((listHeight - contentItemHeight)/2);
			$(this).css({'display': 'none','top': contentItemOffset + 'px'});

		});

		// register event handler to add data attribute of mouse status over element
		listItems.on({
			mouseenter : function() {
				$(this).data('mouse', 'on');
			},
			mouseleave : function() {
				$(this).data('mouse', 'off');
			}
		}, 'a');

		// register event handler for user-defined mouse event
		listItems.on(o.mouseEvent, 'a', showContent);

		// initialize plugin by selecting the first item in the content navigation list
		itemSelect(nextItemIndex);

	};

	// a lightweight plugin wrapper around the constructor preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	};

}(jQuery, window));