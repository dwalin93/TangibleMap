var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    five = require("johnny-five"),
	oldAng = 90;

app.disable('x-powered-by');

app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host+':8000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);
app.use("/", express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

server.listen(3000, "127.0.0.1");


/*
board = new five.Board();

board.on("ready", function() {

  myServo = new five.Servo(9);

  board.repl.inject({
    servo: myServo
  });

  
  //myServo.sweep();

  this.wait(5000, function(){
    myServo.stop();
    myServo.to(oldAng);
	myServo.stop();
  });

  
  io.on('connection', function (socket) {
	
    socket.on("changeAngle",function(ang, control){
		deltAng = oldAng - ang;
		oldAng = ang;
		myServo.step(deltAng);
        console.log(oldAng, control);
    });
      socket.on("text",function(Text){
          var Text=Text
		    lcd.clear().cursor(0, 0).print("JAAAAAAAAAAAAAAA");
          this.wait(3000, function() {
    lcd.clear().cursor(0, 0).print(Text);
  });
    });
      
      

  });
  
lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 13, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 20


    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
  });

  // Tell the LCD you will use these characters:
  lcd.useChar("check");
  lcd.useChar("heart");
  lcd.useChar("duck");

  // Line 1: Hi rmurphey & hgstrp!
  lcd.clear().print("rmurphey, hgstrp");
  lcd.cursor(1, 0);

  // Line 2: I <3 johnny-five
  // lcd.print("I").write(7).print(" johnny-five");
  // can now be written as:
  lcd.print("I :heart: johnny-five");

  this.wait(3000, function() {
    lcd.clear().cursor(0, 0).print("I :check::heart: 2 :duck: :)");
  });

  this.repl.inject({
    lcd: lcd
  });



});

*/
