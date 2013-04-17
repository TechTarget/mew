$(document).ready(function() {

	'use strict';

	$('.openContestRules').on('click', function(e) {
		e.preventDefault();
		$('.rimMobileChaosModal').reveal({
			animation: 'fadeAndPop',
			animationspeed: 200,
			closeonbackgroundclick: true,
			dismissmodalclass: 'rimMobileChaosModalClose'
		});
	});

	// testing Amol's email API from non-techtarget domain
	(function() {

		// server location to submit the form to
		var emailEndpoint = '/vgn-ext-templating/techtarget/email/post.json';

		// email data to post
		var emailObj = {

			emailType : 'SIMPLE_TEXT',
			fromAddress : {
				emailId : 'email-test-dont-reply@techtarget.com'
			},
			toAddresses : [
				{ emailId : 'sford@techtarget.com'	},
				{ emailId : 'mwigmanich@techtarget.com'	}
			],
			emailSubject : 'Testing email api...',
			emailTextBody : 'If you receive this then we can send emails from microsites.'

		};

		// user double-clicks the h1 content... while holding down the shift key
		$('#micrositeHeaderBanner').find('h1').on('dblclick', function(e) {

			if (e.shiftKey) {

				console.log('Attempting to send email...');

				var request = $.ajax({
					url: emailEndpoint,
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(emailObj)
				});

				request.done(function (data) {

					// if we have a successful post
					if (data.success === true) {
						console.log('Email successfuly sent...');
					} else {
						console.log(data.emailStatusMsg); // log any errors that have been returned
					}

				});

				request.fail(function(jqXHR, textStatus) {
					console.log('Email post request failed because: ' + textStatus);
				});

			}

		});

	})();

});

/* jQuery Reveal Plugin 1.0 | www.ZURB.com | Copyright 2010, ZURB | Free to use under the MIT license. | http://www.opensource.org/licenses/mit-license.php */
(function(a){a("a[data-reveal-id]").live("click",function(c){c.preventDefault();var b=a(this).attr("data-reveal-id");a("#"+b).reveal(a(this).data())});a.fn.reveal=function(b){var c={animation:"fadeAndPop",animationspeed:300,closeonbackgroundclick:true,dismissmodalclass:"close-reveal-modal"};var b=a.extend({},c,b);return this.each(function(){var k=a(this),g=parseInt(k.css("top")),i=k.height()+g,f=false,h=a(".reveal-modal-bg");if(h.length==0){h=a('<div class="reveal-modal-bg" />').insertAfter(k)}k.bind("reveal:open",function(){h.unbind("click.modalEvent");a("."+b.dismissmodalclass).unbind("click.modalEvent");if(!f){j();if(b.animation=="fadeAndPop"){k.css({top:a(document).scrollTop()-i,opacity:0,visibility:"visible"});h.fadeIn(b.animationspeed/2);k.delay(b.animationspeed/2).animate({top:a(document).scrollTop()+g+"px",opacity:1},b.animationspeed,d())}if(b.animation=="fade"){k.css({opacity:0,visibility:"visible",top:a(document).scrollTop()+g});h.fadeIn(b.animationspeed/2);k.delay(b.animationspeed/2).animate({opacity:1},b.animationspeed,d())}if(b.animation=="none"){k.css({visibility:"visible",top:a(document).scrollTop()+g});h.css({display:"block"});d()}}k.unbind("reveal:open")});k.bind("reveal:close",function(){if(!f){j();if(b.animation=="fadeAndPop"){h.delay(b.animationspeed).fadeOut(b.animationspeed);k.animate({top:a(document).scrollTop()-i+"px",opacity:0},b.animationspeed/2,function(){k.css({top:g,opacity:1,visibility:"hidden"});d()})}if(b.animation=="fade"){h.delay(b.animationspeed).fadeOut(b.animationspeed);k.animate({opacity:0},b.animationspeed,function(){k.css({opacity:1,visibility:"hidden",top:g});d()})}if(b.animation=="none"){k.css({visibility:"hidden",top:g});h.css({display:"none"})}}k.unbind("reveal:close")});k.trigger("reveal:open");var e=a("."+b.dismissmodalclass).bind("click.modalEvent",function(){k.trigger("reveal:close")});if(b.closeonbackgroundclick){h.css({cursor:"pointer"});h.bind("click.modalEvent",function(){k.trigger("reveal:close")})}a("body").keyup(function(l){if(l.which===27){k.trigger("reveal:close")}});function d(){f=false}function j(){f=true}})}})(jQuery);