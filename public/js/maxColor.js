console.log("maxColor is running...")
function maxColor(colorArray) {
    var a = 0;
    this.pixelArray = colorArray;
    //console.log(this.pixelArray)
    this.anzahlimageMatrix = new Array;
    this.imagematrixKlein = new Array;
    weiß_ignore = $('#weiß_ignore').is(':checked')
    color_ignore = $('#color_ignore').val()
    for (var x = 0; x < this.pixelArray.length; x++) {
        a = this.imagematrixKlein.indexOf(this.pixelArray[x]);
        if(weiß_ignore && (this.pixelArray[x]=="255,255,255")){// do nothing
        } 
        else if(color_ignore !== "" && (this.pixelArray[x] == color_ignore)){// do nothing
            
        } 
        else{
        if (a === -1) {
            if(this.pixelArray[x] == "undefined"){
                //console.log("undefined")
            }else{
            this.imagematrixKlein.push(this.pixelArray[x]);
            this.anzahlimageMatrix.push(1);}
        } else {
            
            this.anzahlimageMatrix[a] = this.anzahlimageMatrix[a] + 1;
            /*if (this.anzahlimageMatrix[a] >= (this.pixelArray.length / 2)) {
                console.log("mehr als 50%")
                return [this.imagematrixKlein[a], ">= 50"];
            }*/
        }}
        
    }
    //this.HöchsteZahl = Math.max(...this.anzahlimageMatrix)
    
this.getTop10()
    this.getfirst()
    
    //return [imagematrixKlein[r], verhältnis];
};


maxColor.prototype.getTop10 = function () {
    var internAnzahlimageMatrix = this.anzahlimageMatrix.slice();
    this.top10 = new Array;
    for (var i = 0; i<10;i++){
    var d = Math.max(...internAnzahlimageMatrix)
    //console.log(d)

    d = internAnzahlimageMatrix.indexOf(d);
            //console.log(d)

        var verhältnis = Math.round((internAnzahlimageMatrix[d] / this.pixelArray.length) * 100)
        this.top10.push([this.imagematrixKlein[d],internAnzahlimageMatrix[d],verhältnis])
        internAnzahlimageMatrix[d]=0;
    }
 return this.top10
};

maxColor.prototype.getfirst = function(){
    this.first = this.top10[0] 
    return this.first
}


