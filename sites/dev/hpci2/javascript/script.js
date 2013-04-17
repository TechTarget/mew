// last update: 09-28-2012 @ 1:40
$(document).ready(function ($) {

	'use strict';

  /* content tabs component */
  $('.contentTabs').contentTabs({
    tabLocation: 'top'
  });

  /* temporary hack to move asset topics*/
  var assetTopics = $('.contentTabsAssetTopic');
  assetTopics.each( function() {
    var $this = $(this);
    $this.prependTo( $this.parent().parent() );
  });

	// hacky hack to add anchor to image
	(function() {

		var filmstrip = $('.filmstrip');
		var img, imageLink;
		filmstrip.find('.filmstripThumbnailText').each(function() {
			var $this = $(this);
			imageLink = $this.find('a').attr('href');
			if (typeof imageLink !== 'undefined') {
				img = $this.siblings('.filmstripThumbnail').find('img');
				img.wrap('<a href="' + imageLink + '">');
			}

		});

	})();

	var nav = $('#micrositeHeaderNavigation');

	// returns object of url parameters
	var getUrlParams = function () {
		var url, str, params = {};
		url = (window.location.search.substring(1)).split('&');
		for (var i = 0; i < url.length; i++) {
			if (url[i] !== '') {
				str = url[i].split('=');
				if(typeof str[1] !== 'undefined' && str[1].length > 0) {
					params[str[0]] = (decodeURIComponent(str[1])).replace(/(\+)/g, ' '); // replaces '+' symbol
				} else {
					params[str[0]] = true;
				}
			}
		}
		return params;
	};

	// select video page thumbnail
	$(function() {
		var params = getUrlParams();
		var bclid = params.bclid;
		var thumbs = $('.videoPageThumbnails').find('a');
		if (thumbs) {
			if (bclid) {
				$('#bclid-' + bclid).addClass('activeThumbnail');
			} else {
				thumbs.eq(0).addClass('activeThumbnail');
			}
		}
	});

	/*
	// dropdown navigation
	$(function() {

		nav.find('li').hover(function() {

			$(this).addClass('hover');
			$('.micrositeHeaderNavigationDropdown:first', this).css('display', 'block');

		}, function() {

			$(this).removeClass('hover');
			$('.micrositeHeaderNavigationDropdown:first', this).css('display', 'none');

		});

	});

	// navigation underlining
	$(function() {

		var pathname = (document.location.pathname.substring(1)).split(/\//);
		var activeSection = function(int) {
			nav.find('> ul > li').eq(int).addClass('on');
		};

		switch(pathname[0]) {

			case 'Infrastructure':
				activeSection(1);
				break;

			case 'Storage':
				activeSection(1);
				break;

			case 'Networking':
				activeSection(1);
				break;

			case 'Servers':
				activeSection(1);
				break;

			case 'Cloud':
				activeSection(2);
				break;

			case 'Videos':
				activeSection(3);
				break;

			case 'Downloads':
				activeSection(4);
				break;

			default:
				activeSection(0);
				break;

		}

	});
*/


	// tabs
	$.featureList(
		$(".micrositeModuleFeaturedTabs li a").not('#Dell12g .micrositeModuleFeaturedTabs li a'),
		$(".micrositeModuleFeaturedOutput > li").not('#Dell12g .micrositeModuleFeaturedOutput > li'), {
			start_item	:	0
		}
		);

	//turn off 'premium content'
	$("#premiumContentPromoContainer").css({"visibility":"hidden"});

	$('.filmstrip').filmstripCarousel({
		navigationPosition: 'Inline' // Inline, Outside
	});

	$('.carouselSlideProjector').slideProjectorCarousel({
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 3,
		slidesToMove: 1
	});


	// the reason for this stupid stupid stupid hack: for the VIP sites we used a version of the featured content tabs that didn't
	// actually have any tabs, but that _needed_ to have a custom scrollbar which meant that the scollbar that is normally
	// applied to that widget _everywhere_ because we use the same javascript file for every microsite for some unknown reason
	// which meant that the dom element we needed to apply it to for the VIP sites existed on the other sites that used featured
	// tabs which would mean they would get double-scrollbars or just break or something so had to write the below hack to
	// check if the domain is a VIP site before trying to apply the scrollbar to a different dom element than we normally would
	// no doubt this will come up again so just add any future domains to the whiteList array
	(function () {

		var whiteList = [
		'advancevirtualization',
		'simplifieditcenter',
		'computingpowercenter'
		];
		var regex = new RegExp('(www\\.)?(' + whiteList.join('|') + ')\\.com', 'g');
		if(regex.test(window.location.hostname)) {
			$('.micrositeModuleFeatured').jScrollPane();
		}

	})();

	$('#groupCi').on('click', function() {
		window.location.href = window.location.href + 'Infrastructure';
	});

	$('#groupCloud').on('click', function() {
		window.location.href = window.location.href + 'Cloud';
	});

	// what's that? you want more stupid kludges? here you go:
	var socialMediainArticleToolbar = $('.micrositeSocialMediaButtons');
	if (socialMediainArticleToolbar.length) {
		socialMediainArticleToolbar.show();
		$('#micrositeSocialMediaNav, #micrositeSocialMediaFooter').hide();
	}
	//hide social for news archive, this is another kludge until it's turned off in the template
	if (typeof microsite !== "undefined") {
		if ('NetAppNativeAdvertisingSponsoredNewsArchive' === microsite) {
			$('#micrositeSocialMediaNav, #micrositeSocialMediaFooter').hide();
		}
	}

	// ie fixes
	$('.micrositeFeaturedRelated ul li h4:nth-child(2)').css({ padding: "0 0 10px 0" });
	$('#micrositeContentColumnOneThirdRight .micrositeModuleFeatured ul.micrositeModuleFeaturedOutput > li').css({ padding: "0" });
	$('#micrositeContentColumnOneThirdRight .micrositeModuleFeatured > ul').css({ position: "relative" });

	// social media icons
	if ($('#micrositeSocialMediaNav').length) {
		$('#micrositeContent').prepend('<div class="micrositeSocialMediaNavExtrapadding" style="height:35px;"></div>');
		$('#micrositeContent').css({
			'padding-top' : '0',
			'margin-top' : '0'
		});
	}

	// dell bg fade
	var bgFade = function () {
		$("#Dell12g .micrositeModuleFeaturedOutput img.bg")
		.delay(5000)
		.first()
		.appendTo('#Dell12g .micrositeModuleFeaturedOutput')
		.fadeOut(3000);
		$("#Dell12g .micrositeModuleFeaturedOutput img.bg")
		.first()
		.fadeIn(3000);
		setTimeout(bgFade, 8000);
	};

	var bgFadeFR = function () {
		$("#Dell12g .micrositeModuleFeaturedOutput img.bg").delay(5000).first().appendTo('#Dell12g .micrositeModuleFeaturedOutput').fadeOut(3000);
		$("#Dell12g .micrositeModuleFeaturedOutput img.bg").first().fadeIn(3000);
		setTimeout(bgFadeFR, 8000);
	};

	var bgFadeDE = function () {
		$("#Dell12g .micrositeModuleFeaturedOutput img.bg").delay(5000).first().appendTo('#Dell12g .micrositeModuleFeaturedOutput').fadeOut(3000);
		$("#Dell12g .micrositeModuleFeaturedOutput img.bg").first().fadeIn(3000);
		setTimeout(bgFadeDE, 8000);
	};



	if ($('#Dell12g .micrositeModuleFeaturedOutput').length && $('#Dell12g .micrositeTabPower').length) {

		$('#Dell12g .micrositeModuleFeaturedOutput')
		.css('background-image', 'url("http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG1.png")')
		.prepend('<img class="bg" src="http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG1.png"><img class="bg" src="http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG2.png">');
		bgFade();
	}

	if ($('#Dell12g .micrositeModuleFeaturedOutput').length && $('#Dell12g .micrositeTabPower_FR').length) {
		$('#Dell12g .micrositeModuleFeaturedOutput')
		.css('background-image','url("http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG1_FR.png")')
		.prepend('<img class="bg" src="http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG1_FR.png"><img class="bg" src="http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG2_FR.png">');
		bgFadeFR();
	}

	if ($('#Dell12g .micrositeModuleFeaturedOutput').length && $('#Dell12g .micrositeTabPower_DE').length) {
		$('#Dell12g .micrositeModuleFeaturedOutput')
		.css('background-image','url("http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG1_DE.png")')
		.prepend('<img class="bg" src="http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG1_DE.png"><img class="bg" src="http://cdn.ttgtmedia.com/microsites/dell12g/images/featuredBG2_DE.png">');
		bgFadeDE();
	}



	//social media and colorbox
	(function (mo, $, undefined) {
		mo.pageUrl = window.location.href;
		mo.articleTitle = document.title;
		// PRIVATE: bit.ly API configuration
		var bitlyApi = {
			requestUrl: 'http://api.bit.ly/v3/shorten',
			login: 'uxtechtarget',
			key: 'R_3711c9f9013670f25d70b047c8deb6f2'
		};
		// PUBLIC: gets a 'short' version of passed url and stores it in the DOM
		mo.getShortUrl = function (urlToShorten, callback) {
			// if no url is passed, use the current page url
			if (typeof urlToShorten === 'undefined') {
				urlToShorten = mo.pageUrl;
			}
			// check to see if we've already shortened requested url
			var shortenedUrl = $('body').data(urlToShorten);
			if (typeof shortenedUrl === 'undefined') {
				$.ajax({
					url: bitlyApi.requestUrl,
					contentType: 'application/x-www-form-urlencoded',
					dataType: 'jsonp',
					data: ({
						login : bitlyApi.login,
						apiKey : bitlyApi.key,
						longUrl : urlToShorten
					}),
					error: function () {
						alert('error in mo.getBitlyUrl function');
					},
					success: function (data) {
						// if we get a shortened url back from bit.ly, store it in the dom with the original url as the key
						if (data.status_txt === 'OK') {
							$('body').data(urlToShorten, data.data.url);
						}
						// if we don't, log error and just store the orginal url
						else {
							//mo.log('bit.ly API log: ' + data.status_txt);
							$('body').data(urlToShorten, urlToShorten);
						}
						callback.apply(this);
					}
				});
			}
			else {
				callback.apply(this);
			}
		};
	}(window.mo = window.mo || {}, jQuery));
	//microsite tracking name for event tracking on page
	var micrositeTrackingName = (microsite === "null") ? SITE_hostName : microsite;
	//MobileChaos specific tracking
	$('.rimMobileChaosButton').bind('click', function (e) {
		_gaq.push(['_trackEvent', 'MobileChaosContact', 'Email', micrositeTrackingName]);
	});
	$('.openContestRules').bind('click', function (e) {
		e.preventDefault();
		_gaq.push(['_trackEvent', 'MobileChaosOpen', 'Open Lightbox', micrositeTrackingName]);
	});
	$('.micrositeSocialMedia-email').bind('click', function (e) {
		e.preventDefault();
		_gaq.push(['_trackEvent','Social','Email',micrositeTrackingName]);
						// PUBLIC: url of the current page
						var endpointUrl = 'http://api.addthis.com/oexchange/0.8/forward/email/offer?';
						var endpointParams = {
							pubid: 'ra-4f0c7ed813520536',
							url: window.location.href,
							title: document.title,
							email_template: 'TechTargetMicrosites',
							ct: 1
						};
						$.colorbox({
							iframe: true,
							opacity: '0.75',
							height: '775px',
							initialHeight: '775px',
							width: '525px',
							initialWidth: '525px',
							href: endpointUrl + $.param(endpointParams)
						});
					});


			// linkedIn 'share button'; https://developer.linkedin.com/plugins/share-button
			var linkedInButton = $('.micrositeSocialMedia-linkedInButton');
			if (linkedInButton.length) {
				var linkedInButtonInlineScript = '<script type="IN/Share" data-counter="right"></script>';
				var linkedInButtonScript = 'http://platform.linkedin.com/in.js';
				linkedInButton.append(linkedInButtonInlineScript);
				$.getScript(linkedInButtonScript);
			}

			// twitter 'tweet button'; http://dev.twitter.com/pages/tweet_button
			var tweetButton = $('.micrositeSocialMedia-tweetButton');
			if (tweetButton.length) {
				var tweetButtonScript = 'http://platform.twitter.com/widgets.js';
				$.getScript(tweetButtonScript);
			}

			// facebook 'like' button; http://developers.facebook.com/docs/reference/plugins/like
			var fbLikeButton = $('.micrositeSocialMedia-facebookLike');
			if (fbLikeButton.length) {
				var fbLikeButtonIframe = '<iframe src="http://www.facebook.com/plugins/like.php?layout=button_count&amp;show_faces=false&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;width=90&amp;height=22&amp;href=' + encodeURI(mo.pageUrl) + '&amp;ref=tbdByPaul" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
				$(fbLikeButtonIframe).appendTo('.micrositeSocialMedia-facebookLike');
			}

			// linkedin, facebook & twitter buttons
			$('.micrositeSocialMedia-linkedin a, .micrositeSocialMedia-facebook a, .micrositeSocialMedia-twitter a').click(function (e) {

				e.preventDefault();

				var thisButton = $(this).parent().attr('class');

				// retreive OR create + store bit.ly url for twitter/facebook/linkedIn
				mo.getShortUrl(mo.pageUrl, function () {

					var articleURL = encodeURIComponent($('body').data(mo.pageUrl)), // encoded bit.ly url that we get via ajax
						articleTitle = encodeURIComponent(mo.articleTitle), // encoded title of the page
						linkedinButtonUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + articleURL + '&title=' + articleTitle, // http://www.linkedin.com/shareArticle?mini=true&url=PERMALINK&title=TITLE&source=BLOGNAME&summary=EXCERPT
						facebookButtonUrl = 'http://www.facebook.com/share.php?u=' + articleURL + '&t=' + articleTitle, // http://www.facebook.com/share.php?u=PERMALINK&t=TITLE
						twitterButtonUrl = 'http://twitter.com/home?status=Currently reading ' + articleURL; // http://twitter.com/home?status=TITLE%20-%20PERMALINK

						switch (thisButton) {

							case 'micrositeSocialMedia-linkedin':
							_gaq.push(['_trackEvent','Social','LinkedIn',micrositeTrackingName]);
							window.open(linkedinButtonUrl);
							break;
							case 'micrositeSocialMedia-facebook':
							_gaq.push(['_trackEvent','Social','Facebook',micrositeTrackingName]);
							window.open(facebookButtonUrl);
							break;
							case 'micrositeSocialMedia-twitter':
							_gaq.push(['_trackEvent','Social','Twitter',micrositeTrackingName]);
							window.open(twitterButtonUrl);
							break;

						}

					});

});
});
// end doc.ready



