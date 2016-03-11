//Require the twilio and express modules 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');

//create an express application 
var app = express(); 

//Create an HTTP server that renders TwiML 
http.createServer.listen(process.env.PORT || 5000, function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 
	//The TwiML response object will have function on it that correspond 
	//to TwiML verbs and nouns. This example uses "Say" verb
	//Passing in a string argument sets the content of the XML tag 
	//Passing in an object literal set attributes on the XML tag 
	resp.say({voice: 'woman'}, 'hello!! This is Gloria. I am testing Twilio and Node.js!');

	//Render the TwiML document using 'toString' 
	//Since we do not want it to show up explicitly - comment out rendering 
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	}); 
	res.end(resp.toString()); 
})//.listen(5000); 

console.log('Visit http://localhost:5000/ in your browser to see TwiML document!'); 
