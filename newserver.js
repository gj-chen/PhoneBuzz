//Module requirements 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');


//Create an Express application
var app = express(); 

//Create capability token to allow incoming calls
app.get('/', function(req, res){
 	//Create an object which will generate a capability token 
 	//Replace these two arguments with own account SID/auth token
 	var capability = new twilio.Capability(
 		process.env.TWILIO_ACCOUNT_SID,
      	process.env.TWILIO_AUTH_TOKEN
 	);
 
 	//Give the capability generator permission to acccept incoming 
 	//calls to ID 'gloria'
 	capability.allowClientIncoming(process.env.TWILIO_ACCOUNT_SID); 
 
 	var token = capability.generate(); 

 	Twilio.Device.setup('<%= token %>');
 	// Register an event handler to be called when there is an incoming call 
    Twilio.Device.incoming(function(connection){
    //For demo purposed, automatically accept the call
        connection.accept();
    });
 });


//Nothing is changed here 
//Create an HTTP server that renders TwiML 
var server = http.createServer(function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 
	 
	resp.say({voice: 'woman'}, 'Gloria testing Twilio and Node.js')
    	.gather({
        	//action: "http://www.google.com",
        	//method:'GET',
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


console.log('Added the calling feature to my application!'); 