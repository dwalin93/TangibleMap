/**
 * Created by pglah on 27.06.2017.
 */
var werteServo = [];


module.exports = function () {

this.setWerteServo = function(array) {
        werteServo.push(array);
        console.log(werteServo)
    };

 this.getWerteServo = function() {
        console.log(werteServo);
        return werteServo;
    }

};