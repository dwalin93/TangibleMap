var maxWidth = 300;
var maxHight = 300;
console.log("canvasImg is running...")
var CanvasImage = function (image, DOMZielObjektName, canvasId) {
    /*if (document.getElementById(DOMZielObjektName) !== undefined) {
        $(DOMZielObjektName).remove();
    }*/
    this.canvas = document.createElement(DOMZielObjektName);
    this.canvas.id = "canvas" + canvasId
    this.context = this.canvas.getContext('2d');
    document.getElementById("Images")
        .appendChild(this.canvas);
    this.width = this.canvas.width = image.width;
    this.height = this.canvas.height = image.height;
    if (this.width > this.height) {
        if (this.width > maxWidth) {
            this.height *= maxWidth / this.width;
            this.width = maxWidth;
            this.canvas.width = maxWidth;
            this.canvas.height = this.height;
        }
    } else {
        if (this.height > maxHight) {
            this.width *= maxHight / this.height;
            this.height = maxHight;
            this.canvas.height = maxHight;
            this.canvas.width = this.width;
        }
    }
    //console.log(image)
    this.context.drawImage(image, 0, 0, this.width, this.height);
    this.setLine();
    //console.log("hier")
    $("#canvas" + canvasId)
        .before("<h2 id=" + "imgName" + canvasId + ">" + image.name + "</h2>");
    $('#img , canvas, h2')
        .hide();
    $("#imgName" + canvasId + ", #canvas" + canvasId)
        .show();
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
CanvasImage.prototype.setLine = function () {
    var rows = document.getElementById("xPIN")
        .value;
    var columns = document.getElementById("yPIN")
        .value;
    this.context.beginPath();
    for (var x = 0; x < this.canvas.width; x++) {
        this.context.moveTo(x * this.canvas.width / rows, 0);
        this.context.lineTo(x * this.canvas.width / rows, this.canvas.height);
    }
    for (var y = 0; y < this.canvas.height; y++) {
        this.context.moveTo(0, y * this.canvas.height / columns);
        this.context.lineTo(this.canvas.width, y * this.canvas.height / columns);
    }
    this.context.stroke();
};
