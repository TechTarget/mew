$(document).ready(function ($) {

  /* addthis social share component */
  $('#micrositeHeader').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
    googleAnalyticsId: window.SITE_gaAccountID || false
  });

  /* filmstrip carousel component */
  $('.filmstrip').filmstripCarousel({
    autoplay: true,
    autoplaySpeed: 5000,
    itemsToShow: 1,
    linkEntireItem: true,
    navigation: false,
    navigationPosition: 'Inside',
    pagination: true,
    verboseClasses: true
  });

  /* featured video component */
  $('.featuredVideo').featuredVideo({
    autoplayFirstVideo: true,
    supportsDeepLinking: true,
    showPlaylist: true,
    showPlaylistTooltips: false
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