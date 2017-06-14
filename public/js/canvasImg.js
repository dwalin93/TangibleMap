console.log("canvasImg is running...")
var CanvasImage = function (image) {
    if (document.getElementById('canvas') !== undefined) {
        $('canvas')
            .remove();
    }
    $("#img")
        .hide()
    $("#canvas")
        .show()
    this.canvas = document.createElement('canvas');
    this.canvas.id = "canvas"
    this.context = this.canvas.getContext('2d');
    document.getElementById("Images")
        .appendChild(this.canvas);
    this.width = this.canvas.width = image.width;
    console.log(image.height)
    this.height = this.canvas.height = image.height;
    console.log(image.width)
    this.context.drawImage(image, 0, 0, this.width, this.height);
    console.log(this.canvas)
    console.log("Canvas: weite = " + this.width + " Höhe = " + this.height)

    
    this.setLine();    
};

CanvasImage.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};
CanvasImage.prototype.update = function (imageData) {
    this.context.putImageData(imageData, 0, 0);
};
CanvasImage.prototype.getPixelCount = function () {
    return this.width * this.height;
};
CanvasImage.prototype.getImageData = function () {
    return this.context.getImageData(0, 0, this.width, this.height);
};
CanvasImage.prototype.removeCanvas = function () {
    this.canvas.parentNode.removeChild(this.canvas);
};
CanvasImage.prototype.setLine = function(rows,colums){
   var rows = document.getElementById("xPIN")
        .value;
    var columns = document.getElementById("yPIN")
        .value;
    this.context.beginPath();

    for(var x = 0; x < this.canvas.width; x++) {
        this.context.moveTo(x * this.canvas.width/rows, 0);
        this.context.lineTo(x * this.canvas.width/rows, this.canvas.height);
    }
    for(var y = 0; y < this.canvas.height; y++) {
        this.context.moveTo(0, y * this.canvas.height/ columns);
        this.context.lineTo(this.canvas.width, y * this.canvas.height/ columns);
    }
    this.context.stroke();  
    
};