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

    /* Animated Carousel */
    var options = {
        autoPlay: true,
        autoPlayDelay: 4000,
        pauseOnHover: true,
        hidePreloaderDelay: 500,
        nextButton: false,
        prevButton: false,
        pauseButton: false,
        preloader: true,
        hidePreloaderUsingCSS: false,
        animateStartingFrameIn: true,
        navigationSkipThreshold: 750,
        preventDelayWhenReversingAnimations: true,
        keyNavigation: true,
        customKeyEvents: {
            80: "pause"
        }
    };

    var sequence = $("#sequence").sequence(options).data("sequence");

    sequence.afterLoaded = function() {
        $(".navi").fadeIn(100);
        $(".navi li:nth-child("+(sequence.settings.startingFrameID)+") img").addClass("active");
    };

    sequence.beforeNextFrameAnimatesIn = function() {
        $(".navi li:not(:nth-child("+(sequence.nextFrameID)+")) img").removeClass("active");
        $(".navi li:nth-child("+(sequence.nextFrameID)+") img").addClass("active");
    };

    $("#micrositeContentColumnFull").on("click", ".navi li", function() {
        $(this).children("img").removeClass("active").children("img").addClass("active");
        sequence.nextFrameID = $(this).index()+1;
        sequence.goTo(sequence.nextFrameID);
    });

  });

});