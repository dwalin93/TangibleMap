var socket = io("http://" + document.location.hostname + ":3000")
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
var pixelArray = new Array;
var verarbeite = function () {
    pixelArray = new Array;
    var imagematrixKlein = new Array;
    var img = document.getElementById("img");
    var imgData = new CanvasImage(img);
    var pixels = imgData.getImageData()
        .data;
    for (var p = 0, offset, r, g, b, a; p < pixels.length; p = p + 4) {
        r = pixels[p + 0];
        g = pixels[p + 1];
        b = pixels[p + 2];
        a = pixels[p + 3];
        var string = r + "," + g + "," + b;
        pixelArray.push(string);
        /*
        if (a >= 125) {
        		if (!(r > 250 && g > 250 && b > 250)) {
        			pixelArray.push(string);
        		}
        	}
            
            */
    }
    //$("#analysiere").show();  
    $("#analysiere")
        .show();
    $("#verarbeite")
        .hide();
    console.log(pixelArray)
}

var erstelleMap = function () {
    var gewichtung = new Array;
        console.log("HIER")

  $('#Result').find("input").each(function(index){
      gewichtung.push($(this.value).selector)
});
    console.log(gewichtung)
    
    var minimum = Math.min(...gewichtung)
    var maximum = Math.max(...gewichtung)
    var max = 170
    var min = 0
    var wert = ((max-min)/(maximum))
    for(var i = 0; i<gewichtung.length;i++){
        gewichtung[i]=wert*gewichtung[i]
    }
    console.log(gewichtung)

    
        var ang = gewichtung[5]
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
    var imagematrixGroß = new Array;
    var xPin = document.getElementById("xPIN")
        .value;
    var yPin = document.getElementById("yPIN")
        .value;
    var p = 0;
    for (var iiii = 0; iiii < yPin; iiii++) {
        if (iiii == 0) {
            var start = Math.round(iiii * (img.width * (img.height / xPin)))
        }
        for (var iii = 0; iii < xPin; iii++) {
            var start2 = Math.round(start + (iii * (img.width / yPin)))
            for (var ii = 0; ii < Math.round((img.height / xPin)); ii++) {
                var start3 = Math.round((ii * (img.width)) + start2)
                var max = Math.round(start3 + img.width / yPin);
                for (var i = start3; i < max; i++) {
                    imagematrixKlein.push(pixelArray[i]);
                }
            }
            var result = maxColor(imagematrixKlein)
            var color = result[0]
            var verhältnis = result[1]
            
            $("#Result")
                .append('<tr><th align="left"> Höchstfarbe=' + color + ' mit ' + verhältnis + '% </th>' + ' <th><input type="text" nr= "'+p+'" value="3" size="5"> </th></tr>');
            p++;
            //$("#Result2").append('<li ><input type="text" id= "xPIN" value="3"></li>');
            $('tr')
                .last()
                .css('background-color', 'rgb(' + color + ')');
            //$('li').last().css("width", "100");
            //$("#Result").css({color: rgb(result)})
            imagematrixGroß.push(color)
            var imagematrixKlein = new Array;
            
        }
        start = i;
    }
    $('#erstelle_map')
        .show()
    console.log(imagematrixGroß)
};
