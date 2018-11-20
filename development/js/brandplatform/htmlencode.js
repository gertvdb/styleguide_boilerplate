function escapeHtml(string) {
	return String(string).replace(/[\u00A0-\u9999<>\&]/g, function(i) {
		return '&#' + i.charCodeAt(0) + ';';
	});
}

function addbreaks(string) {
	var string = String(string).replace(/[\n]/g, function(s) {
		return '<br>';
	});

	string = string.replace('<br>', ''); // remove trailing <br>
	string = string.replace(/<br>(?![\s\S]*<br>)/, ''); // remove leading <br>

	return string;
}

function escapeSpaces(string) {
	return String(string).replace(/[ ]/g, function(s) {
		return '&nbsp;';
	});
}

function escapeTabs(leadingTabs, string) {
	var string = String(string).replace(/[\t]/g, function(s) {
		return '&nbsp;&nbsp;&nbsp;&nbsp;';
	});

	var replace = Array(leadingTabs + 1).join('&nbsp;&nbsp;&nbsp;&nbsp;'); // replace amount of leading tabs * tab character

	string = string.replace(new RegExp(replace, "g"), function(s) {
		return '';
	});

	return string;
}

$(".js-encode-html").each(function(index, obj) {
	var html = obj.innerHTML;

	html = escapeHtml(html);
	html = addbreaks(html);
	html = escapeSpaces(html);
	html = escapeTabs(html.match(/\t+/g)[0].length, html);

	obj.innerHTML = html;
});

// Highlight
function initHighlightBoxes(){
	$('.styleguide__highlight-box').each(function(){
		if($(this).height() > 150){
			$(this).css({"height": "50px" });
			$(this).append('<a href="#" class="js-show-code">show code</a>');

		}else{
			$(this).addClass("is-open");
		}
	});

	$('.js-show-code').click(function(e){
		e.preventDefault();
		if($(this).parent().hasClass("is-open")){
			$(this).parent().animate({"height": "50px"}, 200);
			$(this).html("show code");
		}else{
			$(this).parent().animate({"height": $(this).parent().find("code").height() + 44 + "px"}, 200);
			$(this).html("hide code");
		}

		$(this).parent().toggleClass("is-open");
	});
}
