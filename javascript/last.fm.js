var request = require('request');

var url = 'https://ws.audioscrobbler.com/2.0/?';

var getTopTags_ =       'method=tag.getTopTags&';
var getTopTracks_ =     'method=tag.getTopTracks&';
var getTrackTopTags_ =  'method=track.getTopTags&';

var key = 'api_key=d6de1272194e70b5f0f25834eba24155&';
var format = 'format=json';

var tags = [];
var tagTracks = {};

var playlist = [];

//get tags
if (localStorage.getItem(getTopTags_) === null) {

    request(url + getTopTags_ + key + format, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var tagsArray = JSON.parse(body).toptags.tag; // Show the HTML for the Google homepage.

            for (var i = 0; i < tagsArray.length; i++) {

                var title = tagsArray[i].name;
                title = title.charAt(0).toUpperCase() + title.slice(1);

                tags.push({title: title, select: false})
            }

            localStorage.setItem(getTopTags_, JSON.stringify(tags));
            console.log('getTopTags_ from web')

            fillTags();

        } else {
            console.log(response.statusCode)
        }
    })

} else {

    // console.log('getTopTags_ from localStorage')
    tags = JSON.parse(localStorage.getItem(getTopTags_))

    fillTags();
}

function getTracks() {

    playlist = [];
    $('#playlist').text('');

    for (var i = 0; i < selectedTags.length; i++) {

        getTagTracks(selectedTags[i])
    }
}

function getTagTracks(tagTitle) {

    var tag = 'tag=' + tagTitle + '&';

    if (localStorage.getItem(getTopTracks_ + tag) === null) {

        request(url + getTopTracks_ + tag + key + format, function (error, response, body) {

            //TODO tagTitle & tag

            if (!error && response.statusCode == 200) {

                var tracksArray = JSON.parse(body).tracks.track;

                tagTracks[tagTitle] = [];

                for (var i = 0; i < tracksArray.length; i++) {

                    var title = tracksArray[i].name;
                    var artist = tracksArray[i].artist.name;

                    tagTracks[tagTitle].push({artist: artist, title: title})


                    // console.log(artist + ' ' + title + ' ' + [0]);

                    getTags(artist, title);
                }

                localStorage.setItem(getTopTracks_ + tag, JSON.stringify(tagTracks[tagTitle]));
                console.log('getTopTracks_ ' + tag + ' from web')
            }
        })

    } else {

        // console.log('getTopTracks_ ' + tag + ' from localStorage')
        tagTracks[tagTitle] = JSON.parse(localStorage.getItem(getTopTracks_ + tag))

        for (var i = 0; i < tagTracks[tagTitle].length; i++) {

            var artist = tagTracks[tagTitle][i].artist;
            var title = tagTracks[tagTitle][i].title;

            // tagTracks[tagTitle].push({artist: artist, title: title})


            // console.log(artist + ' ' + title);

            // artist = 'artist=' + artist + '&';
            // title = 'track=' + title +'&';


            getTags(artist, title);
        }

        // console.log(tagTracks[tagTitle])
    }
}

function getTags(artist, track) {

    var artistTitle = artist;
    var trackTrack = track;

    // console.log('getTags: ' + artist + ' - ' + track)

    artist = 'artist=' + artist + '&';
    track = 'track=' + track +'&';

    if (localStorage.getItem(getTrackTopTags_ + artist + track) === null) {

        // console.log(url + encodeURIComponent(getTrackTopTags_ + artist + track + key + format))

        request(url + getTrackTopTags_ + artist + track + key + format, function (error, response, body) {

            var trackTags = [];

            if (!error && response.statusCode == 200) {

                if (JSON.parse(body).toptags === undefined) {
                    localStorage.setItem(getTrackTopTags_ + artist + track, JSON.stringify(trackTags));
                    return;
                }

                var tagsArray = JSON.parse(body).toptags.tag; // Show the HTML for the Google homepage.

                for (var i = 0; i < tagsArray.length; i++) {

                    var title = tagsArray[i].name;
                    var count = tagsArray[i].count;

                    // console.log(title + ' - ' + count);
                    // name = name.charAt(0).toUpperCase() + name.slice(1);

                    trackTags.push({title: title, count: count})
                }

                // console.log('getTrackTopTags_ ' + artist + ' - ' + track + ' from web')
                localStorage.setItem(getTrackTopTags_ + artist + track, JSON.stringify(trackTags));

                checkTrack(artistTitle, trackTrack, trackTags);

            } else {
                console.log(response.statusCode)
            }
        })

    } else {

        var trackTags = JSON.parse(localStorage.getItem(getTrackTopTags_ + artist + track))

        checkTrack(artistTitle, trackTrack, trackTags);
    }
}