// last update: 08-31-2012 @ 11:40
$(document).ready(function ($) {

  'use strict';










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

