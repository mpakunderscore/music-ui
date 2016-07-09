var jsmediatags = require("jsmediatags")
var electronOpenLinkInBrowser = require("electron-open-link-in-browser");

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
        audio.play();
        // $( ".tag" ).css( "display", "none" );
    } else {
        audio.pause();
        // $( ".tag" ).css( "display", "block" );
    }
}

function circle() {
    console.log('circle')
    music();
}

function drop() {
    console.log('drop')
}

function select() {
    console.log('select')
}

$( function() {
    $('.tag').click( function() {
        $(this).css('color', 'white')
    } );
} );

jsmediatags.read(musicFile, {
    onSuccess: function(tag) {
        // console.log(tag);
        // var text = tag.tags.artist + ' - ' + tag.tags.title;
        // console.log(text);
        $('#artist').text(tag.tags.artist)
        // $('#artist').attr("href", "http://www.last.fm/music/" + tag.tags.artist)
        $('#title').text(tag.tags.title)
        // $('#title').attr("href", "http://www.last.fm/music/" + tag.tags.artist + "/_/" + tag.tags.title)
    },
    onError: function(error) {
        console.log(':(', error.type, error.info);
    }
});