// 3rd party jquery plugins //

/*!
Content Tabs v1.0.3 (http://okize.github.com/)
Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(){(function(t){return"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";var e,n,i;i="contentTabs",n={displayTabs:!0,pinPanelIntro:!1,tabLocation:"left",tabActiveClass:"active",panelActiveClass:"active",mouseEvent:"click"},e=function(){function e(e,s){this.element=e,this.el=t(this.element),this.options=t.extend({},n,s),this._defaults=n,this._name=i,this.tabs=null,this.panels=null,this.tabLocationClassName={left:"tabsVerticalLeft",right:"tabsVerticalRight",top:"tabsHorizontalTop",bottom:"tabsHorizontalBottom"},this.init()}return e.prototype.init=function(){var e,n,i=this;return this.options.displayTabs?(this.setTabsPosition(this.tabLocationClassName[this.options.tabLocation]),this.options.pinPanelIntro&&this.pinPanels(this.el),n=this.getTabs(),n.hasClass("active")||n.eq(0).addClass("active"),n.eq(n.length-1).addClass("last"),e=void 0,n.on("click",function(n){return n.preventDefault(),e=t(n.currentTarget).index(),i.selectTab(e),i.selectPanel(e)})):(this.removeTabs(),void 0)},e.prototype.setTabsPosition=function(t){return this.el.addClass(t)},e.prototype.getTabs=function(){return this.tabs||(this.tabs=this.el.find(".contentTabsNav").find("li")),this.tabs},e.prototype.selectTab=function(t){return this.getTabs().removeClass("active").eq(t).addClass("active")},e.prototype.removeTabs=function(){return this.el.addClass("tabsNone"),this.getTabs().remove()},e.prototype.getPanels=function(){return this.panels||(this.panels=this.el.find(".contentTabsPanel")),this.panels},e.prototype.selectPanel=function(t){return this.getPanels().hide().eq(t).show()},e.prototype.pinPanels=function(){var e,n;return n=void 0,e=void 0,this.el.addClass("pinPanelIntro"),n=this.el.find(".contentTabsPanelIntro"),n.each(function(){return e=t(this),e.insertBefore(e.parent())})},e}(),t.fn[i]=function(n){return this.each(function(){t.data(this,"plugin_#{pluginName}")||t.data(this,"plugin_#{pluginName}",new e(this,n))})}})}).call(this);



/*
 * Plugin: Slide Projector Carousel
 * Version: 0.1 (June 21at 2012)
 * Description:
 * Author: Morgan Wigmanich, TechTarget
 */
 (function(e,t,n){"use strict";function s(t,n){this.element=t,this.options=e.extend({},i,n),this._defaults=i,this._name=r,this.init()}var r="slideProjectorCarousel",i={autoplay:!0,autoplaySpeed:5e3,slidesToShow:3,slidesToMove:3};s.prototype.init=function(){var n=this.options,r=e(this.element),i=r.find(".projection"),s=i.find("li"),o=r.find(".slides"),u=o.find("ul"),a=u.find("li"),f=0,l=a.length,c=-1,h=0,p=r.data("autoplay"),d={},v=function(){d.btnPrevious=e("<a>",{"class":"slideControls previous disabled",href:"#",title:"Previous",text:"Previous"}).on("click",function(t){t.preventDefault(),e(this).hasClass("disabled")||o.trigger("slides.move","previous")}),d.btnNext=e("<a>",{"class":"slideControls next",href:"#",title:"Next",text:"Next"}).on("click",function(t){t.preventDefault(),e(this).hasClass("disabled")||o.trigger("slides.move","next")}),o.addClass("hasControls").append(d.btnPrevious,d.btnNext),f=a.outerWidth()},m=function(e,t){t==="previous"&&(d.btnPrevious.addClass("disabled"),d.btnNext.removeClass("disabled"),u.css("left",0)),t==="next"&&(d.btnPrevious.removeClass("disabled"),d.btnNext.addClass("disabled"),u.css("left",-(f*n.slidesToMove)))};typeof p!="undefined"&&(p>0?(n.autoplay=!0,n.autoplaySpeed=p):(n.autoplay=!1,n.autoplaySpeed=0));var g={start:function(){this.timer=setTimeout(e.proxy(this.getNextSlide,this),n.autoplaySpeed)},getNextSlide:function(){h=h===l-1?0:h+1,a.eq(h).trigger("click")},stop:function(){clearTimeout(this.timer)}};a.on("click",function(t){t.preventDefault(),n.autoplay&&g.stop(),a.removeClass("active");var r=e(this);r.addClass("active");var i=r.index();c=i,h=i,s.css("z-index",0),s.eq(i).css({"z-index":1,top:0}),n.autoplay&&g.start()}),s.on("click",function(n){n.preventDefault();var r=e(this).find("a"),i=r.attr("target")?"_blank":"_self";t.open(r.attr("href"),i)}),l>n.slidesToShow&&v(),n.autoplay&&g.start(),o.on("slides.move",m)},e.fn[r]=function(t){return this.each(function(){e.data(this,"plugin_"+r)||e.data(this,"plugin_"+r,new s(this,t))})}})(jQuery,window);




