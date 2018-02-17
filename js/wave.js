function documentReady(fn) {
    if (document.attachEvent ? document.documentReadyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}


 var sketch = function(p) {
    var numBars = 1024;
    var fft;

    p.setup = function(){
        canvas = p.createCanvas(570,100); 
        canvas.parent('equalizer');   
        fft = new p5.FFT();      
        fft.setInput(song);
        fft.waveform(numBars);
        fft.smooth(0.7);
    }
    p.draw = function(){
 
        p.noStroke();
        p.fill("rgb(0, 255, 0)");
        p.clear();    
        var spectrum = fft.analyze();
        var numBars = 1024;

        for(var i = 0; i < numBars; i++) {
            var x = p.map(i, 0, numBars, 0, p.width);
            var h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
            p.rect(x, p.height, p.width / numBars, h);
        }
    }
};

var song;

function app() {
    AOS.init({
        duration: 1200,
    });

    var musicController = document.getElementById("play");
    console.log($('.slick-slider'));
    var songPath = musicController.getAttribute('data-page-music');
    var connected = sessionStorage.getItem('songPlay') ? JSON.parse(sessionStorage.getItem('songPlay')) : false; 
    
    window.onunload = function() {
        sessionStorage.setItem(songPath, song.currentTime());
    }

    function toggleMute(){
        if(connected) {
            song.disconnect();
            musicController.classList.add('off');
        } else {
            song.connect();
            musicController.classList.remove('off');
        } 
        sessionStorage.setItem('songPlay', connected);
        connected = !connected;
    }

    musicController.addEventListener('click', function(){
        toggleMute();
    });

    song = new p5.SoundFile(songPath, function(){
        var currentTime = JSON.parse(sessionStorage.getItem(songPath));
        
        song.play();
        toggleMute();

        if(currentTime){
            song.jump(currentTime);
        }
        song.onended(function(){
            song.play()
        });
    });

  
    // new p5(sketch);
    
}

documentReady(app);
