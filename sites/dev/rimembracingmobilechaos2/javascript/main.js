require({

  paths: {
    'jquery': '../../_global/javascript/jquery-1.8.2',
    'addThisShare': '../../_global/javascript/addThisShare',
    'sequence': '../../_global/javascript/sequence',
    'contentMatrix': '../../_global/javascript/contentMatrix',
    'featuredVideo': '../../_global/javascript/featuredVideo'
  }

}, [
    'require',
    'jquery',
    'addThisShare',
    'sequence',
    'contentMatrix',
    'featuredVideo'
  ],

function (req, $) {

  $(document).ready(function ($) {

    /* addthis social share component */
    $('#micrositeHeader').addThisShare({
      addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
      addThisProfileID: 'ra-4f0c7ed813520536',
      googleAnalyticsId: window.SITE_gaAccountID || false
    });

    /* featured video component */
    $('.featuredVideo').featuredVideo({
      autoplayFirstVideo: true,
      showPlaylist: true,
      showPlaylistTooltips: true,
      tooltipHtml: '<div class="featuredVideoPlaylistTooltip"></div>'
    });

    /* content matrix component */
    $('.micrositeContentGrid').contentMatrix({
      effectType: 'hover',
      effectSpeed: 500
    });

    // if user clicks inside content grid on a video link
    // make sure the video player gets scrolled into viewport
    var vid = $('.featuredVideo');
    $('.micrositeContentGrid').on('click', 'a', function (e) {
      if (vid.length && window.location.pathname === e.currentTarget.pathname) {
        vid.get(0).scrollIntoView(true);
      } else {
        return;
      }
    });
  });

});