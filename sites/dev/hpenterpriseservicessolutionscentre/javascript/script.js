/* last update: 2013-04-10 */
$(document).ready(function () {

	'use strict';

  // addthis social share component
  $('#micrositeHeader').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
    googleAnalyticsId: window.SITE_gaAccountID || false
  });

  // init content tabs component
  $('.contentTabs').contentTabs({
    tabLocation: 'left'
  });

  // returns a contact button that can be appended to the dom
  var getContactButton = function(id) {

    var lang = id.slice(12);

    var buttonLanguageMap = {

      English: {
        text: 'Contact HP',
        url: 'http://www8.hp.com/us/en/contact-hp/contact.html'
      },

      Chinese: {
        text: '联系方式 HP',
        url: 'http://www8.hp.com/cn/zh/contact-hp/contact.html'
      },

      Japanese: {
        text: 'お問い合わせ HP',
        url: 'http://www8.hp.com/jp/ja/contact-hp/contact.html'
      }

    };

    var button = $('<a>', {
      'class': 'button',
      text: buttonLanguageMap[lang].text,
      href: buttonLanguageMap[lang].url
    }).on('click', function(e) {
      e.preventDefault();
      window.open(this.href);
    });

    return button;

  };

  // append language-specific contact button
  $('#contentTabs-English, #contentTabs-Chinese, #contentTabs-Japanese').each( function() {

    $(this)
      .find('.contentTabsNav')
      .append( getContactButton(this.id) );

  });

  /* featured video component */
  $('.featuredVideo').featuredVideo({
    showPlaylist: true,
    autoplayFirstVideo: false
  });

});

