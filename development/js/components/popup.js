// Popup toggle

var VAC_Popup = (function () {


    var VAC_Popup = function () {
		this.$toggles = $(".js-popup-toggle");

		for(var i = 0; i < this.$toggles.length; i++){
			this._init($(this.$toggles[i]))
		}
    };

	VAC_Popup.prototype._init = function($toggle) {

		var self = $toggle;
		var $popup = this;

		$toggle.click(function(e){
			e.preventDefault();
			$popup.togglePopup(this);
		});
	};

	VAC_Popup.prototype.togglePopup = function(trigger){
		$(trigger).parents(".m-popup").toggleClass("is-open");
	};

    return VAC_Popup;
})();
