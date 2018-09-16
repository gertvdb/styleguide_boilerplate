var changelogOpen = false;

function initChangelog(){
	$('.js-toggle-changelog').click(function(e){
		e.preventDefault();

		if(!changelogOpen){
			changelogOpen = true;
			$(".styleguide__changelog").toggleClass("is-open");
			$('.js-toggle-changelog').html("show less");

		}else{
			changelogOpen = false;
			$(".styleguide__changelog").toggleClass("is-open");
			$('.js-toggle-changelog').html("show more");

		}
	});
}
