//Module requirements 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');
	path = require('path'); 

//Create an Express application
var app = express(); 
//Create an Express router 
var router = express.Router();

//Middleware for Router Paths on every request 
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    next(); 
});

//Router paths - http://localhost:8080/
//Creates capability token to allow incoming calls
router.get('/', function(req, res) {
    //Create an object which will generate a capability token 
 	//Replace these two arguments with own account SID/auth token

 	var capability = new twilio.Capability(
 		//process.env.TWILIO_ACCOUNT_SID,
 		'ACa1d489ae50b6b27532f10084df4310e7',
      	'e9fe291240918d37f60e595c043940b4'
      	//process.env.TWILIO_AUTH_TOKEN
 	);
 
 	//Give the capability generator permission to acccept incoming 
 	capability.allowClientIncoming(process.env.TWILIO_ACCOUNT_SID); 
 
 	//Render an HTML page which contains our capability token 
 	res.render('index.ejs',{
 		token:capability.generate()
 	}); 
});
//Fizzbuzz route 
//router.get('/fizzbuzz', function(req, res) {
//    res.send('Im the fizzbuzz page!'); 
//});

var fizzbuzz = require('./fizzbuzz');

//Create capability token to allow incoming calls
app.get('/', router);
app.get('/fizzbuzz', router);


//Nothing is changed here 
//Create an HTTP server that renders TwiML 
var server = http.createServer(function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 

	resp.say({voice: 'woman'}, 'Gloria is testing Twilio and Node.js')
		.gather({
			action: '/fizzbuzz',
			method: 'GET',
			finishOnKey: '*', 
			timeout: '20' 
		}, function(){
			this.say('Please enter a number and press the star key when complete. You have 20 seconds.');
		}); 
    
    res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());
}).listen(process.env.PORT || 5000);


console.log('Added the calling feature to my application!'); 