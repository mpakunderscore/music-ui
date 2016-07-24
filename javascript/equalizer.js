$('#equalizer').text('');

for (var i = frequencyDataLength - 1; i >= 0; i--)
    $('#equalizer').append('<div id="line' + i + '" class="line"></div>')

