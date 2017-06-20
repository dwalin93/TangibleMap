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





var image = new Array;
var verarbeite = function () {
var newimage = new Bild("img", "canvas",image.length)
$('#verarbeite').hide()
$('#analysiere1').show()
$('#analysiere2').show()
$("#Map1").append('<option id="'+image.length+'">'+newimage.name+'</option>');
$("#Map2").append('<option id="'+image.length+'">'+newimage.name+'</option>');
image.push(newimage);

}




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


$( "#Map1,#Map2" ).change(function() {
    var mapid1 = $("#Map1 option:selected").attr("id");
    var mapid2 = $("#Map2 option:selected").attr("id");
    $("canvas").hide();
    $("#canvas"+mapid1).show();
    $("#canvas"+mapid2).show();

    
})




var analysiere = function () {
    
    $('tr')
        .remove();
    
//alert($("Maps :selected").value)
var mapid = $("#Map1 option:selected").attr("id");
pixelArray = image[mapid].getPixelArray();
    
    //DrawCanvasImage(pixelArray,"canvas2");
    var imagematrixKlein = new Array;
    var legende = new Array;
    var xPin = document.getElementById("xPIN")
        .value;
    var yPin = document.getElementById("yPIN")
        .value;
    var p = 0;
    var pp = 1;
     //console.log("imgData.width = " + imgData.width)
     //console.log("imgData.height = " + imgData.height)
    for (var iiii = 0; iiii < yPin; iiii++) {
        if (iiii == 0) {
            var start =  (iiii * (imgData.width *(imgData.height / xPin)))
        }
        //console.log(start)
        for (var iii = 0; iii < xPin; iii++) {
            var start2 = start + (iii * ((imgData.width / yPin)))
        //console.log(start2)
            
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
            var first = top10[0]
            var color = first[0]
            var verhältnis = first[2]
            
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