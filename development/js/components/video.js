// Video


var VAC_Video = (function () {


    var VAC_Video = function () {
        // CONSTRUCTOR
		this.$video = $(".a-video");

		for(var i = 0; i < this.$video.length; i++){
			this.init($(this.$video[i]))
		}
    };

	VAC_Video.prototype.init = function($video) {
		// CUSTOM PUBLIC FUNCTION

		$video.find(".js-video-play-pause").click(function(){
			_playPauseVideo($video);
		})
	};

    function _playPauseVideo($video){
	    var videoSrc = $video.find("video").get(0);
	    var videoOverlay = $video.find(".a-video__overlay");
	    var videoPlay = $video.find(".a-video__play");
	    var videoPause = $video.find(".a-video__pause");

		if (videoSrc.paused == true) {
			videoOverlay.fadeOut();
			videoPause.show();
			videoPlay.hide();
			videoSrc.play();
		} else {
			videoSrc.pause();
			videoPause.hide();
			videoPlay.show();
		}
	}

    return VAC_Video;
})();