//tabs
(function($) {
	$.fn.featureList = function(options) {
		var tabs	= $(this);
		var output	= $(options.output);

		new jQuery.featureList(tabs, output, options);

		return this;
	};

	$.featureList = function(tabs, output, options) {
		function slide(nr) {
			if (typeof nr == "undefined") {
				nr = visible_item + 1;
				nr = nr >= total_items ? 0 : nr;
			}

			tabs.removeClass('current').filter(":eq(" + nr + ")").addClass('current');

			output.stop(true, true).filter(":visible").css({ 'position' : 'absolute','left' : '-10000px' });
			output.filter(":eq(" + nr + ")").css({ 'position' : 'relative','left' : '0px' }, function() {
				visible_item = nr;
			});
		}

		var options			= options || {};
		var total_items		= tabs.length;
		var visible_item	= options.start_item || 0;

		options.pause_on_hover		= options.pause_on_hover		|| true;
		options.transition_interval	= options.transition_interval	|| 0;

		output.css({ 'position' : 'absolute','left' : '-10000px' }).eq( visible_item ).css({ 'position' : 'relative','left' : '0px' });
		tabs.eq( visible_item ).addClass('current');

		tabs.click(function() {
			if ($(this).hasClass('current')) {
				return false;
			}

			slide( tabs.index( this) );
		});

		if (options.transition_interval > 0) {
			var timer = setInterval(function () {
				slide();
			}, options.transition_interval);

			if (options.pause_on_hover) {
				tabs.mouseenter(function() {
					clearInterval( timer );

				}).mouseleave(function() {
					clearInterval( timer );
					timer = setInterval(function () {
						slide();
					}, options.transition_interval);
				});
			}
		}
	};
})(jQuery);


