// -------------------------------------------------------------------
// :: INITIALISATION OF THE CONSTRUCTORS (for page)
// -------------------------------------------------------------------
$(document).ready(function(){
  // Arrow functions to go to next and prev module
	$("body").keydown(function(e) {
		var path = "/styleguides/"+$( "body" ).data( "styleguide" )+"/pages/";
		var pathName =  window.location.pathname.replace(path,'').replace('.html', '');


    // Current item
		if(e.keyCode == 37) {
			for (i = 0; i < pages.length; i++) {
					console.log(pages[i].path == pathName, pathName, pages[i].path);
				if (pages[i].path == pathName) {
					if (i == 0) {
						window.location = path + pages[pages.length - 1].path + $( "body" ).data( "extension" );
					} else  {
						window.location = path + pages[i - 1].path + $( "body" ).data( "extension" );
					}
				}
			}
		} else if(e.keyCode == 39) {
			for (i = 0; i < pages.length; i++) {
				if (pages[i].path == pathName) {
					if (i == pages.length - 1) {
						window.location = path + pages[0].path + $( "body" ).data( "extension" );
					} else  {
						window.location = path + pages[i + 1].path + $( "body" ).data( "extension" );
					}
				}
			}
		}
	});
});
