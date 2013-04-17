// last update: 12-19-2012 @ 15:19

//microsite tracking name for event tracking on page
if (typeof microsite == "undefined") var microsite = "";
if (typeof SITE_name == "undefined") var SITE_name = "";
if (typeof SITE_hostName == "undefined") var SITE_hostName = "";
var micrositeTrackingName = (microsite != "") ? microsite : (SITE_name != "") ? SITE_name : SITE_hostName;
$(document).ready(function ($) {

  'use strict';

  //turn off 'premium content'
  $("#premiumContentPromoContainer").css({"visibility":"hidden"});

  $('.contentNavigationCarousel').contentNavigationCarousel({
    autoplay: true,
    autoplaySpeed: 10000,
    mouseEvent: 'hover',
    switchSpeed: 500,
    equalizeHeights: true
  });

  $('.filmstrip').filmstripCarousel({
    navigation: true,
    pagination: true,
    speed: 500
  });

  $('.carouselSlideProjector').slideProjectorCarousel({
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToMove: 1
  });

  // tabs
  $.featureList(
    $(".micrositeModuleFeaturedTabs li a").not('#Dell12g .micrositeModuleFeaturedTabs li a'),
    $(".micrositeModuleFeaturedOutput > li").not('#Dell12g .micrositeModuleFeaturedOutput > li'), {
      start_item  : 0
    }
  );

  // left scrollbars
  $('.ibmBusinessAnalyticsText, .ibmSocialBusinessText, .ibmCloudComputingText').leftScrollbar();

  // styled scrollbars
  $('.micrositeFeaturedRelatedBody, .micrositeModuleFrontLines').not('#Dell12g .micrositeFeaturedRelatedBody').jScrollPane();


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

//left scrollbar
$.fn.leftScrollbar = function(){

  'use strict';
    var items = $(this);
    $(function(){
        items.each(function(){
            var e = $(this);
            var content = e.html();
            var ie = !jQuery.support.boxModel;
            var w = e[ie?'innerWidth':'width'](), h = e[ie?'innerHeight':'height']();
            //calculate paddings
            var pad = {};
            $(['top', 'right', 'bottom', 'left']).each(function(i, side){
                pad[side] = parseInt(e.css('padding-' + side).replace('px',''));
            });
            //detect scrollbar width
            var xfill = $('<div>').css({margin:0, padding:0, height:'1px'});
            e.append(xfill);
            var contentWidth = xfill.width();
            var scrollerWidth = e.innerWidth() - contentWidth - pad.left - pad.right;
            e.html('').css({overflow:'hidden'});
            e.css('padding', '0');

            var poserHeight = h - pad.top - pad.bottom;
            var poser = $('<div>')
                .html('<div style="visibility:hidden">'+content+'</div>')
                .css({
                    marginLeft: -w+scrollerWidth-(ie?0:pad.left*2),
                    overflow: 'auto'
                })
                .height(poserHeight+(ie?pad.top+pad.bottom:0))
                .width(w);

            var pane = $('<div>').html(content).css({
                width: w-scrollerWidth-(ie?0:pad.right+pad.left),
                height: h-(ie?0:pad.bottom+pad.top),
                overflow: 'hidden',
                marginTop: -poserHeight-pad.top*2,
                marginLeft: scrollerWidth
            });

            $(['top', 'right', 'bottom', 'left']).each(function(i, side){
                 poser.css('padding-'+side, pad[side]);
                 pane.css('padding-'+side, pad[side]);
            });
            e.append(poser).append(pane);

            var hRatio = (pane.innerHeight()+pad.bottom) / poser.innerHeight();
            window.setInterval(function(){
                pane.scrollTop(poser.scrollTop()*hRatio);
            }, 50);
        });
    });
};

//tabs
(function($) {
  $.fn.featureList = function(options) {
    var tabs  = $(this);
    var output  = $(options.output);

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

    var options     = options || {};
    var total_items   = tabs.length;
    var visible_item  = options.start_item || 0;

    options.pause_on_hover    = options.pause_on_hover    || true;
    options.transition_interval = options.transition_interval || 0;

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

// hover tabs
$(function(){
  var timerId,
    $mainMenuItems = $("#Dell12g .micrositeTabPower, #Dell12g .micrositeTabStorage, #Dell12g .micrositeTabVirt, #Dell12g .micrositeTabCloud, #Dell12g .micrositeTabPower_FR, #Dell12g .micrositeTabStorage_FR, #Dell12g .micrositeTabVirt_FR, #Dell12g .micrositeTabCloud_FR, #Dell12g .micrositeTabPower_DE, #Dell12g .micrositeTabStorage_DE, #Dell12g .micrositeTabVirt_DE, #Dell12g .micrositeTabCloud_DE"),
    $subMenus = $("#Dell12g .micrositeFeaturedPower, #Dell12g .micrositeFeaturedStorage, #Dell12g .micrositeFeaturedVirt, #Dell12g .micrositeFeaturedCloud, #Dell12g .micrositeFeaturedPower_FR, #Dell12g .micrositeFeaturedStorage_FR, #Dell12g .micrositeFeaturedVirt_FR, #Dell12g .micrositeFeaturedCloud_FR, #Dell12g .micrositeFeaturedPower_DE, #Dell12g .micrositeFeaturedStorage_DE, #Dell12g .micrositeFeaturedVirt_DE, #Dell12g .micrositeFeaturedCloud_DE").hide();

  $mainMenuItems.hover(
    function(){
      clearTimeout(timerId);
      $subMenus.hide();
      $($subMenus[$mainMenuItems.index(this)]).hide()
                          .removeClass('hidden')
                          .show(),
                          $(this).css({ 'border' : '1px solid #5e5e5e' });
    }, function(){
      var i = $mainMenuItems.index(this);
      timerId = setTimeout(function(){$($subMenus[i]).hide();},0);
      $(this).css({ border: "1px solid transparent" });
    }
  );

  $subMenus.hover(
    function() {
       clearTimeout(timerId);
       $($mainMenuItems[$subMenus.index(this)]).css({ 'border' : '1px solid #5e5e5e' });
    },
    function() {
       $(this).hide();
       $($mainMenuItems[$subMenus.index(this)]).css({ 'border' : '1px solid transparent' });
    }
  );


});


// 3rd party jquery plugins //




/*
 * Plugin: Content Navigation Carousel
 * Version: 0.5 (June 7th 2012)
 * Description: jQuery plugin that takes a list of content items and generates a navigation list from content links to form the awesome power of a carousel
 * Author: Morgan Wigmanich, TechTarget
 * Options:
 *   autoPlay: boolean; this will automagically rotate through the content list
 *   autoPlaySpeed: integer; the speed (in ms) at which the autoplay will rotate through the items
 *   mouseEvent: string; which mouse event will trigger the content switch; currently supported: hover & click
 *   switchSpeed: integer; the speed (0 - âˆž in ms) that it takes to switch to displaying a new contentItem
 *   equalizeHeights: boolean; equalizes the heights of the content container and navigation list to whichever is largest
 * Dependencies: none *
 */
(function(e,t,n){"use strict";function o(t,n){this.element=t,this.options=e.extend({},s,n),this._defaults=s,this._name=r,this.init()}var r="contentNavigationCarousel",i=t.document,s={autoplay:!0,autoplaySpeed:1e4,mouseEvent:"click",switchSpeed:500,equalizeHeights:!0};o.prototype.init=function(){var n=this.options,r=e(this.element),i=r.find(".contentCollection"),s=0,o=i.find(".contentItem"),u=0,a=0,f=o.find(".contentLink"),l=e('<div class="contentNavigation" />'),c=0,h,p=0,d,v=-1,m=0,g=r.attr("data-autoplay"),y={start:function(){this.timer=setTimeout(e.proxy(this.pause,this),n.autoplaySpeed)},pause:function(){this.interval=t.setInterval(e.proxy(this.checkMouseLocation,this),500)},checkMouseLocation:function(){h.eq(v).find("a").data("mouse")!=="on"&&(clearInterval(this.interval),this.getNextItem())},getNextItem:function(){m=m===p-1?0:m+1,b(m)},stop:function(){clearTimeout(this.timer)}},b=function(e){h.eq(e).find("a").trigger(n.mouseEvent,["triggered"])},w=function(t,r){n.autoplay&&y.stop(),n.mouseEvent==="click"&&t.preventDefault(),d=e(this),r==="triggered"&&d.data("mouse","off"),m=d.data("index"),h.removeClass("active"),h.eq(m).addClass("active"),m!==v&&(o.eq(v).fadeOut(n.switchSpeed/2,function(){o.eq(m).fadeIn(n.switchSpeed/2)}),v=m),n.autoplay&&y.start()};g&&(g>0?(n.autoplay=!0,n.autoplaySpeed=g):(n.autoplay=!1,n.autoplaySpeed=0));if(f.length<=1)return;n.mouseEvent==="hover"&&(n.mouseEvent="mouseenter"),h=e.map(f,function(e,t){return p++,'<li><a href="'+e.href+'" data-index="'+t+'">'+(e.textContent||e.innerText)+"</a></li>"}),h=e(h.join("")),l.append(e("<ul>").append(h)).insertAfter(i),c=l.height(),s=Math.max.apply(null,o.map(function(){return e(this).height()}).get()),i.css("overflow")==="hidden"&&i.height(s),n.equalizeHeights&&(c>s?i.height(c):l.height(s)),o.each(function(t){u=e(this).height(),a=Math.round((c-u)/2),e(this).css({display:"none",top:a+"px"})}),h.on({mouseenter:function(){e(this).data("mouse","on")},mouseleave:function(){e(this).data("mouse","off")}},"a"),h.on(n.mouseEvent,"a",w),b(m)},e.fn[r]=function(t){return this.each(function(){e.data(this,"plugin_"+r)||e.data(this,"plugin_"+r,new o(this,t))})}})(jQuery,window);

/*
 * Plugin: Filmstrip Carousel
 * Version: 0.7 (June 11th 2012)
 * Description:
 * Author: Morgan Wigmanich, TechTarget
 * Options:
 *   autoPlay: boolean; this will automagically rotate through the content list
 *   autoPlaySpeed: integer; the speed (in ms) at which the autoplay will rotate through the items
 *   mouseEvent: string; which mouse event will trigger the content switch; currently supported: hover & click
 *   switchSpeed: integer; the speed (0 - âˆž in ms) that it takes to switch to displaying a new contentItem
 *   equalizeHeights: boolean; equalizes the heights of the content container and navigation list to whichever is largest
 * Dependencies: none
 */
 (function(e,t,n){"use strict";function s(t,n){this.element=t,this.options=e.extend({},i,n),this._defaults=i,this._name=r,this.init()}var r="filmstripCarousel",i={navigation:!0,pagination:!0,speed:500};s.prototype.init=function(){var t=this.options,n=e(this.element),r=n.children(".filmstripWindow"),i=r.outerWidth(),s=r.children("ul"),o=s.find("> li"),u=o.outerWidth(),a=o.size(),f=u*a,l=Math.round(i/u);i=l===1?u:r.outerWidth();var c=Math.ceil(a/l),h=0,p={},d={},v=function(){p.btnPrev=e("<a>",{"class":"filmstripPrevious disabled",href:"#",title:"Previous",text:"Previous"}).on("click",function(t){t.preventDefault(),e(this).hasClass("disabled")||n.trigger("filmstrip.move","previous")}),p.btnNext=e("<a>",{"class":"filmstripNext",href:"#",title:"Next",text:"Next"}).on("click",function(t){t.preventDefault(),e(this).hasClass("disabled")||n.trigger("filmstrip.move","next")}),p.container=e("<div/>",{"class":"filmstripNavigation"}).append(p.btnPrev,p.btnNext),n.append(p.container)},m=function(){var t=0,r=[],i=["active"];for(var s=0;s<c;s++)r.push('<a href="#" class="'+(i[s]||" ")+'" data-filmstrip-group="'+s+'">'+(s+1)+"</a>");d.container=e("<div/>",{"class":"filmstripPagination"}).on("click","a",function(r){t=e(this).data("filmstripGroup"),r.preventDefault(),n.trigger("filmstrip.move",t)}),d.items=e(r),n.append(d.container.append(r.join("")))},g=function(e,n){var r=function(){s.css("left",-i*h)},o=function(e){var t=d.container.find("a");t.removeClass("active"),t.eq(e).addClass("active")};typeof n=="number"?t.pagination&&(o(n),h=n,r()):(n==="previous"&&h>0&&(h--,r()),n==="next"&&h<c-1&&(h++,r()),t.pagination&&o(h)),t.navigation&&(h===0?p.btnPrev.addClass("disabled"):p.btnPrev.removeClass("disabled"),h===c-1?p.btnNext.addClass("disabled"):p.btnNext.removeClass("disabled"))};if(a===0){n.remove();return}s.width(f),t.navigation?v():n.addClass("filmstripNoNav"),t.pagination?m():n.addClass("filmstripNoPagination"),n.on("filmstrip.move",g)},e.fn[r]=function(t){return this.each(function(){e.data(this,"plugin_"+r)||e.data(this,"plugin_"+r,new s(this,t))})}})(jQuery,window);


/*
 * Plugin: Slide Projector Carousel
 * Version: 0.1 (June 21at 2012)
 * Description:
 * Author: Morgan Wigmanich, TechTarget
 */
(function(e,t,n){"use strict";function s(t,n){this.element=t,this.options=e.extend({},i,n),this._defaults=i,this._name=r,this.init()}var r="slideProjectorCarousel",i={autoplay:!0,autoplaySpeed:5e3,slidesToShow:3,slidesToMove:3};s.prototype.init=function(){var n=this.options,r=e(this.element),i=r.find(".projection"),s=i.find("li"),o=r.find(".slides"),u=o.find("ul"),a=u.find("li"),f=0,l=a.length,c=-1,h=0,p=r.data("autoplay"),d={},v=function(){d.btnPrevious=e("<a>",{"class":"slideControls previous disabled",href:"#",title:"Previous",text:"Previous"}).on("click",function(t){t.preventDefault(),e(this).hasClass("disabled")||o.trigger("slides.move","previous")}),d.btnNext=e("<a>",{"class":"slideControls next",href:"#",title:"Next",text:"Next"}).on("click",function(t){t.preventDefault(),e(this).hasClass("disabled")||o.trigger("slides.move","next")}),o.addClass("hasControls").append(d.btnPrevious,d.btnNext),f=a.outerWidth()},m=function(e,t){t==="previous"&&(d.btnPrevious.addClass("disabled"),d.btnNext.removeClass("disabled"),u.css("left",0)),t==="next"&&(d.btnPrevious.removeClass("disabled"),d.btnNext.addClass("disabled"),u.css("left",-(f*n.slidesToMove)))};typeof p!="undefined"&&(p>0?(n.autoplay=!0,n.autoplaySpeed=p):(n.autoplay=!1,n.autoplaySpeed=0));var g={start:function(){this.timer=setTimeout(e.proxy(this.getNextSlide,this),n.autoplaySpeed)},getNextSlide:function(){h=h===l-1?0:h+1,a.eq(h).trigger("click")},stop:function(){clearTimeout(this.timer)}};a.on("click",function(t){t.preventDefault(),n.autoplay&&g.stop(),a.removeClass("active");var r=e(this);r.addClass("active");var i=r.index();c=i,h=i,s.css("z-index",0),s.eq(i).css({"z-index":1,top:0}),n.autoplay&&g.start()}),s.on("click",function(n){n.preventDefault();var r=e(this).find("a"),i=r.attr("target")?"_blank":"_self";t.open(r.attr("href"),i)}),l>n.slidesToShow&&v(),n.autoplay&&g.start(),o.on("slides.move",m)},e.fn[r]=function(t){return this.each(function(){e.data(this,"plugin_"+r)||e.data(this,"plugin_"+r,new s(this,t))})}})(jQuery,window);


/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var az,Q=this,Y,ak,v,am,T,Z,y,q,aA,aF,av,i,I,h,j,aa,U,aq,X,t,A,ar,af,an,G,l,au,ay,x,aw,aI,f,L,aj=true,P=true,aH=false,k=false,ap=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aI=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function at(aR){var aM,aO,aN,aK,aJ,aQ,aP=false,aL=false;az=aR;if(Y===c){aJ=D.scrollTop();aQ=D.scrollLeft();D.css({overflow:"hidden",padding:0});ak=D.innerWidth()+f;v=D.innerHeight();D.width(ak);Y=b('<div class="jspPane" />').css("padding",aI).append(D.children());am=b('<div class="jspContainer" />').css({width:ak+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aP=az.stickToBottom&&K();aL=az.stickToRight&&B();aK=D.innerWidth()+f!=ak||D.outerHeight()!=v;if(aK){ak=D.innerWidth()+f;v=D.innerHeight();am.css({width:ak+"px",height:v+"px"})}if(!aK&&L==T&&Y.outerHeight()==Z){D.width(ak);return}L=T;Y.css("width","");D.width(ak);am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aR.contentWidth){T=aR.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/ak;q=Z/v;aA=q>1;aF=y>1;if(!(aF||aA)){D.removeClass("jspScrollable");Y.css({top:0,width:am.width()-f});n();E();R();w();ai()}else{D.addClass("jspScrollable");aM=az.maintainPosition&&(I||aa);if(aM){aO=aD();aN=aB()}aG();z();F();if(aM){N(aL?(T-ak):aO,false);M(aP?(Z-v):aN,false)}J();ag();ao();if(az.enableKeyboardNavigation){S()}if(az.clickOnTrack){p()}C();if(az.hijackInternalLinks){m()}}if(az.autoReinitialise&&!aw){aw=setInterval(function(){at(az)},az.autoReinitialiseDelay)}else{if(!az.autoReinitialise&&aw){clearInterval(aw)}}aJ&&D.scrollTop(0)&&M(aJ,false);aQ&&D.scrollLeft(0)&&N(aQ,false);D.trigger("jsp-initialised",[aF||aA])}function aG(){if(aA){am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=am.find(">.jspVerticalBar");aq=U.find(">.jspTrack");av=aq.find(">.jspDrag");if(az.showArrows){ar=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aE(0,-1)).bind("click.jsp",aC);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aE(0,1)).bind("click.jsp",aC);if(az.arrowScrollOnHover){ar.bind("mouseover.jsp",aE(0,-1,ar));af.bind("mouseover.jsp",aE(0,1,af))}al(aq,az.verticalArrowPositions,ar,af)}t=v;am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});av.hover(function(){av.addClass("jspHover")},function(){av.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);av.addClass("jspActive");var s=aJ.pageY-av.position().top;b("html").bind("mousemove.jsp",function(aK){V(aK.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});o()}}function o(){aq.height(t+"px");I=0;X=az.verticalGutter+aq.outerWidth();Y.width(ak-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aF){am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));an=am.find(">.jspHorizontalBar");G=an.find(">.jspTrack");h=G.find(">.jspDrag");if(az.showArrows){ay=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aE(-1,0)).bind("click.jsp",aC);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aE(1,0)).bind("click.jsp",aC);
if(az.arrowScrollOnHover){ay.bind("mouseover.jsp",aE(-1,0,ay));x.bind("mouseover.jsp",aE(1,0,x))}al(G,az.horizontalArrowPositions,ay,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);h.addClass("jspActive");var s=aJ.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aK){W(aK.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});l=am.innerWidth();ah()}}function ah(){am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aF&&aA){var aJ=G.outerHeight(),s=aq.outerWidth();t-=aJ;b(an).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ak-=aJ;G.parent().append(b('<div class="jspCorner" />').css("width",aJ+"px"));o();ah()}if(aF){Y.width((am.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aF){au=Math.ceil(1/y*l);if(au>az.horizontalDragMaxWidth){au=az.horizontalDragMaxWidth}else{if(au<az.horizontalDragMinWidth){au=az.horizontalDragMinWidth}}h.width(au+"px");j=l-au;ae(aa)}if(aA){A=Math.ceil(1/q*t);if(A>az.verticalDragMaxHeight){A=az.verticalDragMaxHeight}else{if(A<az.verticalDragMinHeight){A=az.verticalDragMinHeight}}av.height(A+"px");i=t-A;ad(I)}}function al(aK,aM,aJ,s){var aO="before",aL="after",aN;if(aM=="os"){aM=/Mac/.test(navigator.platform)?"after":"split"}if(aM==aO){aL=aM}else{if(aM==aL){aO=aM;aN=aJ;aJ=s;s=aN}}aK[aO](aJ)[aL](s)}function aE(aJ,s,aK){return function(){H(aJ,s,this,aK);this.blur();return false}}function H(aM,aL,aP,aO){aP=b(aP).addClass("jspActive");var aN,aK,aJ=true,s=function(){if(aM!==0){Q.scrollByX(aM*az.arrowButtonSpeed)}if(aL!==0){Q.scrollByY(aL*az.arrowButtonSpeed)}aK=setTimeout(s,aJ?az.initialDelay:az.arrowRepeatFreq);aJ=false};s();aN=aO?"mouseout.jsp":"mouseup.jsp";aO=aO||b("html");aO.bind(aN,function(){aP.removeClass("jspActive");aK&&clearTimeout(aK);aK=null;aO.unbind(aN)})}function p(){w();if(aA){aq.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageY-aP.top-I,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageY-aS.top-A/2,aQ=v*az.scrollPagePercent,aR=i*aQ/(Z-v);if(aN<0){if(I-aR>aT){Q.scrollByY(-aQ)}else{V(aT)}}else{if(aN>0){if(I+aR<aT){Q.scrollByY(aQ)}else{V(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}if(aF){G.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageX-aP.left-aa,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageX-aS.left-au/2,aQ=ak*az.scrollPagePercent,aR=j*aQ/(T-ak);if(aN<0){if(aa-aR>aT){Q.scrollByX(-aQ)}else{W(aT)}}else{if(aN>0){if(aa+aR<aT){Q.scrollByX(aQ)}else{W(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(aq){aq.unbind("mousedown.jsp")}}function ax(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(av){av.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aJ){if(!aA){return}if(s<0){s=0}else{if(s>i){s=i}}if(aJ===c){aJ=az.animateScroll}if(aJ){Q.animate(av,"top",s,ad)}else{av.css("top",s);ad(s)}}function ad(aJ){if(aJ===c){aJ=av.position().top}am.scrollTop(0);I=aJ;var aM=I===0,aK=I==i,aL=aJ/i,s=-aL*(Z-v);if(aj!=aM||aH!=aK){aj=aM;aH=aK;D.trigger("jsp-arrow-change",[aj,aH,P,k])}u(aM,aK);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aM,aK]).trigger("scroll")}function W(aJ,s){if(!aF){return}if(aJ<0){aJ=0}else{if(aJ>j){aJ=j}}if(s===c){s=az.animateScroll}if(s){Q.animate(h,"left",aJ,ae)
}else{h.css("left",aJ);ae(aJ)}}function ae(aJ){if(aJ===c){aJ=h.position().left}am.scrollTop(0);aa=aJ;var aM=aa===0,aL=aa==j,aK=aJ/j,s=-aK*(T-ak);if(P!=aM||k!=aL){P=aM;k=aL;D.trigger("jsp-arrow-change",[aj,aH,P,k])}r(aM,aL);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aM,aL]).trigger("scroll")}function u(aJ,s){if(az.showArrows){ar[aJ?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aJ,s){if(az.showArrows){ay[aJ?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aJ){var aK=s/(Z-v);V(aK*i,aJ)}function N(aJ,s){var aK=aJ/(T-ak);W(aK*j,s)}function ab(aW,aR,aK){var aO,aL,aM,s=0,aV=0,aJ,aQ,aP,aT,aS,aU;try{aO=b(aW)}catch(aN){return}aL=aO.outerHeight();aM=aO.outerWidth();am.scrollTop(0);am.scrollLeft(0);while(!aO.is(".jspPane")){s+=aO.position().top;aV+=aO.position().left;aO=aO.offsetParent();if(/^body|html$/i.test(aO[0].nodeName)){return}}aJ=aB();aP=aJ+v;if(s<aJ||aR){aS=s-az.verticalGutter}else{if(s+aL>aP){aS=s-v+aL+az.verticalGutter}}if(aS){M(aS,aK)}aQ=aD();aT=aQ+ak;if(aV<aQ||aR){aU=aV-az.horizontalGutter}else{if(aV+aM>aT){aU=aV-ak+aM+az.horizontalGutter}}if(aU){N(aU,aK)}}function aD(){return -Y.position().left}function aB(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aB()<10)}function B(){var s=T-ak;return(s>20)&&(s-aD()<10)}function ag(){am.unbind(ac).bind(ac,function(aM,aN,aL,aJ){var aK=aa,s=I;Q.scrollBy(aL*az.mouseWheelSpeed,-aJ*az.mouseWheelSpeed,false);return aK==aa&&s==I})}function n(){am.unbind(ac)}function aC(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aJ,aL=[];aF&&aL.push(an[0]);aA&&aL.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aO){if(aO.target!==this&&!(aL.length&&b(aO.target).closest(aL).length)){return}var aN=aa,aM=I;switch(aO.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aO.keyCode;aK();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aJ=aO.keyCode==s&&aN!=aa||aM!=I;return !aJ}).bind("keypress.jsp",function(aM){if(aM.keyCode==s){aK()}return !aJ});if(az.hideFocus){D.css("outline","none");if("hideFocus" in am[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in am[0]){D.attr("hideFocus",false)}}function aK(){var aN=aa,aM=I;switch(s){case 40:Q.scrollByY(az.keyboardSpeed,false);break;case 38:Q.scrollByY(-az.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*az.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*az.scrollPagePercent,false);break;case 39:Q.scrollByX(az.keyboardSpeed,false);break;case 37:Q.scrollByX(-az.keyboardSpeed,false);break}aJ=aN!=aa||aM!=I;return aJ}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aL,aJ,aK=escape(location.hash);try{aL=b(aK)}catch(s){return}if(aL.length&&Y.find(aK)){if(am.scrollTop()===0){aJ=setInterval(function(){if(am.scrollTop()>0){ab(aK,true);b(document).scrollTop(am.position().top);clearInterval(aJ)}},50)}else{ab(aK,true);b(document).scrollTop(am.position().top)}}}}function ai(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){ai();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aJ;if(s.length>1){aJ=s[1];if(aJ.length>0&&Y.find("#"+aJ).length>0){ab("#"+aJ,true);return false}}})}function ao(){var aK,aJ,aM,aL,aN,s=false;am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aO){var aP=aO.originalEvent.touches[0];aK=aD();aJ=aB();aM=aP.pageX;aL=aP.pageY;aN=false;s=true}).bind("touchmove.jsp",function(aR){if(!s){return}var aQ=aR.originalEvent.touches[0],aP=aa,aO=I;Q.scrollTo(aK+aM-aQ.pageX,aJ+aL-aQ.pageY);aN=aN||Math.abs(aM-aQ.pageX)>5||Math.abs(aL-aQ.pageY)>5;
return aP==aa&&aO==I}).bind("touchend.jsp",function(aO){s=false}).bind("click.jsp-touchclick",function(aO){if(aN){aN=false;return false}})}function g(){var s=aB(),aJ=aD();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ap.append(Y.children()));ap.scrollTop(s);ap.scrollLeft(aJ)}b.extend(Q,{reinitialise:function(aJ){aJ=b.extend({},az,aJ);at(aJ)},scrollToElement:function(aK,aJ,s){ab(aK,aJ,s)},scrollTo:function(aK,s,aJ){N(aK,aJ);M(s,aJ)},scrollToX:function(aJ,s){N(aJ,s)},scrollToY:function(s,aJ){M(s,aJ)},scrollToPercentX:function(aJ,s){N(aJ*(T-ak),s)},scrollToPercentY:function(aJ,s){M(aJ*(Z-v),s)},scrollBy:function(aJ,s,aK){Q.scrollByX(aJ,aK);Q.scrollByY(s,aK)},scrollByX:function(s,aK){var aJ=aD()+Math[s<0?"floor":"ceil"](s),aL=aJ/(T-ak);W(aL*j,aK)},scrollByY:function(s,aK){var aJ=aB()+Math[s<0?"floor":"ceil"](s),aL=aJ/(Z-v);V(aL*i,aK)},positionDragX:function(s,aJ){W(s,aJ)},positionDragY:function(aJ,s){V(aJ,s)},animate:function(aJ,aM,s,aL){var aK={};aK[aM]=s;aJ.animate(aK,{duration:az.animateDuration,easing:az.animateEase,queue:false,step:aL})},getContentPositionX:function(){return aD()},getContentPositionY:function(){return aB()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aD()/(T-ak)},getPercentScrolledY:function(){return aB()/(Z-v)},getIsScrollableH:function(){return aF},getIsScrollableV:function(){return aA},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:function(){m()},destroy:function(){g()}});at(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(jQuery,this);




/*!
 * ColorBox v1.3.19 - jQuery lightbox plugin; (c) 2011 Jack Moore - jacklmoore.com
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function(J,l,W){var K={transition:"elastic",speed:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.9,preloading:true,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:false,returnFocus:true,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:true,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined},x="colorbox",S="cbox",r=S+"Element",V=S+"_open",e=S+"_load",U=S+"_complete",u=S+"_cleanup",ac=S+"_closed",i=S+"_purge",v=!J.support.opacity&&!J.support.style,af=v&&!W.XMLHttpRequest,aa=S+"_IE6",Q,ag,ah,d,H,p,b,P,c,Z,N,k,h,o,t,X,s,R,z,B,ae,ai,m,g,a,w,I,n,D,Y,M,A,L,ad="div",ab;function G(aj,am,al){var ak=l.createElement(aj);if(am){ak.id=S+am}if(al){ak.style.cssText=al}return J(ak)}function E(ak){var aj=c.length,al=(I+ak)%aj;return(al<0)?aj+al:al}function O(aj,ak){return Math.round((/%/.test(aj)?((ak==="x"?Z.width():Z.height())/100):1)*parseInt(aj,10))}function C(aj){return ae.photo||/\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(aj)}function T(){var aj;ae=J.extend({},J.data(w,x));for(aj in ae){if(J.isFunction(ae[aj])&&aj.slice(0,2)!=="on"){ae[aj]=ae[aj].call(w)}}ae.rel=ae.rel||w.rel||"nofollow";ae.href=ae.href||J(w).attr("href");ae.title=ae.title||w.title;if(typeof ae.href==="string"){ae.href=J.trim(ae.href)}}function F(aj,ak){J.event.trigger(aj);if(ak){ak.call(w)}}function y(){var ak,am=S+"Slideshow_",an="click."+S,ao,al,aj;if(ae.slideshow&&c[1]){ao=function(){X.text(ae.slideshowStop).unbind(an).bind(U,function(){if(ae.loop||c[I+1]){ak=setTimeout(L.next,ae.slideshowSpeed)}}).bind(e,function(){clearTimeout(ak)}).one(an+" "+u,al);ag.removeClass(am+"off").addClass(am+"on");ak=setTimeout(L.next,ae.slideshowSpeed)};al=function(){clearTimeout(ak);X.text(ae.slideshowStart).unbind([U,e,u,an].join(" ")).one(an,function(){L.next();ao()});ag.removeClass(am+"on").addClass(am+"off")};if(ae.slideshowAuto){ao()}else{al()}}else{ag.removeClass(am+"off "+am+"on")}}function f(aj){if(!M){w=aj;T();c=J(w);I=0;if(ae.rel!=="nofollow"){c=J("."+r).filter(function(){var ak=J.data(this,x).rel||this.rel;return(ak===ae.rel)});I=c.index(w);if(I===-1){c=c.add(w);I=c.length-1}}if(!D){D=Y=true;ag.show();if(ae.returnFocus){J(w).blur().one(ac,function(){J(this).focus()})}Q.css({opacity:+ae.opacity,cursor:ae.overlayClose?"pointer":"auto"}).show();ae.w=O(ae.initialWidth,"x");ae.h=O(ae.initialHeight,"y");L.position();if(af){Z.bind("resize."+aa+" scroll."+aa,function(){Q.css({width:Z.width(),height:Z.height(),top:Z.scrollTop(),left:Z.scrollLeft()})}).trigger("resize."+aa)}F(V,ae.onOpen);B.add(o).hide();z.html(ae.close).show()}L.load(true)}}function q(){if(!ag&&l.body){ab=false;Z=J(W);ag=G(ad).attr({id:x,"class":v?S+(af?"IE6":"IE"):""}).hide();Q=G(ad,"Overlay",af?"position:absolute":"").hide();ah=G(ad,"Wrapper");d=G(ad,"Content").append(N=G(ad,"LoadedContent","width:0; height:0; overflow:hidden"),h=G(ad,"LoadingOverlay").add(G(ad,"LoadingGraphic")),o=G(ad,"Title"),t=G(ad,"Current"),s=G(ad,"Next"),R=G(ad,"Previous"),X=G(ad,"Slideshow").bind(V,y),z=G(ad,"Close"));ah.append(G(ad).append(G(ad,"TopLeft"),H=G(ad,"TopCenter"),G(ad,"TopRight")),G(ad,false,"clear:left").append(p=G(ad,"MiddleLeft"),d,b=G(ad,"MiddleRight")),G(ad,false,"clear:left").append(G(ad,"BottomLeft"),P=G(ad,"BottomCenter"),G(ad,"BottomRight"))).find("div div").css({"float":"left"});k=G(ad,false,"position:absolute; width:9999px; visibility:hidden; display:none");B=s.add(R).add(t).add(X);J(l.body).append(Q,ag.append(ah,k))}}function j(){if(ag){if(!ab){ab=true;ai=H.height()+P.height()+d.outerHeight(true)-d.height();m=p.width()+b.width()+d.outerWidth(true)-d.width();g=N.outerHeight(true);a=N.outerWidth(true);ag.css({"padding-bottom":ai,"padding-right":m});s.click(function(){L.next()});R.click(function(){L.prev()});z.click(function(){L.close()});Q.click(function(){if(ae.overlayClose){L.close()}});J(l).bind("keydown."+S,function(ak){var aj=ak.keyCode;if(D&&ae.escKey&&aj===27){ak.preventDefault();L.close()}if(D&&ae.arrowKey&&c[1]){if(aj===37){ak.preventDefault();R.click()}else{if(aj===39){ak.preventDefault();s.click()}}}});J("."+r,l).live("click",function(aj){if(!(aj.which>1||aj.shiftKey||aj.altKey||aj.metaKey)){aj.preventDefault();f(this)}})}return true}return false}if(J.colorbox){return}J(q);L=J.fn[x]=J[x]=function(aj,al){var ak=this;aj=aj||{};q();if(j()){if(!ak[0]){if(ak.selector){return ak}ak=J("<a/>");aj.open=true}if(al){aj.onComplete=al}ak.each(function(){J.data(this,x,J.extend({},J.data(this,x)||K,aj))}).addClass(r);if((J.isFunction(aj.open)&&aj.open.call(ak))||aj.open){f(ak[0])}}return ak};L.position=function(ak,aj){var an=0,am=0,ap=ag.offset(),al=Z.scrollTop(),ao=Z.scrollLeft();Z.unbind("resize."+S);ag.css({top:-90000,left:-90000});if(ae.fixed&&!af){ap.top-=al;ap.left-=ao;ag.css({position:"fixed"})}else{an=al;am=ao;ag.css({position:"absolute"})}if(ae.right!==false){am+=Math.max(Z.width()-ae.w-a-m-O(ae.right,"x"),0)}else{if(ae.left!==false){am+=O(ae.left,"x")}else{am+=Math.round(Math.max(Z.width()-ae.w-a-m,0)/2)}}if(ae.bottom!==false){an+=Math.max(Z.height()-ae.h-g-ai-O(ae.bottom,"y"),0)}else{if(ae.top!==false){an+=O(ae.top,"y")}else{an+=Math.round(Math.max(Z.height()-ae.h-g-ai,0)/2)}}ag.css({top:ap.top,left:ap.left});ak=(ag.width()===ae.w+a&&ag.height()===ae.h+g)?0:ak||0;ah[0].style.width=ah[0].style.height="9999px";function aq(ar){H[0].style.width=P[0].style.width=d[0].style.width=ar.style.width;d[0].style.height=p[0].style.height=b[0].style.height=ar.style.height}ag.dequeue().animate({width:ae.w+a,height:ae.h+g,top:an,left:am},{duration:ak,complete:function(){aq(this);Y=false;ah[0].style.width=(ae.w+a+m)+"px";ah[0].style.height=(ae.h+g+ai)+"px";if(ae.reposition){setTimeout(function(){Z.bind("resize."+S,L.position)},1)}if(aj){aj()}},step:function(){aq(this)}})};L.resize=function(aj){if(D){aj=aj||{};if(aj.width){ae.w=O(aj.width,"x")-a-m}if(aj.innerWidth){ae.w=O(aj.innerWidth,"x")}N.css({width:ae.w});if(aj.height){ae.h=O(aj.height,"y")-g-ai}if(aj.innerHeight){ae.h=O(aj.innerHeight,"y")}if(!aj.innerHeight&&!aj.height){N.css({height:"auto"});ae.h=N.height()}N.css({height:ae.h});L.position(ae.transition==="none"?0:ae.speed)}};L.prep=function(ak){if(!D){return}var an,al=ae.transition==="none"?0:ae.speed;N.remove();N=G(ad,"LoadedContent").append(ak);function aj(){ae.w=ae.w||N.width();ae.w=ae.mw&&ae.mw<ae.w?ae.mw:ae.w;return ae.w}function am(){ae.h=ae.h||N.height();ae.h=ae.mh&&ae.mh<ae.h?ae.mh:ae.h;return ae.h}N.hide().appendTo(k.show()).css({width:aj(),overflow:ae.scrolling?"auto":"hidden"}).css({height:am()}).prependTo(d);k.hide();J(n).css({"float":"none"});if(af){J("select").not(ag.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(u,function(){this.style.visibility="inherit"})}an=function(){var ay,av,aw=c.length,at,ax="frameBorder",ar="allowTransparency",ap,ao,au;if(!D){return}function aq(){if(v){ag[0].style.removeAttribute("filter")}}ap=function(){clearTimeout(A);h.hide();F(U,ae.onComplete)};if(v){if(n){N.fadeIn(100)}}o.html(ae.title).add(N).show();if(aw>1){if(typeof ae.current==="string"){t.html(ae.current.replace("{current}",I+1).replace("{total}",aw)).show()}s[(ae.loop||I<aw-1)?"show":"hide"]().html(ae.next);R[(ae.loop||I)?"show":"hide"]().html(ae.previous);if(ae.slideshow){X.show()}if(ae.preloading){ay=[E(-1),E(1)];while(av=c[ay.pop()]){ao=J.data(av,x).href||av.href;if(J.isFunction(ao)){ao=ao.call(av)}if(C(ao)){au=new Image();au.src=ao}}}}else{B.hide()}if(ae.iframe){at=G("iframe")[0];if(ax in at){at[ax]=0}if(ar in at){at[ar]="true"}at.name=S+(+new Date());if(ae.fastIframe){ap()}else{J(at).one("load",ap)}at.src=ae.href;if(!ae.scrolling){at.scrolling="no"}J(at).addClass(S+"Iframe").appendTo(N).one(i,function(){at.src="//about:blank"})}else{ap()}if(ae.transition==="fade"){ag.fadeTo(al,1,aq)}else{aq()}};if(ae.transition==="fade"){ag.fadeTo(al,0,function(){L.position(0,an)})}else{L.position(al,an)}};L.load=function(al){var ak,am,aj=L.prep;Y=true;n=false;w=c[I];if(!al){T()}F(i);F(e,ae.onLoad);ae.h=ae.height?O(ae.height,"y")-g-ai:ae.innerHeight&&O(ae.innerHeight,"y");ae.w=ae.width?O(ae.width,"x")-a-m:ae.innerWidth&&O(ae.innerWidth,"x");ae.mw=ae.w;ae.mh=ae.h;if(ae.maxWidth){ae.mw=O(ae.maxWidth,"x")-a-m;ae.mw=ae.w&&ae.w<ae.mw?ae.w:ae.mw}if(ae.maxHeight){ae.mh=O(ae.maxHeight,"y")-g-ai;ae.mh=ae.h&&ae.h<ae.mh?ae.h:ae.mh}ak=ae.href;A=setTimeout(function(){h.show()},100);if(ae.inline){G(ad).hide().insertBefore(J(ak)[0]).one(i,function(){J(this).replaceWith(N.children())});aj(J(ak))}else{if(ae.iframe){aj(" ")}else{if(ae.html){aj(ae.html)}else{if(C(ak)){J(n=new Image()).addClass(S+"Photo").error(function(){ae.title=false;aj(G(ad,"Error").text("This image could not be loaded"))}).load(function(){var an;n.onload=null;if(ae.scalePhotos){am=function(){n.height-=n.height*an;n.width-=n.width*an};if(ae.mw&&n.width>ae.mw){an=(n.width-ae.mw)/n.width;am()}if(ae.mh&&n.height>ae.mh){an=(n.height-ae.mh)/n.height;am()}}if(ae.h){n.style.marginTop=Math.max(ae.h-n.height,0)/2+"px"}if(c[1]&&(ae.loop||c[I+1])){n.style.cursor="pointer";n.onclick=function(){L.next()}}if(v){n.style.msInterpolationMode="bicubic"}setTimeout(function(){aj(n)},1)});setTimeout(function(){n.src=ak},1)}else{if(ak){k.load(ak,ae.data,function(ao,an,ap){aj(an==="error"?G(ad,"Error").text("Request unsuccessful: "+ap.statusText):J(this).contents())})}}}}}};L.next=function(){if(!Y&&c[1]&&(ae.loop||c[I+1])){I=E(1);L.load()}};L.prev=function(){if(!Y&&c[1]&&(ae.loop||I)){I=E(-1);L.load()}};L.close=function(){if(D&&!M){M=true;D=false;F(u,ae.onCleanup);Z.unbind("."+S+" ."+aa);Q.fadeTo(200,0);ag.stop().fadeTo(300,0,function(){ag.add(Q).css({opacity:1,cursor:"auto"}).hide();F(i);N.remove();setTimeout(function(){M=false;F(ac,ae.onClosed)},1)})}};L.remove=function(){J([]).add(ag).add(Q).remove();ag=null;J("."+r).removeData(x).removeClass(r).die()};L.element=function(){return J(w)};L.settings=K}(jQuery,document,this));

/*
 * http://www.JSON.org/json2.js (See http://www.JSON.org/js.html) 2011-02-23 Public Domain.
 */
var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

/*
 * Cookie plugin
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php http://www.gnu.org/licenses/gpl.html
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
