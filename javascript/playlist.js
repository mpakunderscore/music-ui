var playlist = [];

var visiblePlaylist = 10;

function checkTrack(artistTitle, trackTitle, trackTags) {

    console.log('/check track')

    var tagCount = 0;
    var playlistTrackTags = []

    for (var i = 0; i < trackTags.length; i++) {

        var tag = trackTags[i];

        var title = tag.title.charAt(0).toUpperCase() + tag.title.slice(1);
        var count = tag.count;

        if (selectedTags.contains(title)) {
            // console.log(title + ' ' + count);

            playlistTrackTags.push({title: title, count: count})
            tagCount += 1;
        }
    }

    var track = {artist: artistTitle, title: trackTitle};

    if (tagCount === selectedTags.length && !playlist.contains(track)) {

        playlist.push(track);

        console.log(track.artist + ' - ' + track.title);

        if (playlist.length === visiblePlaylist) {
            $('#playlist').prepend('<li onclick="up()">&#x2191;</li>'); //$("li").text()\
        }

        if (playlist.length === 1) {

            // $('#playlist').prepend('<li onclick="down()">&#x2193;</li>');
            $('#playlist').prepend('<li class="select" onclick="selectTrack(\'' + track.artist + '\', \'' + track.title +  '\')">' + track.artist + ' - ' + track.title + '</li>');

        } else if (playlist.length === 5) {

            $('#playlist').prepend('<li onclick="selectTrack(\'' + track.artist + '\', \'' + track.title +  '\')">' + track.artist + ' - ' + track.title + '</li>');

        } else if (playlist.length < visiblePlaylist) {

            $('#playlist').prepend('<li onclick="selectTrack(\'' + track.artist + '\', \'' + track.title +  '\')">' + track.artist + ' - ' + track.title + '</li>');
        }

        // style="opacity: ' + (1  - playlist.length/visiblePlaylist) + '"
    
        for (var i = 0; i < playlistTrackTags.length; i++) {
            console.log('%c' + playlistTrackTags[i].title + ': ' + playlistTrackTags[i].count, 'color: blue');
        }
    }
}

function selectTrack(artist, title) {
    console.log(artist + " - " + title)
}

// function filterTracks() {
//
//     for (var i = 0; i < selectedTags.length; i++) {
//
//         var tag = selectedTags[i];
//
//         for (var id in tagTracks[tag]) {
//
//             // console.log(track)
//
//             var artist = 'artist=' + tagTracks[tag][id].artist + '&';
//             var title = 'track=' + tagTracks[tag][id].title +'&';
//
//             // console.log(getTrackTopTags_ + artist + title)
//
//             var tags = JSON.parse(localStorage.getItem(getTrackTopTags_ + artist + title));
//
//             //check selected tags here
//         }
//     }
// }