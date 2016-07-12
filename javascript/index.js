var jsmediatags = require("jsmediatags")
// var electronOpenLinkInBrowser = require("electron-open-link-in-browser");

var musicFile = 'mp3/' + 'Fabrizio Paterlini - L\'airone'  + '.mp3';
var audio = new Audio();
audio.src = musicFile;

audioCtx = new AudioContext();
analyser = audioCtx.createAnalyser();
source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 32;

var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var max = 256;

function renderFrame() {

    analyser.getByteFrequencyData(frequencyData);

    var first = 3;
    var second = 2;

    // console.log(frequencyData);

    $('#circle').css("transform", "scale(" + (1 + 0.7*frequencyData[first]/max) + ", " + (1 + 0.7*frequencyData[first]/max) + ")")
    $('#circle-big').css("transform", "scale(" + (1 + 0.7*frequencyData[second]/max) + ", " + (1 + 0.7*frequencyData[second]/max) + ")")

    $('.tag').css("padding-left", "calc(150px + " + 70*(frequencyData[second]/max) + "px)")

    // $('#sector').css("transform", "rotate(" + 0 + 360 * frequencyData[first]/max + "deg)");

    requestAnimationFrame(renderFrame);
}

audio.pause();
// audio.play();
renderFrame();

// --

function music() {

    if (audio.paused) {

        playlist = [];
        getTracks();
        // console.log('play')
        // audio.play();

    } else {
        audio.pause();
    }
}

function circle() {

    // console.log('circle')

    // console.log(selectedTags);
    
    music();
}

// function drop() {
//     console.log('drop')
// }

jsmediatags.read(musicFile, {
    onSuccess: function(tag) {
        $('#artist').text(tag.tags.artist)
        // $('#artist').attr("href", "http://www.last.fm/music/" + tag.tags.artist)
        $('#title').text(tag.tags.title)
        // $('#title').attr("href", "http://www.last.fm/music/" + tag.tags.artist + "/_/" + tag.tags.title)
    },
    onError: function(error) {
        console.log(':(', error.type, error.info);
    }
});

var position = 0;
var positionIndex = 0;

var positionInterval = 20;

document.addEventListener('mousewheel', function(e) {

    // console.log(e.deltaY)

    if (e.deltaY > 20)
        e.deltaY = 20;

    if (e.deltaY < -20)
        e.deltaY = -20;

    position += e.deltaY;

    if (Math.floor(position / positionInterval) > positionIndex  && tagIndex + 5 !== tags.length) {
        positionIndex = Math.floor(position / positionInterval);
        // console.log('next');
        next();
    }

    if (Math.floor(position / positionInterval) < positionIndex && tagIndex !== 0) {
        positionIndex = Math.floor(position / positionInterval);
        // console.log('back');
        back();
    }
});