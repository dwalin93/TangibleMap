var maxWidth = 500;
var maxHight = 500;
console.log("drawCanvasImg is running...")
var DrawCanvasImage = function (pixelArray, DOMZielObjektName) {

    this.canvas = document.createElement(DOMZielObjektName);
    this.canvas.id = "canvas2"
    this.context = this.canvas.getContext('2d');
    document.getElementById("Images")
        .appendChild(this.canvas);
    this.width = 500//this.canvas.width = image.width;
    this.height = 500//this.canvas.height = image.height;

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
    console.log(pixelArray)
    
    let image = this.context.createImageData(500, 500);
    let data = image.data;

    for (var i = 0; i < pixelArray; i ++) {
        var pixel = pixelArray[i].split(",")
        console.log(pixel)
      data[i] = pixel[0];
      data[i+1] = pixel[1];
      data[i+2] = pixel[2];
      data[i+3] = alpha;
    }

    this.context.putImageData(image, 0, 0);
    console.log("IMAGE DROW DONE")
   //$('#img').hide(); 
    
};
