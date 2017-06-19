var Bild = function (DOMObjektName, DOMZielObjektName) {
        
    this.pixelArray = new Array;
    var imagematrixKlein = new Array;
    var img = document.getElementById(DOMObjektName);
    var DOMZielObjektName = "canvas"
    imgData = new CanvasImage(img, DOMZielObjektName);
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
                    this.pixelArray.push(string);

                }else{
        			this.pixelArray.push("255,255,255");


                }
        	}


    }
    //this.getPixelArray()
}


Bild.prototype.getPixelArray = function(){
    return this.pixelArray
}

