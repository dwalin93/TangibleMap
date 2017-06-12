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
