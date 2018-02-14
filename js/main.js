jQuery(function ($) {
	var slider = $('.slider');

    function setDataTimeAttr() {
        var once = 0;
        videoLenght = $('audio').length;

        $('audio').each(function () {
            var audio = $(this)[0];
            audio.addEventListener('loadedmetadata', function() {
            	var minutes = parseInt(audio.duration/ 60, 10);
            	var seconds = parseInt(audio.duration % 60);
                $(audio).attr("data-duration",minutes+":"+seconds);

                if(once == (videoLenght - 1)) {
                    initSlickSlider();  
                }
                once++;
            });
        });
    }
    function initSlickSlider() {
		slider.slick({
		  	centerMode: true,
		  	slidesToShow: 1,
		  	variableWidth: true,
		  	prevArrow: $('#previous'),
		  	nextArrow: $('#next'),
		});
	    slider.on('beforeChange', function(event, slick, currentSlide, nextSlide ){

	        var currentVideo = $('.slide').eq(nextSlide).find('audio');
	        var resetVideoTime = $('.slide').not($('.slide').eq(nextSlide)).find('audio');
	        currentVideo[0].play();

	        $(resetVideoTime).each(function (index) {
	            resetVideoTime[index].currentTime = 0;
	            resetVideoTime[index].pause();
	        });

	        var audioDuration = $('.slide').eq(nextSlide).find('audio').data("duration");
	        $('.duration').html(audioDuration);

	    })
	};
	setDataTimeAttr();
});
