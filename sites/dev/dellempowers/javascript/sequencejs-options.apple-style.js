$(document).ready(function(){
    $status = $(".status");
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
    }

    sequence.beforeNextFrameAnimatesIn = function() {
        $(".navi li:not(:nth-child("+(sequence.nextFrameID)+")) img").removeClass("active");
        $(".navi li:nth-child("+(sequence.nextFrameID)+") img").addClass("active");
    }
    
    $("#micrositeContentColumnFull").on("click", ".navi li", function() {
        $(this).children("img").removeClass("active").children("img").addClass("active");
        sequence.nextFrameID = $(this).index()+1;
        sequence.goTo(sequence.nextFrameID);
    });
});