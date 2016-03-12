//Require the twilio and express modules 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');
	url = require("url");

//create an express application 
var app = express(); 

//Routes for our API 
var router = express.Router(); //gets an instance of the express Router 

//Middleware to use for all requests 
router.use(function(req, res, next){
	//do logging 
	console.log('Something is happening now.');
	next(); //make sure we go to the next routes and don't stop here
});

//Create an HTTP server that renders TwiML 
var server = http.createServer(function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 
	 
	resp.say({voice: 'woman'}, 'Gloria testing Twilio and Node.js')
    	.gather({
        	action: '/fizzbuzz.js',
        	method: 'GET',
        	finishOnKey: '*',
			timeout: '20'
    	}, function() {
        	this.say('Please enter a number and press the star key when complete. You have 20 seconds.');
    	});

	//Render the TwiML document using 'toString' 
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	}); 
	res.end(resp.toString()); 
}).listen(process.env.PORT || 5000); 

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


console.log('Added the calling feature to my application!'); 