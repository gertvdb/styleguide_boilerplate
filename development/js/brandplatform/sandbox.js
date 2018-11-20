// -------------------------------------------------------------------
// :: INITIALISATION OF THE CONSTRUCTORS (for sandbox)
// -------------------------------------------------------------------
$(document).ready(function(){
  // Change width of iframe
	$( ".js-sandbox-screenSize" ).change(function() {

		var mobileInPx = parseInt($(this).val().replace('em','')) * 16;
		$('iframe').width(mobileInPx);
	});

  // sandbox navigation
	$( ".js-sandbox-placeholder").click(function() {
		$('.sandbox-navigation__list').show();
	});

	$( ".js-sandbox-main").click(function(e) {
		e.preventDefault();

		$(this).next().css('display', 'block');
		$('.sandbox-navigation__mainItem').hide();
		$('.sandbox-navigation__header').html($(this).html());
		$('.sandbox-navigation__header').addClass('js-sandbox-headerSub');
	});

	$( ".js-sandbox-header").on('click',function(e) {
		e.preventDefault();

		if($(this).hasClass('js-sandbox-headerSub')) {
			$('.sandbox-navigation__header').html('sandbox');
			$('.sandbox-navigation__mainItem').show();
			$('.sandbox-navigation__sub').hide();
			$('.sandbox-navigation__header').removeClass('js-sandbox-headerSub');
		} else {
			$('.sandbox-navigation__list').hide();
		}
	});


  // Arrow functions to go to next and prev module
	$("body").keydown(function(e) {
		var url = '';

		if(e.keyCode == 37) {
			if ($(".js-sandbox-active-component").prev('.sandbox-navigation__subItem').length) {
				url = $(".js-sandbox-active-component").prev('.sandbox-navigation__subItem').attr('data-url');
			} else {
				url = $(".js-sandbox-active-component").parents('.sandbox-navigation__main').prev('.sandbox-navigation__main').find('.sandbox-navigation__sub li').last().attr('data-url');
			}
		} else if(e.keyCode == 39) {

			if ($(".js-sandbox-active-component").next('.sandbox-navigation__subItem').length) {
				url =  $(".js-sandbox-active-component").next('.sandbox-navigation__subItem').attr('data-url');
			} else {
				url = $(".js-sandbox-active-component").parents('.sandbox-navigation__main').next('.sandbox-navigation__main').find('.sandbox-navigation__sub').find('.sandbox-navigation__subItem').attr('data-url');
			}
		}

		if (url != '' && url != undefined) {
			window.location.replace('/sandbox/' + url);
		}
	});
});
