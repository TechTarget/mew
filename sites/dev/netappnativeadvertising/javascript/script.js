// last update: 12-12-12
$(document).ready(function ($) {

	'use strict';

  $('#micrositeContent').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
    addThisButtonOrientation: 'vertical',
    addThisButtonSize: 'large',
    addThisButtonFollow: true
  });

  $('#articleToolbar').addThisShare();

  // what's that? you want more stupid kludges? here you go:
  var socialMediainArticleToolbar = $('.micrositeSocialMediaButtons');
  if (socialMediainArticleToolbar.length) {
    socialMediainArticleToolbar.show();
    $('#micrositeSocialMediaNav, #micrositeSocialMediaFooter').hide();
  }
  //hide social for news archive, this is another kludge until it's turned off in the template
  var microsite = window.microsite || false;
  if (microsite) {
    if ('NetAppNativeAdvertisingSponsoredNewsArchive' === microsite) {
      $('#micrositeSocialMediaNav, #micrositeSocialMediaFooter').hide();
    }
  }

});

/*!
* AddThis Share v1.0.3 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";var i="addThisShare",a={addThisApiVersion:"300",addThisButtons:["email","linkedin","facebook","twitter"],addThisCss:!0,addThisButtonSize:"small",addThisButtonOrientation:"horizontal",addThisButtonFollow:!1,addThisButtonFollowBoundary:"",googleAnalyticsId:!1},d=function(i,d){this.el=i,this.options=t.extend({},a,d),this.init()};d.prototype={init:function(){this.$el=t(this.el),this.addThisButtonsContainer={},this.addThisScript="//s7.addthis.com/js/"+this.options.addThisApiVersion+"/addthis_widget.js",this.addThisConfiguration={pubid:"ra-4f0c7ed813520536",url:window.location.pathname,ui_use_css:this.options.addThisCss,domready:!0,async:!0,data_track_clickback:!1,data_track_addressbar:!1,data_ga_tracker:window.SITE_gaAccountID||!1,data_ga_social:!0};var i=this;this.loadAddthisScript(function(){i.isAddthisLoaded()===!0&&window.addthis_config===void 0&&(window.addthis_config=i.addThisConfiguration),i.$el.append(i.buildAddthisHtml(i.options.addThisButtons)),i.options.addThisButtonFollow&&i.initializeFollow()})},isAddthisLoaded:function(){return window.addthis===void 0?!1:!0},loadAddthisScript:function(i){t.ajax({url:this.addThisScript,cache:!0,dataType:"script"}).done(function(){i!==void 0&&i.call()})},buildAddthisHtml:function(i){var a={email:{className:"addthis_button_email",title:"Email A Friend"},linkedin:{className:"addthis_button_linkedin",title:"Share on LinkedIn"},facebook:{className:"addthis_button_facebook",title:"Share on Facebook"},twitter:{className:"addthis_button_twitter",title:"Share on Twitter"},googleplus:{className:"addthis_button_google_plusone_share",title:"Share on Google+"},addthis:{className:"addthis_button_compact",title:"Share with AddThis Services"}},d={small:"addthis_default_style",medium:"addthis_20x20_style",large:"addthis_32x32_style"},s={horizontal:"addThisHorizontal",vertical:"addThisVertical"},o=function(t){for(var i="",d=0,s=t.length;s>d;d++)t[d]in a&&(i+='<a class="'+a[t[d]].className+'" title="'+a[t[d]].title+'" href="#"></a>');return i},n=t("<div>",{"class":"socialShare-addThis "+s[this.options.addThisButtonOrientation]+" "+d[this.options.addThisButtonSize],html:o(i)});return this.addThisButtonsContainer=n,n},initializeFollow:function(){var i,a,d,s=this.addThisButtonsContainer,o=s.offset().top,n=2*parseInt(s.css("top"),0),e=this.$el.height(),h=t(window);h.on("scroll",function(){var t=function(){return i===void 0&&(i=s.height()),a=Math.max(n,h.scrollTop()-(o-n)),d=e-i,d>a?a:d};s.css("top",t())})}},t.fn[i]=function(a){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new d(this,a))})}});
