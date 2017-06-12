console.log("maxColor is running...")
var maxColor = function (colorArray) {
    var z = 0;
    var a = 0;
    var pixelArray = colorArray;
    var anzahlimageMatrix = new Array;
    var imagematrixKlein = new Array;
    var weiß = $('#weiß').is(':checked')
    for (var x = 0; x < pixelArray.length; x++) {
        
        a = imagematrixKlein.indexOf(pixelArray[x]);
        if(weiß && (pixelArray[x]=="255,255,255")){    
            }else{
        if (a === -1) {
            imagematrixKlein.push(pixelArray[x]);
            anzahlimageMatrix.push(1);
        } else {
            
            anzahlimageMatrix[a] = anzahlimageMatrix[a] + 1;
            if (anzahlimageMatrix[a] >= (pixelArray.length / 2)) {
                console.log("mehr als 50%")
                return [imagematrixKlein[a], ">= 50"];
            }
        }}
        
    }
    var HöchsteZahl = Math.max(...anzahlimageMatrix)
    var r = anzahlimageMatrix.indexOf(HöchsteZahl);
    //console.log("An der stelle mit der Höchsten anzahl von " + HöchsteZahl +" von " + pixelArray.length + " ist die Farbe " + imagematrixKlein[r]);
    var verhältnis = Math.round((anzahlimageMatrix[r] / colorArray.length) * 100)
    return [imagematrixKlein[r], verhältnis];
}
