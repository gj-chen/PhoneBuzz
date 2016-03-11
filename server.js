//Require the twilio and express modules 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');

//create an express application 
var app = express(); 

//Create an HTTP server that renders TwiML 
var server = http.createServer(function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 
	//The TwiML response object will have function on it that correspond 
	//to TwiML verbs and nouns. This example uses "Say" verb
	//Passing in a string argument sets the content of the XML tag 
	//Passing in an object literal set attributes on the XML tag 
	resp.say({voice: 'woman'}, 'hello!! This is Gloria. I am testing Twilio and Node.js!');

	//Render the TwiML document using 'toString' 
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	}); 
	res.end(resp.toString()); 
}).listen(process.env.PORT || 5000); 

//server.listen(config.port, function(){
//	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
//});
//app.listen(process.env.PORT || 5000, function(){
//	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});
console.log('Visit http://localhost:5000/ in your browser to see TwiML document!'); 
