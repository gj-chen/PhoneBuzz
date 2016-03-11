//Require the twilio and express modules 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');

//create an express application 
var app = express(); 

//Create an HTTP server that renders TwiML 
http.createServer(function(req, res){
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
}).listen(5000); 

console.log('Visit http://localhost:5000/ in your browser to see TwiML document!'); 

//Render an HTML page which contains a capability token that
//will grant persmission to accept inbound calls to th ID 
//'gloria' (this can be any string)

app.get('/', function(req, res){
	//Create an object which will generate a capability token 
	//Replace these two arguments with own account SID/auth token
	var capability = new twilio.Capability(
		'ACa1d489ae50b6b27532f10084df4310e7',
        'e9fe291240918d37f60e595c043940b4'
	);

	//Give the capability generator permission to acccept incoming 
	//calls to ID 'gloria'
	capability.allowClientIncoming('gloria'); 

	//Render an HTML page which contains our capability token 
	res.render('index.ejs',{
		token:capability.generate()
	}); 
});
//app.listen(1337); 
//console.log('Visit http://localhost:1337/ to accept inbound calls!');