// var musicFile = 'mp3/' + 'Fabrizio Paterlini - L\'airone'  + '.mp3';
var musicFile = 'mp3/' + 'Solar Fields - Discovering'  + '.mp3';
// var musicFile = 'mp3/' + 'Rock Guitar Solo'  + '.mp3';
// var musicFile = 'mp3/' + '27'  + '.mp3';

var frequencyDataLength = 256;

var audio = new Audio();
audio.src = musicFile;

audioCtx = new AudioContext();
analyser = audioCtx.createAnalyser();
source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = frequencyDataLength * 2;

var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var max = 256*4;

// console.log('frequencyData.length: ' + frequencyData.length)

function renderFrame() {

    analyser.getByteFrequencyData(frequencyData);

    var first = 3;
    var second = 5;

    // console.log(frequencyData);

    $('#circle').css("transform", "scale(" + (1 + 0.7*frequencyData[first]/max) + ", " + (1 + 0.7*frequencyData[first]/max) + ")")
    $('#circle-big').css("transform", "scale(" + (1 + 0.7*frequencyData[second]/max) + ", " + (1 + 0.7*frequencyData[second]/max) + ")")
    $('.tag').css("padding-left", "calc(150px + " + 70*(frequencyData[second]/max) + "px)")

    // $('#equalizer').text('');

    for (var i = 0; i < frequencyDataLength; i++)
        $('#equalizer #line' + i).css('height', frequencyData[i]/1.5);

    // $('#sector').css("transform", "rotate(" + 0 + 360 * frequencyData[first]/max + "deg)");

    requestAnimationFrame(renderFrame);
}

audio.pause();

renderFrame();

// --

function music() {

    if (audio.paused) {

        // console.log('/play')
        
        getTracks();
        audio.play();

    } else {
        audio.pause();
    }
}

function circle() {
    music();
}

$(document).keydown(function(event){
    var key = event.which;
    switch(key) {
        case 37:
            // Key left.
            break;
        case 38:
            // Key up.
            if (tagIndex !== 0)
                back();
            break;
        case 39:
            // Key right.
            break;
        case 40:
            // Key down.
            if (tagIndex + 5 !== tags.length)
                next();
            break;
    }
});