/*!
 * ColorBox v1.3.19 - jQuery lightbox plugin; (c) 2011 Jack Moore - jacklmoore.com
 * License: http://www.opensource.org/licenses/mit-license.php
 */
 (function(J,l,W){var K={transition:"elastic",speed:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.9,preloading:true,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:false,returnFocus:true,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:true,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined},x="colorbox",S="cbox",r=S+"Element",V=S+"_open",e=S+"_load",U=S+"_complete",u=S+"_cleanup",ac=S+"_closed",i=S+"_purge",v=!J.support.opacity&&!J.support.style,af=v&&!W.XMLHttpRequest,aa=S+"_IE6",Q,ag,ah,d,H,p,b,P,c,Z,N,k,h,o,t,X,s,R,z,B,ae,ai,m,g,a,w,I,n,D,Y,M,A,L,ad="div",ab;function G(aj,am,al){var ak=l.createElement(aj);if(am){ak.id=S+am}if(al){ak.style.cssText=al}return J(ak)}function E(ak){var aj=c.length,al=(I+ak)%aj;return(al<0)?aj+al:al}function O(aj,ak){return Math.round((/%/.test(aj)?((ak==="x"?Z.width():Z.height())/100):1)*parseInt(aj,10))}function C(aj){return ae.photo||/\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(aj)}function T(){var aj;ae=J.extend({},J.data(w,x));for(aj in ae){if(J.isFunction(ae[aj])&&aj.slice(0,2)!=="on"){ae[aj]=ae[aj].call(w)}}ae.rel=ae.rel||w.rel||"nofollow";ae.href=ae.href||J(w).attr("href");ae.title=ae.title||w.title;if(typeof ae.href==="string"){ae.href=J.trim(ae.href)}}function F(aj,ak){J.event.trigger(aj);if(ak){ak.call(w)}}function y(){var ak,am=S+"Slideshow_",an="click."+S,ao,al,aj;if(ae.slideshow&&c[1]){ao=function(){X.text(ae.slideshowStop).unbind(an).bind(U,function(){if(ae.loop||c[I+1]){ak=setTimeout(L.next,ae.slideshowSpeed)}}).bind(e,function(){clearTimeout(ak)}).one(an+" "+u,al);ag.removeClass(am+"off").addClass(am+"on");ak=setTimeout(L.next,ae.slideshowSpeed)};al=function(){clearTimeout(ak);X.text(ae.slideshowStart).unbind([U,e,u,an].join(" ")).one(an,function(){L.next();ao()});ag.removeClass(am+"on").addClass(am+"off")};if(ae.slideshowAuto){ao()}else{al()}}else{ag.removeClass(am+"off "+am+"on")}}function f(aj){if(!M){w=aj;T();c=J(w);I=0;if(ae.rel!=="nofollow"){c=J("."+r).filter(function(){var ak=J.data(this,x).rel||this.rel;return(ak===ae.rel)});I=c.index(w);if(I===-1){c=c.add(w);I=c.length-1}}if(!D){D=Y=true;ag.show();if(ae.returnFocus){J(w).blur().one(ac,function(){J(this).focus()})}Q.css({opacity:+ae.opacity,cursor:ae.overlayClose?"pointer":"auto"}).show();ae.w=O(ae.initialWidth,"x");ae.h=O(ae.initialHeight,"y");L.position();if(af){Z.bind("resize."+aa+" scroll."+aa,function(){Q.css({width:Z.width(),height:Z.height(),top:Z.scrollTop(),left:Z.scrollLeft()})}).trigger("resize."+aa)}F(V,ae.onOpen);B.add(o).hide();z.html(ae.close).show()}L.load(true)}}function q(){if(!ag&&l.body){ab=false;Z=J(W);ag=G(ad).attr({id:x,"class":v?S+(af?"IE6":"IE"):""}).hide();Q=G(ad,"Overlay",af?"position:absolute":"").hide();ah=G(ad,"Wrapper");d=G(ad,"Content").append(N=G(ad,"LoadedContent","width:0; height:0; overflow:hidden"),h=G(ad,"LoadingOverlay").add(G(ad,"LoadingGraphic")),o=G(ad,"Title"),t=G(ad,"Current"),s=G(ad,"Next"),R=G(ad,"Previous"),X=G(ad,"Slideshow").bind(V,y),z=G(ad,"Close"));ah.append(G(ad).append(G(ad,"TopLeft"),H=G(ad,"TopCenter"),G(ad,"TopRight")),G(ad,false,"clear:left").append(p=G(ad,"MiddleLeft"),d,b=G(ad,"MiddleRight")),G(ad,false,"clear:left").append(G(ad,"BottomLeft"),P=G(ad,"BottomCenter"),G(ad,"BottomRight"))).find("div div").css({"float":"left"});k=G(ad,false,"position:absolute; width:9999px; visibility:hidden; display:none");B=s.add(R).add(t).add(X);J(l.body).append(Q,ag.append(ah,k))}}function j(){if(ag){if(!ab){ab=true;ai=H.height()+P.height()+d.outerHeight(true)-d.height();m=p.width()+b.width()+d.outerWidth(true)-d.width();g=N.outerHeight(true);a=N.outerWidth(true);ag.css({"padding-bottom":ai,"padding-right":m});s.click(function(){L.next()});R.click(function(){L.prev()});z.click(function(){L.close()});Q.click(function(){if(ae.overlayClose){L.close()}});J(l).bind("keydown."+S,function(ak){var aj=ak.keyCode;if(D&&ae.escKey&&aj===27){ak.preventDefault();L.close()}if(D&&ae.arrowKey&&c[1]){if(aj===37){ak.preventDefault();R.click()}else{if(aj===39){ak.preventDefault();s.click()}}}});J("."+r,l).live("click",function(aj){if(!(aj.which>1||aj.shiftKey||aj.altKey||aj.metaKey)){aj.preventDefault();f(this)}})}return true}return false}if(J.colorbox){return}J(q);L=J.fn[x]=J[x]=function(aj,al){var ak=this;aj=aj||{};q();if(j()){if(!ak[0]){if(ak.selector){return ak}ak=J("<a/>");aj.open=true}if(al){aj.onComplete=al}ak.each(function(){J.data(this,x,J.extend({},J.data(this,x)||K,aj))}).addClass(r);if((J.isFunction(aj.open)&&aj.open.call(ak))||aj.open){f(ak[0])}}return ak};L.position=function(ak,aj){var an=0,am=0,ap=ag.offset(),al=Z.scrollTop(),ao=Z.scrollLeft();Z.unbind("resize."+S);ag.css({top:-90000,left:-90000});if(ae.fixed&&!af){ap.top-=al;ap.left-=ao;ag.css({position:"fixed"})}else{an=al;am=ao;ag.css({position:"absolute"})}if(ae.right!==false){am+=Math.max(Z.width()-ae.w-a-m-O(ae.right,"x"),0)}else{if(ae.left!==false){am+=O(ae.left,"x")}else{am+=Math.round(Math.max(Z.width()-ae.w-a-m,0)/2)}}if(ae.bottom!==false){an+=Math.max(Z.height()-ae.h-g-ai-O(ae.bottom,"y"),0)}else{if(ae.top!==false){an+=O(ae.top,"y")}else{an+=Math.round(Math.max(Z.height()-ae.h-g-ai,0)/2)}}ag.css({top:ap.top,left:ap.left});ak=(ag.width()===ae.w+a&&ag.height()===ae.h+g)?0:ak||0;ah[0].style.width=ah[0].style.height="9999px";function aq(ar){H[0].style.width=P[0].style.width=d[0].style.width=ar.style.width;d[0].style.height=p[0].style.height=b[0].style.height=ar.style.height}ag.dequeue().animate({width:ae.w+a,height:ae.h+g,top:an,left:am},{duration:ak,complete:function(){aq(this);Y=false;ah[0].style.width=(ae.w+a+m)+"px";ah[0].style.height=(ae.h+g+ai)+"px";if(ae.reposition){setTimeout(function(){Z.bind("resize."+S,L.position)},1)}if(aj){aj()}},step:function(){aq(this)}})};L.resize=function(aj){if(D){aj=aj||{};if(aj.width){ae.w=O(aj.width,"x")-a-m}if(aj.innerWidth){ae.w=O(aj.innerWidth,"x")}N.css({width:ae.w});if(aj.height){ae.h=O(aj.height,"y")-g-ai}if(aj.innerHeight){ae.h=O(aj.innerHeight,"y")}if(!aj.innerHeight&&!aj.height){N.css({height:"auto"});ae.h=N.height()}N.css({height:ae.h});L.position(ae.transition==="none"?0:ae.speed)}};L.prep=function(ak){if(!D){return}var an,al=ae.transition==="none"?0:ae.speed;N.remove();N=G(ad,"LoadedContent").append(ak);function aj(){ae.w=ae.w||N.width();ae.w=ae.mw&&ae.mw<ae.w?ae.mw:ae.w;return ae.w}function am(){ae.h=ae.h||N.height();ae.h=ae.mh&&ae.mh<ae.h?ae.mh:ae.h;return ae.h}N.hide().appendTo(k.show()).css({width:aj(),overflow:ae.scrolling?"auto":"hidden"}).css({height:am()}).prependTo(d);k.hide();J(n).css({"float":"none"});if(af){J("select").not(ag.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(u,function(){this.style.visibility="inherit"})}an=function(){var ay,av,aw=c.length,at,ax="frameBorder",ar="allowTransparency",ap,ao,au;if(!D){return}function aq(){if(v){ag[0].style.removeAttribute("filter")}}ap=function(){clearTimeout(A);h.hide();F(U,ae.onComplete)};if(v){if(n){N.fadeIn(100)}}o.html(ae.title).add(N).show();if(aw>1){if(typeof ae.current==="string"){t.html(ae.current.replace("{current}",I+1).replace("{total}",aw)).show()}s[(ae.loop||I<aw-1)?"show":"hide"]().html(ae.next);R[(ae.loop||I)?"show":"hide"]().html(ae.previous);if(ae.slideshow){X.show()}if(ae.preloading){ay=[E(-1),E(1)];while(av=c[ay.pop()]){ao=J.data(av,x).href||av.href;if(J.isFunction(ao)){ao=ao.call(av)}if(C(ao)){au=new Image();au.src=ao}}}}else{B.hide()}if(ae.iframe){at=G("iframe")[0];if(ax in at){at[ax]=0}if(ar in at){at[ar]="true"}at.name=S+(+new Date());if(ae.fastIframe){ap()}else{J(at).one("load",ap)}at.src=ae.href;if(!ae.scrolling){at.scrolling="no"}J(at).addClass(S+"Iframe").appendTo(N).one(i,function(){at.src="//about:blank"})}else{ap()}if(ae.transition==="fade"){ag.fadeTo(al,1,aq)}else{aq()}};if(ae.transition==="fade"){ag.fadeTo(al,0,function(){L.position(0,an)})}else{L.position(al,an)}};L.load=function(al){var ak,am,aj=L.prep;Y=true;n=false;w=c[I];if(!al){T()}F(i);F(e,ae.onLoad);ae.h=ae.height?O(ae.height,"y")-g-ai:ae.innerHeight&&O(ae.innerHeight,"y");ae.w=ae.width?O(ae.width,"x")-a-m:ae.innerWidth&&O(ae.innerWidth,"x");ae.mw=ae.w;ae.mh=ae.h;if(ae.maxWidth){ae.mw=O(ae.maxWidth,"x")-a-m;ae.mw=ae.w&&ae.w<ae.mw?ae.w:ae.mw}if(ae.maxHeight){ae.mh=O(ae.maxHeight,"y")-g-ai;ae.mh=ae.h&&ae.h<ae.mh?ae.h:ae.mh}ak=ae.href;A=setTimeout(function(){h.show()},100);if(ae.inline){G(ad).hide().insertBefore(J(ak)[0]).one(i,function(){J(this).replaceWith(N.children())});aj(J(ak))}else{if(ae.iframe){aj(" ")}else{if(ae.html){aj(ae.html)}else{if(C(ak)){J(n=new Image()).addClass(S+"Photo").error(function(){ae.title=false;aj(G(ad,"Error").text("This image could not be loaded"))}).load(function(){var an;n.onload=null;if(ae.scalePhotos){am=function(){n.height-=n.height*an;n.width-=n.width*an};if(ae.mw&&n.width>ae.mw){an=(n.width-ae.mw)/n.width;am()}if(ae.mh&&n.height>ae.mh){an=(n.height-ae.mh)/n.height;am()}}if(ae.h){n.style.marginTop=Math.max(ae.h-n.height,0)/2+"px"}if(c[1]&&(ae.loop||c[I+1])){n.style.cursor="pointer";n.onclick=function(){L.next()}}if(v){n.style.msInterpolationMode="bicubic"}setTimeout(function(){aj(n)},1)});setTimeout(function(){n.src=ak},1)}else{if(ak){k.load(ak,ae.data,function(ao,an,ap){aj(an==="error"?G(ad,"Error").text("Request unsuccessful: "+ap.statusText):J(this).contents())})}}}}}};L.next=function(){if(!Y&&c[1]&&(ae.loop||c[I+1])){I=E(1);L.load()}};L.prev=function(){if(!Y&&c[1]&&(ae.loop||I)){I=E(-1);L.load()}};L.close=function(){if(D&&!M){M=true;D=false;F(u,ae.onCleanup);Z.unbind("."+S+" ."+aa);Q.fadeTo(200,0);ag.stop().fadeTo(300,0,function(){ag.add(Q).css({opacity:1,cursor:"auto"}).hide();F(i);N.remove();setTimeout(function(){M=false;F(ac,ae.onClosed)},1)})}};L.remove=function(){J([]).add(ag).add(Q).remove();ag=null;J("."+r).removeData(x).removeClass(r).die()};L.element=function(){return J(w)};L.settings=K}(jQuery,document,this));




















/*!
 * Filmstrip Carousel v0.8 (http://okize.github.com/)
 * Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

 ;(function ( $, window, undefined ) {

 	'use strict';

	// the default settings
	var pluginName = 'filmstripCarousel';
	var defaults = {
		itemsToShow: 3,
		navigation: true,
		navigationPosition: 'Outside', // Inline, Outside
		pagination: true,
		verboseClasses: true,
		speed: 500
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
		var filmstrip = $(this.element);
		var itemsContainer = filmstrip.children('.filmstripWindow').children('ul');
		var items = itemsContainer.find('> li');
		var itemCount = items.size();
		var itemWidth = items.outerWidth();
		var itemsToShow = o.itemsToShow;
		var itemsContainerWidth = (itemWidth * itemCount);
		var itemGroups = Math.ceil(itemCount/itemsToShow);
		var itemGroupShowing = 0;
		var filmstripWindowWidth = itemWidth * itemsToShow;
		var showControls = o.navigation || o.pagination;

		// adjust width of filmstrip list to contain all the items
		itemsContainer.width(itemsContainerWidth);

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
				}).on('click', 'a', function (e) {
					paginationGroupIndex = $(this).data('filmstripGroup');
					e.preventDefault();
					filmstrip.trigger('filmstrip.move', paginationGroupIndex);
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
					if ( !$(this).hasClass('disabled') ) {
						filmstrip.trigger('filmstrip.move', 'previous');
					}
				});

				// next button
				navigation.btnNext = $('<a>', {
					'class': 'filmstripNext',
					href: '#',
					title: 'Next',
					text: 'Next'
				}).on('click', function (e) {
					e.preventDefault();
					if ( !$(this).hasClass('disabled') ) {
						filmstrip.trigger('filmstrip.move', 'next');
					}
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