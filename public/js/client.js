var socket = io.connect("http://" + document.location.hostname + ":3000")
    , notif, control;
var $angle_txt = $('#angle_txt')
    .on('change', function () {
        var ang = $angle_txt.val()
        control = "mouse"
        socket.emit('changeAngle', ang, control)
        socket.on('returnAng', function (ang) {
            console.log(ang);
        });
    });
console.log("client is running...")
var imgData;
$("#yPIN,#xPIN")
    .change(function () {
        try {
            imgData.clear();
            imgData = new CanvasImage(img);
        } catch (err) {}
    });
var image = new Array;
var verarbeite = function () {
    var newimage = new Bild("img", "canvas", image.length)
    $('#verarbeite')
        .hide()
    $('#analysiere1')
        .show()
    $("#Map1")
        .append('<option id="' + image.length + '">' + newimage.name + '</option>');
    $("#Map2")
        .append('<option id="' + image.length + '">' + newimage.name + '</option>');
    image.push(newimage);
    console.log(image)
    if (image.length < 2) {
        $('#analysiere2')
            .hide()
        $('#classMap2')
            .hide()
    } else {
        $('#classMap2')
            .show()
    }
}
var erstelleMap = function () {
     var mapid1 = $("#Map1 option:selected")
            .attr("id");
        var mapid2 = $("#Map2 option:selected")
            .attr("id");
    if (mapid1 !== mapid2) {
        gewichtungMap(2)
    }
        gewichtungMap(1)

}
var gewichtungMap = function (nr) {
    var gewichtung = new Array;
    $('#Legende'+nr)
        .find("input")
        .each(function (index) {
            gewichtung.push($(this.value)
                .selector);
        });
    
    console.log(gewichtung)
    var minimum = Math.min(...gewichtung)
    var maximum = Math.max(...gewichtung)
    var max = 0
    var min = 155
    var wert = ((max - min) / (maximum)) * -1
    for (var i = 0; i < gewichtung.length; i ++) {
        gewichtung[i] = wert * gewichtung[i]
    }
    //console.log(image[mapid1])
    console.log(gewichtung)
    var ang = gewichtung[0]
    control = "mouse"
    socket.emit('changeAngle', ang, control)
    socket.on('returnAng', function (ang) {
        console.log(ang);
    });
}



$("#Map1,#Map2")
    .change(function () {
        var mapid1 = $("#Map1 option:selected")
            .attr("id");
        var mapid2 = $("#Map2 option:selected")
            .attr("id");
        $("canvas")
            .hide();
        $("#canvas" + mapid1)
            .show();
        $("#canvas" + mapid2)
            .show();
        if (mapid1 !== mapid2) {
            $('#analysiere2')
                .show()
            $('#result2')
                .show()
        } else {
            $('#analysiere2')
                .hide()
            $('#result2')
                .hide()
        }
    })
var analysiereErsteKarte = function () {
    
    $('tr')
        .remove();
    var mapid = $("#Map1 option:selected")
        .attr("id");
   var  weiß_ignore = $('#weiß_ignore').is(':checked')
   var  color_ignore = $('#color_ignore').val()
    
    
    if (image[mapid].Result == "" | weiß_ignore !==  image[mapid].IgnoreWeiß | color_ignore !== image[mapid].IgnoreAndere){
    pixelArray = image[mapid].getPixelArray();
    var result = analysiere(pixelArray, image[mapid])
    image[mapid].setResult(result)
    image[mapid].setIgnoreWeiß(weiß_ignore)
    image[mapid].setIgnoreAndere(color_ignore)
    }
    
    legende(image[mapid],1)
     $('#result1')
        .show()

}
var analysiereZweiKarten = function () {
    $('tr').remove();
    var mapid1 = $("#Map1 option:selected")
        .attr("id");
    var mapid2 = $("#Map2 option:selected")
        .attr("id");
    
    if (image[mapid1].Result == ""){
    pixelArray = image[mapid1].getPixelArray();
    var result = analysiere(pixelArray, image[mapid1])
    }
    
    
    if (image[mapid2].Result == ""){
    pixelArray = image[mapid2].getPixelArray();
    var result = analysiere(pixelArray, image[mapid2])
    image[mapid2].setResult(result)    
    }
    
        legende(image[mapid1],1)
        legende(image[mapid2],2)
        
     $('#result1')
        .show()
    $('#result2')
        .show()
}

var analysiere = function (pixelArray, thisImage) {
    console.log("Analyse vom Bild")
    var objekte = new Array;
    var imagematrixKlein = new Array;
    var xPin = document.getElementById("xPIN")
        .value;
    var yPin = document.getElementById("yPIN")
        .value;
    var p = 0;
    var pp = 1;

    for (var iiii = 0; iiii < yPin; iiii++) {
        if (iiii == 0) {
            var start = (iiii * (imgData.width * (imgData.height / xPin)))
        }
        for (var iii = 0; iii < xPin; iii++) {
            var start2 = start + (iii * ((imgData.width / yPin)))
            for (var ii = 0; ii < Math.floor((imgData.height / xPin)); ii++) {
                var start3 = Math.floor((ii * (imgData.width)) + start2)
                var max = Math.floor(start3 + (imgData.width / yPin));
                for (var i = start3; i < max; i++) {
                    if (i >= pixelArray.length) {
                        console.log("zuLANG??!!")
                    } else {
                        imagematrixKlein.push(pixelArray[i]);
                    }
                }
            }
            var test = "test" + pp
            test = new maxColor(imagematrixKlein)
            var imagematrixKlein = new Array;
            objekte.push(test)
        }
        start = i;
    }
    $('#erstelle_map')
        .show()
   
    return objekte
};
var legende = function (LegendImage, nr) {
    var legend = LegendImage.getResult()
    var legendeArray = new Array;
    var p = 0;
    var pp = 1;
    for (var i = 0; i < legend.length; i++) {
        var first = legend[i].first
        var color = first[0]
        var verhältnis = first[2]
        $("#Result"+nr)
            .append('<tr><th align="left">Abschnitt ' + pp + ', Farbe=' + color + ' mit ' + verhältnis + '% </th></tr>');
        pp++;
        $('#Result'+nr+' tr')
            .last()
            .css('background-color', 'rgb(' + color + ')');
        b = legendeArray.indexOf(color)
        if (b === -1) {
            $("#Legende"+nr)
                .append('<tr><th align="left"> Farbe=' + color + '</th>' + ' <th><input type="text" nr= "' + p + '" value="3" name="' + color + '"size="5"> </th></tr>');
            p++;
            $('#Legende'+nr+' tr')
                .last()
                .css('background-color', 'rgb(' + color + ')');
            legendeArray.push(color)
        }
    }
    LegendImage.setLegende(legendeArray)
}
