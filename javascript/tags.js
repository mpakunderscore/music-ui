// var tags = [{title: 'Downtempo', select: false},
//     {title: 'Electronic', select: false},
//     {title: 'Ambient', select: false},
//     {title: 'Chillout', select: false},
//     {title: 'Rock', select: false},
//     {title: 'Jazz', select: false},
//     {title: 'Indie', select: false}];

var selectedTags = []


var tagIndex = 0;
var incline = -40;

function fillTags() {

    $('#tags')
        .append($('<div>&#x2191;</div>')
            .attr('onclick', 'back()')
            .attr('id', 'back')
            .addClass('tag')
            .css('transform', 'rotate(' + incline + 'deg)')
            .css('display', 'none'));

    for (var i = 1; i < 6; i++) {
        $('#tags')
            .append($('<div>' + tags[i - 1].title + '</div>')
                .attr('onclick', 'select("' + tags[i - 1].title + '", "' + i + '")')
                .attr('id', 'tag' + i)
                .addClass('tag')
                .css('transform', 'rotate(' + (incline + 10 * i) + 'deg)'));
    }

    $('#tags')
        .append($('<div>&#x2193;</div>')
            .attr('onclick', 'next()')
            .attr('id', 'next')
            .addClass('tag')
            .css('transform', 'rotate(' + 20 + 'deg)'));
}

function next() {

    $('#back').css('display', 'block');

    tagIndex++;

    for (var i = 1; i < 6; i++) {
        $('#tag' + i).text(tags[i - 1 + tagIndex].title)
            // .append($('<div>' + tags[i - 1].title + '</div>')
                .attr('onclick', 'select("' + tags[i - 1 + tagIndex].title + '", "' + i + '")');
                // .addClass('tag')
                // .css('transform', 'rotate(' + (incline + 10 * i) + 'deg)'));

        if (tags[i - 1 + tagIndex].select === true)
            $('#tag' + i).addClass('select')

        else if ($('#tag' + i).hasClass('select'))
            $('#tag' + i).removeClass('select')
    }

    // console.log('tagIndex: ' + (tagIndex + 5) + ", tags: " + tags.length)

    if (tagIndex + 5 === tags.length)
        $('#next').css('display', 'none');
}

function back() {

    $('#next').css('display', 'block');

    tagIndex--;

    for (var i = 1; i < 6; i++) {
        $('#tag' + i).text(tags[i - 1 + tagIndex].title)
        // .append($('<div>' + tags[i - 1].title + '</div>')
            .attr('onclick', 'select("' + tags[i - 1 + tagIndex].title + '", "' + i + '")');
        // .addClass('tag')
        // .css('transform', 'rotate(' + (incline + 10 * i) + 'deg)'));

        if (tags[i - 1 + tagIndex].select === true)
            $('#tag' + i).addClass('select')

        else if ($('#tag' + i).hasClass('select'))
            $('#tag' + i).removeClass('select')
    }

    if (tagIndex === 0)
        $('#back').css('display', 'none');
}

function select(tag, id) {

    // console.log('select: ' + tag + ", id: " + id)

    for (var i = 0; i < tags.length; i++) {
        if (tags[i].title === tag) {

            if (tags[i].select === true) {

                tags[i].select = false;
                $('#tag' + id).removeClass('select');
                selectedTags.remove(tag);

            } else {

                tags[i].select = true;
                $('#tag' + id).addClass('select')
                selectedTags.push(tag);
            }
        }
    }
}

// fillTags();

// mouse wheel

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

    // if (position < 0) {
    //     position = 0;
    //     return;
    // }

    // console.log('Position: ' + position)

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

// arrays

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}


