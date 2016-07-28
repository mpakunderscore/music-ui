var playlist = [];

var visiblePlaylist = 10;

function checkTrack(artistTitle, trackTitle, trackTags) {

    // console.log('/check track')

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

        // console.log(track.artist + ' - ' + track.title);

        var item = $('#playlist' + (playlist.length - 1));

        item.text(track.artist + ' - ' + track.title);
        item.click(function() {
            getYoutubeTrack(track)
        });

        if (playlist.length === 1)
            getYoutubeTrack(track)
    }
}

function selectTrack(track) {
    console.log(track)
}

function skip() {

}

function fillPlaylist() {

    $('#playlist').prepend('<li id="playlist0" class="select"></li>');

    for (var i = 1; i < visiblePlaylist; i++) {
        $('#playlist').prepend('<li id="playlist' + i + '"></li>');
    }

    $('#playlist').prepend('<li onclick="up()">&#x2191;</li>');
}

fillPlaylist();