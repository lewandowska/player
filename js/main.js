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
                $(audio).attr("data-duration",minutes+":"+seconds);

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

	        var currentVideo = $('.slide').eq(nextSlide).find('audio');
	        var resetVideoTime = $('.slide').not($('.slide').eq(nextSlide)).find('audio');
	        currentVideo[0].play();

	        $(resetVideoTime).each(function (index) {
	            resetVideoTime[index].currentTime = 0;
	            resetVideoTime[index].pause();
	        });

	        var audioDuration = $('.slide').eq(nextSlide).find('audio').data("duration");
	        var nextSong = $('.slide').eq(nextSlide).find('.song-title').text();
	        $('.duration').html(audioDuration);
	        $('.next-song-title').text(nextSong);

	    })
	};
	setDataTimeAttr();
	
	var bottomBurger = $('.bottom-burger');
	var burger = $('.burger');
	var backButton = $('.btn-hide');
	var playButton = $('.play');

	bottomBurger.click(function () {
	    var $this = $(this);
	    $this.parent().toggleClass('active');
	});

	burger.click(function () {
	    var $this = $(this);
	    $this.parent().toggleClass('active');
	});


	backButton .click(function () {
	    var $this = $(this);
	    $this.closest('.navigation-bottom').removeClass('active');
	});

	
	playButton .click(function () {
	    var $this = $(this);
	    var main = $('.app');
	    $this.toggleClass('active');
	    main.toggleClass('active');
	});





	var fft, // Allow us to analyze the song
    numBars = 1024, // The number of bars to use; power of 2 from 16 to 1024
    song; // The p5 sound object

	// Load our song
	$('#play').click(function () {
	  
	        if(typeof song != "undefined") { // Catch already playing songs
	            song.disconnect();
	            song.stop();
	        }
	        
	        // Load our new song
	        song = loadSound('img/audio1.mp3');
	        loader.classList.add("loading");
	    
	});

	var canvas;
	function setup() { // Setup p5.js
	    canvas = createCanvas(windowWidth, windowHeight);
	}

	function draw() {
	    background(51);
	    
	    if(typeof song != "undefined" 
	       && song.isLoaded() 
	       && !song.isPlaying()) { // Do once
	        loader.classList.remove("loading");
	        
	        song.play();
	        song.setVolume(0.5);

	        fft = new p5.FFT();
	        fft.waveform(numBars);
	        fft.smooth(0.85);
	    }
	    
	    if(typeof fft != "undefined") {
	        var spectrum = fft.analyze();
	        noStroke();
	        fill("rgb(0, 255, 0)");
	        for(var i = 0; i < numBars; i++) {
	            var x = map(i, 0, numBars, 0, width);
	            var h = -height + map(spectrum[i], 0, 255, height, 0);
	            rect(x, height, width / numBars, h);
	        }
	    }
	}

	function windowResized() {
	  resizeCanvas(windowWidth, windowHeight);
	}
});
