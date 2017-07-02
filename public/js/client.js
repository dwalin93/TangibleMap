/*var werte = servo.getWerteServo();
var servo = require('./public/js/servo.js');
*/


console.log("client is running...")

var imgData;


$("#yPIN,#xPIN")
    .change(function () {
        try {
            imgData.clear();
            imgData = new CanvasImage(img);
        } catch (err) {}
    });
const image = new Array;
const max = 0
const min = 155
/*  
*   Die Funktion Verarbeite deligiert den ersten Schritt für die Analyse des Eingeladenen Bildes
*   Jedes hier verarbeitete Bild (Objekt) wird in das Array "Image" eingefügt
*/

var verarbeite = function () {
    /* Es wird ein newimage definiert, dies erstellt ein Bild Objekt, hierfür wird 
    "img"(dies ist die ID für das hochgeladene Bild)
    "canvas"(dies ist die ID für das Objekt in der Index, hinter das neue canvas eingefügt wird) und 
    "image.length" (dies dient zur erzeugung der neuen ID für das canvas Objekt, diese setzt sich aus Canvas und image.length zusammen )
    übergeben
    */
    var newimage = new Bild("img", "canvas", image.length)
    image.push(newimage);

    $('#verarbeite')
        .hide()
    $('#analysiere1')
        .show()
    $("#Map1, #Map2")
        .append('<option id="' + image.length + '">' + newimage.name + '</option>');
    if (image.length < 2) {
        $('#analysiere2, #classMap2')
            .hide()
    } else {
        $('#classMap2')
            .show()
    }
}

/*
*   Die Funktion erstelleMap definiert für jede in der Index ausgewählte Map eine Variable
*   wenn zwei unterschiedliche Maps selektiert sind, wird die if Anweisung ausgeführt, ansosnsten nicht
*/
var erstelleMap = function () {
    var mapid1 = $("#Map1 option:selected")
        .attr("id");
    var mapid2 = $("#Map2 option:selected")
        .attr("id");
    gewichtungMap(1, mapid1)
    verteilung(mapid1)
    if (mapid1 !== mapid2) {
        gewichtungMap(2, mapid2)
        verteilung(mapid2)
        resultString = vergelich(mapid1, mapid2)
    }
    //console.log(image[mapid1])
}

/*
*   Die Funktion gewichtungMap fordert eine "nr" und eine "id"
*   Die nr identifieziert die zugehörige Legende der Map
*   Die id wählt die map aus dem Immage-Array aus
*   Diese Funktion gibt jedem quadrat des Obejkts in der Image-Array eine gewichtung (Winkel) für die Servos 
*   Die Grenzen der Servos werden in var max & var min definiert 
*/

var gewichtungMap = function (nr, id) {
    var gewichtung = new Array;
    $('#Legende' + nr)
        .find("input")
        .each(function (index) {
            gewichtung.push($(this.value)
                .selector);
        });
    var minimum = Math.min(...gewichtung)
    var maximum = Math.max(...gewichtung)
    var wert = ((max - min) / (maximum)) * -1
    for (var i = 0; i < gewichtung.length; i++) {
        gewichtung[i] = wert * gewichtung[i]
    }
    image[id].setGewichtung(gewichtung);
}
/*
*   Die Funktion vertileung passt die gewichtung der quadranten an das prozenuale Ergebnis der jeweiligen Analyse an
*   Ein Quadrant mit weniger weiß als ein anderer bekommt auch einen niedrigeren Winkel
*
*/
var verteilung = function (mapid) {
    var winkelServo = new Array
    var result = image[mapid].Result
    var resultArray = new Array
    var legende = image[mapid].Legende
    var gewichtung = image[mapid].Gewichtung
    for (var i = 0; i < result.length; i++) {
        resultArray.push(result[i].first)
    }
    for (var i = 0; i < resultArray.length; i++) {
        var newresult = resultArray[i][0]
        var a = legende.indexOf(newresult)
        var gew = gewichtung[a] * (resultArray[i][2] / 100)
        winkelServo.push(gew)
    }
    var multiplikator = min / Math.max(...winkelServo)
    for (var i = 0; i < winkelServo.length; i++) {
        resultArray[i][3] = (winkelServo[i] * multiplikator)
    }
}

/*
*   Die Funktion vergleich nimmt die zwei selectierten Maps und vegelicht die resultate
*   Das Ergebniss dieses Vergelichs wird im anschluss auf die darzustellenden WInkel getreckt.
*
*/

var vergelich = function (mapid1, mapid2) {
    var gewichtung1 = image[mapid1].Result
    var gewichtung2 = image[mapid2].Result
    vergleichArray = new Array;
    for (var i = 0; i < gewichtung1.length; i++) {
        vergleichArray.push(gewichtung1[i].first[3] - gewichtung2[i].first[3])
    }
    console.log(vergleichArray)
    var vergleichMax = Math.max(...vergleichArray)
    var vergleichMin = Math.min(...vergleichArray)
    var multiplikator = (max - min) / (vergleichMax - vergleichMin)
    console.log(multiplikator)
    for (var i = 0; i < vergleichArray.length; i++) {
        vergleichArray[i] = (Math.abs(vergleichArray[i] * multiplikator))
    }
    console.log(vergleichArray);
    servo.setWerteServo(vergleichArray);
    return vergleichArray;
}

