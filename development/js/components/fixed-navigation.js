// Fixed navigation

var VAC_FixedNavigation = (function () {


    var VAC_FixedNavigation = function () {
        // CONSTRUCTOR
		this.$nav = $(".js-fixed-navigation");
		this.$window = $(window);

		for(var i = 0; i < this.$nav.length; i++){
			this.init($(this.$nav[i]))
		}
    };

	VAC_FixedNavigation.prototype.init = function() {
		// CUSTOM PUBLIC FUNCTION

		this.$clone = this.$nav.eq(0).clone();
		this.$nav.eq(0).after(this.$clone.addClass('is-fixed'));
		this.$clone.width(this.$nav.width());

		var self = this;
		$(window).resize(function(){
			self.$clone.width(self.$nav.width());
		});

		rAF(function(){
			this._checkNavPosition();
		}.bind(this));
	};

	VAC_FixedNavigation.prototype._checkNavPosition = function(){
	    var hide = _onScroll(this.$nav, this.$window);
		if(hide) this.$clone.hide();
		else this.$clone.show();

	    rAF(function(){
			this._checkNavPosition(this.$nav);
		}.bind(this));
	};

	function _onScroll($el, $window) {

		var top = $window.scrollTop(),
			el = $el.offset().top;

		return el >= top;

	}

    return VAC_FixedNavigation;
})();
