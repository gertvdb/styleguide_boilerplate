function initScrollNav() {
	//******* BUILD SCROLLNAV *******//

	if($(".js-scroll-nav").length){
	// create container
		var $scrollNav = $( "<ol class=\"sg-scrollnav\"></ol>" );
		$("body").prepend($scrollNav);
	}

	// loop through main sections
	$(".js-scroll-nav").find(".js-scroll-nav__title").each(function(i){
		var $name = $(this).html();
		var $link = $name.replace(/\s+/g, '-').toLowerCase();

		// add name link
		var $anchor = $("<a id='" + $link + "' class=\"sg-scrollnav__anchor\"></a>");
		$(this).before($anchor);

		// add to sidenav
		var $navSection = $("<li></li>");
		var $link = $("<a href='#" + $link + "' id='sg_" + $link + "'>" + $name + "</a>");
		$navSection.append($link);

		// add container for subsections if needed
		var $navSubSection = $("<ol></ol>");
		if($(this).parent().next().find(".js-scroll-nav__sub-title").length){
			$navSection.append($navSubSection);
		}



		// loop through subsections
		$(this).parent().next().find(".js-scroll-nav__sub-title").each(function(j){

			console.log($(this));

			var $subName = $(this).html();
			var $subLink = $subName.replace(/\s+/g, '-').toLowerCase();

			// add name link
			var $anchor = $("<a id='" + $subLink + "' class=\"sg-scrollnav__anchor\"></a>");
			$(this).before($anchor);

			// add to sidenav
			var $subItem = $("<li><a href='#" + $subLink + "' id='sg_sub_" + $subLink + "'>" + $subName + "</a></li>");
			$navSubSection.append($subItem);

		});

		$scrollNav.append($navSection);
	});


	//******* SHOW ACTIVE ELEMENT *******//
	var navItems;
	var subItems;

	// get offset of all navigation elements
	$(window).resize(function(){
		getOffSets();
	});

	$(window).load(function(){
		getOffSets();
	});

	function getOffSets(){
		navItems = [];
		subItems = [];

		$(".js-scroll-nav").find(".js-scroll-nav__title").each(function(i){
			var $name = $(this).html();
			var link = $name.replace(/\s+/g, '-').toLowerCase();
			var offset = $(this).offset().top;

			navItems.push([]);

			navItems[i][0] = link;
			navItems[i][1] = offset;
		});

		$(".js-scroll-nav").find(".js-scroll-nav__sub-title").each(function(i){
			var $name = $(this).html();
			var link = $name.replace(/\s+/g, '-').toLowerCase();
			var offset = $(this).offset().top;

			subItems.push([]);
			subItems[i][0] = link;
			subItems[i][1] = offset;
		});
	}

	var activeItem;
	var activeSubItem;

	// find active element
	$(window).scroll(function(){
		var newActiveItem = "";
		var newSubActiveItem = "";

		var scrollTop = $(window).scrollTop() + 20;

		if(navItems) {
            for (var i = 0; i < navItems.length; i++) {
                if (scrollTop >= navItems[i][1]) {
                    newActiveItem = navItems[i][0];
                    updateMenu(newActiveItem);
                }
            }
        }

        if(subItems) {
            for(var j = 0; j < subItems.length; j++) {
                if (scrollTop >= subItems[j][1]) {
                    newSubActiveItem = subItems[j][0];

                    updateSubMenu(newSubActiveItem);

                }
            }
		}
	});

	function updateMenu(newActiveItem){
		if(newActiveItem != activeItem){
			$("#sg_" + activeItem).toggleClass("is-active");
			$("#sg_" + newActiveItem).toggleClass("is-active");
			activeItem = newActiveItem;
		}
	}

	function updateSubMenu(newSubActiveItem){
		if(newSubActiveItem != activeSubItem){
			$("#sg_sub_" + activeSubItem).toggleClass("is-active");
			$("#sg_sub_" + newSubActiveItem).toggleClass("is-active");
			activeSubItem = newSubActiveItem;
		}
	}
}
