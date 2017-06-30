var Bild = function (DOMObjektName, DOMZielObjektName, canvasId) {
    this.pixelArray = new Array;
    var imagematrixKlein = new Array;
    this.img = document.getElementById(DOMObjektName);
    this.DOMZielObjektName = "canvas"
    imgData = new CanvasImage(this.img, this.DOMZielObjektName, canvasId);
    imgData.setLine()
    this.name = img.name
    this.Result = new Array
    this.Legende = new Array;
    var pixels = imgData.getImageData()
        .data;
    this.data = imgData
    for (var p = 0, offset, r, g, b, a; p <= (pixels.length); p = p + 4) {
        r = pixels[p + 0];
        g = pixels[p + 1];
        b = pixels[p + 2];
        a = pixels[p + 3];
        var string = r + "," + g + "," + b;
        if (a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                this.pixelArray.push(string);
            } else {
                this.pixelArray.push("255,255,255");
            }
        }
    }
}
Bild.prototype.getPixelArray = function () {
    return this.pixelArray
}
Bild.prototype.getName = function () {
    return this.name
}
Bild.prototype.getResult = function () {
    return this.Result
}
Bild.prototype.newCanvasImage = function () {
    new CanvasImage(this.img, this.DOMZielObjektName);
    console.log(this.img)
}
Bild.prototype.setResult = function (firstcolor) {
    this.Result = firstcolor;
}
Bild.prototype.setLegende = function (legendeArray) {
    this.Legende = legendeArray;
}
Bild.prototype.setIgnoreWeiß = function (Boolean) {
    this.IgnoreWeiß = Boolean;
}
Bild.prototype.setIgnoreAndere = function (string) {
    this.IgnoreAndere = string;
}
Bild.prototype.setGewichtung = function (gewichtung) {
    this.Gewichtung = gewichtung;
}
