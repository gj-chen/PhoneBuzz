//Module requirements 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');
	path = require('path'); 

//Create an Express application
var app = express(); 
//Create an Express router 
var router = express.Router();


http.createServer(app).listen(process.env.PORT || 5000);

//Middleware
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


//Router paths - http://localhost:8080/
//Creates capability token to allow incoming calls
/*router.get('/', function(req, res, next) {
    //Create an object which will generate a capability token 
 	//Replace these two arguments with own account SID/auth token

 	var capability = new twilio.Capability(
 		//process.env.TWILIO_ACCOUNT_SID,
 		'ACa1d489ae50b6b27532f10084df4310e7',
      	'e9fe291240918d37f60e595c043940b4'
      	//process.env.TWILIO_AUTH_TOKEN
 	);
 	console.log('inside router.get /');
 	//Give the capability generator permission to acccept incoming 
 	capability.allowClientIncoming('ACa1d489ae50b6b27532f10084df4310e7'); 

	var token = capability.generate();
 

});*/

router.get('/firstpage', function(req, res, next){
	var capability = new twilio.Capability(ACCOUNT_SID, AUTH_TOKEN);

	//Create a capability token for a client named "jenny"
	capability.allowClientIncoming('ACa1d489ae50b6b27532f10084df4310e7');
	var token = capability.generate();

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
    
    console.log(resp.toString());
    res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());
})

console.log('pre router.get/fizzbuzz');
//Router path /fizzbuzz 
router.get('/fizzbuzz', function(req, res, next) {
	var resp = new twilio.TwimlResponse();

	resp.say('Welcome to Acme Customer Service!')
    	.gather({
        	finishOnKey:'*'
    	}, function() {
        	this.say('Press 1 for customer service')
            	.say('Inside router post', { language:'en-gb' });
    	});

	console.log(resp.toString());
	
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());
});


//app.get 
app.get('/', router);
app.get('/firstpage', router);
app.get('/fizzbuzz', router);

//Nothing is changed here 
//Create an HTTP server that renders TwiML 


/*var server = http.createServer(function(req, res){
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
*/

console.log('Added the calling feature to my application!'); 