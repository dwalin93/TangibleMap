    $(document).ready(function() {
    var str = localStorage.getItem('test');

    var chunks = [];
    str = str.split(",")
    for (var i = 0, charsLength = str.length; i < charsLength; i += 3) {
        chunks.push([str[i], str[i + 1], str[i + 2]]);
    }
    console.log(chunks);
    for (var i = 0; i < chunks.length; i++) {
        var color = chunks[i]
        var p = i + 1
        $('#resultTable' + p)
            .css('background-color', 'rgb(' + color + ')')
    }


})
