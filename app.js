var servo = require('./public/js/servo.js');
var express = require('express')
    , app = express()
    , server = require('http')
    .Server(app)
    , io = require('socket.io')(server)
    , five = require("johnny-five")
    , oldAng = 90;
app.disable('x-powered-by');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://" + req.headers.host + ':8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use("/", express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
server.listen(3000, "127.0.0.1");
// Ohne Board auskommentieren
/*
var board = new five.Board();

board.on("ready", function() {
    console.log("Connected");
  var servo1 = new five.Servo({
      adress:0x40,
      controller: "PCA9685",
      pin: 0,
  });

    var servo2 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 1,
    });

    var servo3 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 2,
    });

    var servo4 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 3,
    });

    var servo5 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 4,
    });

    var servo6 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 5,
    });

    var servo7 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 6,
    });

    var servo8 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 7,
    });

    var servo9 = new five.Servo({
        adress:0x40,
        controller: "PCA9685",
        pin: 8,
    });


    servo1.sweep();
    servo2.sweep();
    servo3.sweep();
    servo4.sweep();
    servo5.sweep();
    servo6.sweep();
    servo7.sweep();
    servo8.sweep();
    servo9.sweep();


   servo1.to(werte[0]);

  this.wait(2000, function(){

      servo1.stop();
      servo2.stop();
      servo3.stop();
      servo4.stop();
      servo5.stop();
      servo6.stop();
      servo7.stop();
      servo8.stop();
      servo9.stop();
  });

  io.on('connection', function (socket) {
	
    socket.on("changeAngle",function(ang, control){
        servo1.to(vergleichArray[0]);
        servo2.to(vergleichArray[1]);
        servo3.to(vergleichArray[2]);
        servo4.to(vergleichArray[3]);
        servo5.to(vergleichArray[4]);
        servo6.to(vergleichArray[5]);
        servo7.to(vergleichArray[6]);
        servo8.to(vergleichArray[7]);
        servo9.to(vergleichArray[8]);
    });
      
    });
      
      

  });

*/
