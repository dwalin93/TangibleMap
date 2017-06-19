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
var objekte = new Array;

$( "#yPIN,#xPIN" ).change(function() {
try{
    imgData.clear();
    imgData = new CanvasImage(img);
}catch(err){}
});
    
var verarbeite = function () {
var image = new Bild("img", "canvas")
$('#verarbeite').hide()
$('#analysiere').show()
    
    test(image);
}

var test = function(image) {
    console.log(image.getPixelArray())
    console.log(image)
}
/*
var verarbeite = function () {
        
    pixelArray = new Array;
    var imagematrixKlein = new Array;
    var img = document.getElementById("img");
    imgData = new CanvasImage(img);
    imgData.setLine()
    var pixels = imgData.getImageData()
        .data;
    for (var p = 0, offset, r, g, b, a; p <= (pixels.length); p = p + 4) {
        r = pixels[p + 0];
        g = pixels[p + 1];
        b = pixels[p + 2];
        a = pixels[p + 3];
        var string = r + "," + g + "," + b;
       
        if (a >= 125) {
        		if (!(r > 250 && g > 250 && b > 250)) {
                    pixelArray.push(string);

                }else{
        			pixelArray.push("255,255,255");


                }
        	}


    }
    //$("#analysiere").show();  
    $("#analysiere")
        .show();
    $("#verarbeite")
        .hide();
    console.log(pixels.length)
    console.log(pixels.length/4)
    console.log(pixelArray)
    console.log(pixelArray.length)
    
}
*/

var erstelleMap = function () {
    var gewichtung = new Array;
        console.log("HIER")

  $('#Legende').find("input").each(function(index){
      gewichtung.push($(this.value).selector)
});
    console.log(gewichtung)
    
    var minimum = Math.min(...gewichtung)
    var maximum = Math.max(...gewichtung)
    var max = 0
    var min = 155
    var wert = ((max-min)/(maximum))*-1
    for(var i = 0; i<gewichtung.length;i++){
        gewichtung[i]=wert*gewichtung[i]
    }
    console.log(gewichtung)

    
        var ang = gewichtung[0]
        control = "mouse"
        socket.emit('changeAngle', ang, control)
        socket.on('returnAng', function (ang) {
            console.log(ang);
        });
    
    
}


var analysiere = function () {
    
    $('tr')
        .remove();
        
    var imagematrixKlein = new Array;
    var legende = new Array;
    var xPin = document.getElementById("xPIN")
        .value;
    var yPin = document.getElementById("yPIN")
        .value;
    var p = 0;
    var pp = 1;
     console.log("imgData.width = " + imgData.width)
     console.log("imgData.height = " + imgData.height)
    for (var iiii = 0; iiii < yPin; iiii++) {
        if (iiii == 0) {
            var start =  (iiii * (imgData.width *(imgData.height / xPin)))
        }
        console.log(start)
        for (var iii = 0; iii < xPin; iii++) {
            var start2 = start + (iii * ((imgData.width / yPin)))
        console.log(start2)
            
            for (var ii = 0; ii < Math.floor((imgData.height / xPin)); ii++) {
                var start3 = Math.floor((ii * (imgData.width)) + start2)
                var max = Math.floor(start3 + (imgData.width / yPin));
                for (var i = start3; i < max; i++) {
                    if (i>= pixelArray.length){
                        console.log("zuLANG??!!")
                    }else{
                    imagematrixKlein.push(pixelArray[i]);
                    }
                }
            }
            var test = "test" + pp 
            test = new maxColor(imagematrixKlein)
            var top10 = test.getTop10()
            //console.log(top10)
            var first = top10[0]
            var color = first[0]
            var verhältnis = first[2]
            //console.log(test.top10)
            
            $("#Result")
                .append('<tr><th align="left">Abschnitt '+pp+', Farbe=' + color + ' mit ' + verhältnis + '% </th></tr>');
            pp++;
            $('#Result tr')
                .last()
                .css('background-color', 'rgb(' + color + ')');
            
            b= legende.indexOf(color)
            
            if ( b === -1){
                
            $("#Legende")
                .append('<tr><th align="left"> Farbe=' + color +'</th>' + ' <th><input type="text" nr= "'+p+'" value="3" size="5"> </th></tr>');
            p++;
            $('#Legende tr')
                .last()
                .css('background-color', 'rgb(' + color + ')');
                
            }
            legende.push(color)

            var imagematrixKlein = new Array;
        objekte.push(test)
        }
        start = i;
    }
    $('#erstelle_map')
        .show()
    $('#result')
        .show()
        
};