var http = require("http");
var firmata = require("firmata");

console.log("Starting the code");

var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Connecting to Arduino");
    console.log("Activation of PIN 13");
    console.log("Activation of Pin 8");
    board.pinMode(8, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    board.pinMode(13, board.MODES.OUTPUT); //pin 13 as out
});

http.createServer(function(req, res){ 
    var parts = req.url.split("/"), // split request url on "/" character
    operator1 = parseInt(parts[1],10); // 10 is radix - decimal notation; the base in mathematical numeral systems (from 2 to 36)
    operator2 = parseInt(parts[2],10);   
  
   if (operator1 == 0) {
   console.log("Putting led to OFF");
   board.digitalWrite(13, board.LOW);
}
if (operator1 == 1) {
   console.log("Putting led ON");
   board.digitalWrite(13, board.HIGH);
}
if (operator2 == 0) {
  console.log("Putting led OFF");
  board.digitalWrite(8, board.LOW);
}
    if (operator2 == 1) {
    console.log("Putting led ON");
    board.digitalWrite(8, board.HIGH);
}
        
    res.writeHead(200, {"Content-Type": "text/plain"});//200-ok
    res.write("For test write into browser e.g. 123.1.2.3:8080/1 \n");
    res.end("The value of operator is: " + operator1 + "\n");
     res.end("The value of operator is: " + operator1);
}).listen(8080, "172.16.22.52");




