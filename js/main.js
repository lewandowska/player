jQuery(function ($) {
	var slider = $('.slider');

    function setDataTimeAttr() {
        var once = 0;
        audioLenght = $('audio').length;

        $('audio').each(function () {
            var audio = $(this)[0];
            audio.addEventListener('loadedmetadata', function() {
            	var minutes = parseInt(audio.duration/ 60, 10);
            	var seconds = parseInt(audio.duration % 60);
                $(audio).attr("data-duration", minutes+":"+seconds);

                if(once == (audioLenght - 1)) {
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
		  	prevArrow: $('.previous'),
		  	nextArrow: $('.next'),
		});
	
	    slider.on('beforeChange', function(event, slick, currentSlide, nextSlide ){

	        var currentAudio = $('.slide').eq(nextSlide).find('audio');
	  
	        var resetAudioTime = $('.slide').not($('.slide').eq(nextSlide)).find('audio');
	        currentAudio[0].play();

	        $(resetAudioTime).each(function (index) {
	            resetAudioTime[index].currentTime = 0;
	            resetAudioTime[index].pause();
	        });

	        var audioDuration = $('.slide').eq(nextSlide).find('audio').data("duration");
	        var nextSong = $('.slide').eq(nextSlide).find('.song-title').text();
	        $('.duration').html(audioDuration);
	        $('.next-song-title').text(nextSong);

	        var currentTime = document.getElementById("current-time");
	        var updateCurrentTime = setInterval(function() {
	        var loadingAnimationDiv = $('.progress-bar-animation');
			if (currentAudio[0].duration > 0 && !currentAudio[0].paused) {
			    let mins = Math.floor(currentAudio[0].currentTime / 60);
			    let secs = Math.floor(currentAudio[0].currentTime % 60);
			    if (secs < 10) {
			        secs = '0' + String(secs);
			    }
			    currentTime.innerHTML = mins + ':' + secs;
			  	}
				}, 10);
	    	})
	};
	
	var bottomBurger = $('.bottom-burger');
	var burger = $('.burger');
	var backButton = $('.btn-hide');
	var playButton = $('.play');

	bottomBurger.click(function () {
	    $(this).parent().toggleClass('active');
	});

	burger.click(function () {
	   	$(this).parent().toggleClass('active');
	});

	backButton .click(function () {
	    $(this).closest('.navigation-bottom').removeClass('active');
	});
	
	playButton .click(function () {
	    var main = $('.app');
	   	$(this).toggleClass('active');
	    main.toggleClass('active');
	});
	
	setDataTimeAttr();
});