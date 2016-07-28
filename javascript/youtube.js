var youtubedl = require('youtube-dl');
var fs = require('fs');
var request = require('request');

var format = '.mp4';

function getYoutubeTrack(track) {

    // console.log('/download link')

    request('https://www.youtube.com/results?search_query=' + track.artist + '+-+' + track.title, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var href = $(body).find('#results').find('.item-section').find('a')[0].href;

            // console.log(href);

            downloadMP4(track, 'https://www.youtube.com/watch?v=' + href.split('/watch?v=')[1]);

        } else {
            console.log(response.statusCode)
        }
    })
}

function downloadMP4(track, link) {

    var name = track.artist + ' - ' + track.title;

    var video = youtubedl(link,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname });

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started');
        console.log('Filename: ' + info._filename);
        console.log('Size: ' + info.size);
    });

    video.on('complete', function complete(info) {
        'use strict';

        audio.src = 'files/mp4/' + name + format;
        audio.play();

        console.log('Filename: ' + info._filename + ' already downloaded.');
    });

    video.on('end', function() {

        audio.src = 'files/mp4/' + name + format;
        audio.play();

        $('video').attr('src', 'files/mp4/' + name + format);

        console.log('Finished downloading!');
    });

    video.pipe(fs.createWriteStream('files/mp4/' + name + format));
}