/*
*   jQuery Listener für die DropDown in der Index
*/
$("#Map1,#Map2")
    .change(function () {
        var mapid1 = $("#Map1 option:selected")
            .attr("id");
        var mapid2 = $("#Map2 option:selected")
            .attr("id");
        $("canvas, h2")
            .hide();
        $("#canvas" + mapid1 + ", #canvas" + mapid2 + ",#imgName" + mapid1 + ",#imgName" + mapid2)
            .show();
        if (mapid1 !== mapid2) {
            $('#analysiere2, #result2')
                .show()
        } else {
            $('#analysiere2, #result2')
                .hide()
        }
    })
/*
*   Die Funktion analysiereErsteKarte nimmt EINE selektierte Map und analysiert sie.
*   Wenn noch kein Result verhanden ist, wird die Funktion "analysieren" aufgerufen, 
*   auch wenn "weiß ignorieren" und "Andere Farbe Ignorieren" verändert wurde.
*/

var analysiereErsteKarte = function () {
    $('tr')
        .remove();
    var mapid = $("#Map1 option:selected")
        .attr("id");
    var weiß_ignore = $('#weiß_ignore')
        .is(':checked')
    var color_ignore = $('#color_ignore')
        .val()
    if (image[mapid].Result == "" | weiß_ignore !== image[mapid].IgnoreWeiß | color_ignore !== image[mapid].IgnoreAndere) {
        pixelArray = image[mapid].getPixelArray();
        var result = analysiere(pixelArray, image[mapid])
        image[mapid].setResult(result)
        image[mapid].setIgnoreWeiß(weiß_ignore)
        image[mapid].setIgnoreAndere(color_ignore)
    }
    legende(image[mapid], 1)
    $('#result1')
        .show()
}

/*
*   Die Funktion analysiereZweiKarten nimmt ZWEI selektierte Maps und analysiert sie.
*   Wenn noch kein Result verhanden ist, wird die Funktion "analysieren" aufgerufen, 
*   auch wenn "weiß ignorieren" und "Andere Farbe Ignorieren" verändert wurde.
*/

var analysiereZweiKarten = function () {
    $('tr')
        .remove();
    var mapid1 = $("#Map1 option:selected")
        .attr("id");
    var mapid2 = $("#Map2 option:selected")
        .attr("id");
    if (image[mapid1].Result == "") {
        pixelArray = image[mapid1].getPixelArray();
        var result = analysiere(pixelArray, image[mapid1])
    }
    if (image[mapid2].Result == "") {
        pixelArray = image[mapid2].getPixelArray();
        var result = analysiere(pixelArray, image[mapid2])
        image[mapid2].setResult(result)
    }
    legende(image[mapid1], 1)
    legende(image[mapid2], 2)
    $('#result1, #result2')
        .show()
}

/*
*   Die Funktion analysieren nimmt ein PixelArray und die zu analysierende Map
*   Diese Funktion analysiert das gesammte Pixel Array der Map, teilt dieses in die anzahl ausgewählter x & y Quadranten.
*   Danach wird der Quadrant an die Funktion maxColor übergeben.
*   Am ende wird ein Array objekte zureückgegeben
*/

var analysiere = function (pixelArray, thisImage) {
    console.log(imgData)
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
                        //console.log("zuLANG??!!")
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

/*
*   Die Funktion Legende erstellt das Resultat und die Legende für jede Map 
*   Die Funktion nimmt das Bild-Objekt und die nummer der Legende in der Index
*
*/
var legende = function (LegendImage, nr) {
    var legend = LegendImage.getResult()
    var legendeArray = new Array;
    var p = 0;
    var pp = 1;
    for (var i = 0; i < legend.length; i++) {
        var first = legend[i].first
        var color = first[0]
        var verhältnis = first[2]
        $("#Result" + nr)
            .append('<tr><th align="left">Abschnitt ' + pp + ', Farbe=' + color + ' mit ' + verhältnis + '% </th></tr>');
        pp++;
        $('#Result' + nr + ' tr')
            .last()
            .css('background-color', 'rgb(' + color + ')');
        b = legendeArray.indexOf(color)
        if (b === -1) {
            $("#Legende" + nr)
                .append('<tr><th align="left"> Farbe=' + color + '</th>' + ' <th><input type="text" nr= "' + p + '" value="3" name="' + color + '"size="5"> </th></tr>');
            p++;
            $('#Legende' + nr + ' tr')
                .last()
                .css('background-color', 'rgb(' + color + ')');
            legendeArray.push(color)
        }
    }
    LegendImage.setLegende(legendeArray)
}