/*!
* AddThis Share v1.0.3 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";var i="addThisShare",a={addThisApiVersion:"300",addThisButtons:["email","linkedin","facebook","twitter"],addThisCss:!0,addThisButtonSize:"small",addThisButtonOrientation:"horizontal",addThisButtonFollow:!1,addThisButtonFollowBoundary:"",addThisTwitterTemplate:"{{title}} {{url}}",googleAnalyticsId:!1},d=function(i,d){this.el=i,this.options=t.extend({},a,d),this.init()};d.prototype={init:function(){this.$el=t(this.el),this.addThisButtonsContainer={},this.addThisScript="//s7.addthis.com/js/"+this.options.addThisApiVersion+"/addthis_widget.js",this.addThisConfiguration={pubid:"ra-4f0c7ed813520536",url:window.location.pathname,ui_use_css:this.options.addThisCss,domready:!0,async:!0,data_track_clickback:!1,data_track_addressbar:!1,data_ga_tracker:window.SITE_gaAccountID||!1,data_ga_social:!0};var i=this;this.isAddThisLoaded||this.loadAddthisScript(function(){i.isAddthisLoaded()===!0&&window.addthis_config===void 0&&(window.addthis_config=i.addThisConfiguration,window.addthis_share={templates:{twitter:i.options.addThisTwitterTemplate}}),i.$el.append(i.buildAddthisHtml(i.options.addThisButtons)),i.options.addThisButtonFollow&&i.initializeFollow(),i.addThisButtonsContainer.show()})},isAddthisLoaded:function(){return window.addthis===void 0?!1:!0},loadAddthisScript:function(i){t.ajax({url:this.addThisScript,cache:!0,dataType:"script"}).done(function(){i!==void 0&&i.call()})},buildAddthisHtml:function(i){var a={email:{className:"addthis_button_email",title:"Email A Friend"},linkedin:{className:"addthis_button_linkedin",title:"Share on LinkedIn"},facebook:{className:"addthis_button_facebook",title:"Share on Facebook"},twitter:{className:"addthis_button_twitter",title:"Share on Twitter"},googleplus:{className:"addthis_button_google_plusone_share",title:"Share on Google+"},addthis:{className:"addthis_button_compact",title:"Share with AddThis Services"}},d={small:"addthis_default_style",medium:"addthis_20x20_style",large:"addthis_32x32_style"},s={horizontal:"addThisHorizontal",vertical:"addThisVertical"},o=function(t){for(var i="",d=0,s=t.length;s>d;d++)t[d]in a&&(i+='<a class="'+a[t[d]].className+'" title="'+a[t[d]].title+'" href="#"></a>');return i},n=t("<div>",{"class":"socialShare-addThis "+s[this.options.addThisButtonOrientation]+" "+d[this.options.addThisButtonSize],html:o(i)});return this.addThisButtonsContainer=n,n},initializeFollow:function(){var i,a=this.addThisButtonsContainer,d=a.offset().top,s=2*parseInt(a.css("top"),0),o=178,n=this.$el.height(),e=n-o,h=t(window);h.on("scroll",function(){var t=function(){return i=Math.max(s,h.scrollTop()-(d-s)),e>i?i:e};a.css("top",t())})}},t.fn[i]=function(a){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new d(this,a))})}});

/*!
* Content Tabs v1.0.2 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";function s(s,e){this.el=t(s),this.options=t.extend({},a,e),this._defaults=a,this._name=i,this.tabs=!1,this.panels=!1,this.init()}var i="contentTabs",a={displayTabs:!0,pinPanelIntro:!1,tabLocation:"left",tabActiveClass:"active",panelActiveClass:"active",mouseEvent:"click"};s.prototype={init:function(){if(!this.options.displayTabs)return this.removeTabs(),void 0;this.setTabLocation(this.tabLocationClassName[this.options.tabLocation]),this.options.pinPanelIntro&&this.el.addClass("pinPanelIntro");var s=this.getTabs();s.hasClass("active")||s.eq(0).addClass("active"),s.eq(s.length-1).addClass("last");var i,a=this;s.on("click",function(s){s.preventDefault(),i=t(this).index(),a.selectTab(i),a.selectPanel(i)})},tabLocationClassName:{left:"tabsVerticalLeft",right:"tabsVerticalRight",top:"tabsHorizontalTop",bottom:"tabsHorizontalBottom"},setTabLocation:function(t){this.el.addClass(t)},getTabs:function(){return this.tabs||(this.tabs=this.el.find(".contentTabsNav").find("li")),this.tabs},selectTab:function(t){this.getTabs().removeClass("active").eq(t).addClass("active")},removeTabs:function(){this.el.addClass("tabsNone"),this.getTabs().remove()},getPanels:function(){return this.panels||(this.panels=this.el.find(".contentTabsPanel")),this.panels},selectPanel:function(t){this.getPanels().hide().eq(t).show()}},t.fn[i]=function(a){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new s(this,a))})}});

/*!
* Featured Video v1.0.5 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(i){"function"==typeof define&&define.amd?define(["jquery"],i):i(jQuery)})(function(i){"use strict";var t="featuredVideo",e={autoplayFirstVideo:!0,defaultVideoId:!1,supportsDeepLinking:!0,showPlaylist:!0,showPlaylistTooltips:!0,tooltipHtml:'<div class="featuredVideoPlaylistTooltip"></div>'},s=function(t,s){this.el=t,this.$element=i(this.el),this.options=i.extend({},e,s),this.activeVideoId=null,this.hashVideoId=this.getVideoIdFromUrl(),this.player=this.$element.find(".featuredplayer"),this.playlist=this.$element.find(".featuredVideoPlaylist"),this.playlistVideos=this.playlist.find("li"),this.playlistVideosCount=this.playlistVideos.length,this.playlistFirstVideoEl=this.playlistVideos.eq(0),this.playlistFirstVideoId=this.playlistFirstVideoEl.data("videoId")||null,this.playOnHashChange=!0,this.init()};s.prototype={init:function(){this.sanityCheck(),this.options.supportsDeepLinking&&this.initializeHashLinking(),this.getPlayer()},player:{},sanityCheck:function(){if(0>=this.playlistVideosCount||!this.playlistFirstVideoId||""===this.playlistFirstVideoId)return this.$element.hide(),i.error("no video ids specified in featured video playlist!");var t=this.getDuplicatePlaylistIds();t.length>0&&console.error("WARNING! duplicate ids found in the featured video playlist: ",t)},getPlayer:function(){var t={url:"http://admin.brightcove.com/js/BrightcoveExperiences.js",isLoaded:i(document).data("playerScriptLoaded")||!1},e=this,s=t.isLoaded?this.resolve():this.loadPlayerScript(t.url);i.when(s).done(function(){e.initializePlayer()}).fail(function(){i.error("Brightcove script failed to load")})},loadPlayerScript:function(t){var e=i.ajax(t,{dataType:"script"});return e},initializePlayer:function(){var i=this,t=window.brightcove||{};window.brightcovePlayerLoaded=function(e){var s=t.api.getExperience(e);i.player=s.getModule(t.api.modules.APIModules.VIDEO_PLAYER)},window.brightcovePlayerReady=function(){var t=i.options.autoplayFirstVideo?"load":"cue";i.playVideo(t,i.getVideoId()),i.initializePlaylist()},t.createExperiences()},playVideo:function(i,t,e){e===void 0&&(e="none"),"load"===i?this.player.loadVideoByID(t):"cue"===i&&this.player.cueVideoByID(t),this.options.showPlaylist&&this.activatePlaylistItem(void 0,e)},getVideoId:function(i){return this.activeVideoId=i!==void 0?i.data("videoId"):this.hashVideoId&&this.hasValidId(this.hashVideoId)?this.hashVideoId:this.playlistFirstVideoId,this.activeVideoId},hasValidId:function(i){for(var t=this.getPlaylistIds(),e=0,s=t.length;s>e;e++)if(t[e]===i)return!0;return!1},activatePlaylistItem:function(i,t){i===void 0&&(i=this.playlist.find('li[data-video-id="'+this.activeVideoId+'"]')),"click"!==t&&this.bringPlaylistItemIntoView(i.get(0)),this.playlistVideos.removeClass("active"),i.addClass("active")},bringPlaylistItemIntoView:function(i){return i===void 0?!1:(i.scrollIntoViewIfNeeded?i.scrollIntoViewIfNeeded(!0):i.scrollIntoView(!0),void 0)},updateUrlHash:function(i){this.options.supportsDeepLinking&&(window.location.hash="videoId="+i)},initializePlaylist:function(){if(!this.options.showPlaylist)return this.playlist.remove(),this.$element.addClass("noPlaylist"),void 0;var t=this;this.playlistVideos.on("click",function(e){e.preventDefault();var s=i(this).data("videoId");t.updateUrlHash(s),t.activeVideoId=s,t.playOnHashChange=!1,t.playVideo("load",s,e.type)}),this.options.showPlaylistTooltips&&this.initializePlaylistTooltips(),this.playlist.css("visibility","visible")},initializePlaylistTooltips:function(){var t=i(this.options.tooltipHtml),e=this.playlist.offset();this.$element.append(t),this.playlistVideos.on({mouseenter:function(){var s=i(this),o=s.find(".featuredVideoSummary").text(),l={top:s.offset().top-e.top};""!==o&&t.text(o).css("top",l.top).show()},mouseleave:function(){t.hide()}})},getPlaylistIds:function(){var t=[];return this.playlistVideos.each(function(){var e=""+i(this).data("videoId");t.push(e)}),t},getDuplicatePlaylistIds:function(){for(var i,t=this.getPlaylistIds(),e=[],s={},o=0,l=t.length;l>o;o++)i=""+t[o],s[i]===void 0?s[i]=!0:e.push(i);return e},initializeHashLinking:function(){if("onhashchange"in window){var t=this;i(window).on("hashchange",function(i){i.preventDefault(),t.playOnHashChange&&(t.activeVideoId=t.getVideoIdFromUrl(),t.playVideo("load",t.activeVideoId)),t.playOnHashChange=!0})}},getVideoIdFromUrl:function(){var i=this.getArgsFromUrl().videoId||this.getArgsFromUrl().bctid;return i===void 0&&(i=null),i},getArgsFromUrl:function(i){i=i||window.location.href;for(var t={},e=i.slice(i.indexOf("#")+1).split("&"),s=0,o=e.length;o>s;s++){var l=e[s].split("=");t[l[0]]=l.length>1?l[1]:null}return t}},i.fn[t]=function(e){return this.each(function(){i.data(this,"plugin_"+t)||i.data(this,"plugin_"+t,new s(this,e))})}});
