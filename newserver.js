//Module requirements 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');


//Create an Express application
var app = express(); 
//Create an Express router 
var router = express.Router();
//Router paths 
//var call = require('/');
//Use cases 
//app.use('/', call);

//Create capability token to allow incoming calls
app.get('/', function(req, res){
 	//Create an object which will generate a capability token 
 	//Replace these two arguments with own account SID/auth token
 	//res.sendFile('/Users/gloriachen/Desktop/PhoneBuzz/index/index.html');
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
 });//.listen(process.env.PORT || 5000);


//app.get('/', function(request, response){
  //  response.sendfile('yourhtmlpagename.html');
//});
 

/*app.post('/', function(req, res){
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
    console.log("hi gloria youre inside the post function");

    //Render the TwiML document using 'toString' 
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	}); 
	res.send(twiml.toString());
	res.end(resp.toString());
})//.listen(process.env.PORT || 5000); 
*/

//Nothing is changed here 
//Create an HTTP server that renders TwiML 
var server = http.createServer(function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 

	resp.say({voice: 'woman'}, 'Gloria is testing Twilio and Node.js')
		.gather({
			finishOnKey: '*', 
			timeout: '20' 
		}, function(){
			this.say('Please enter a number and press the star key when complete. You have 20 seconds.');
		}); 
    //console.log("hi gloria youre inside the post function");
    res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());

	/*var resp = new twilio.TwimlResponse(); 
	 
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
	/*res.writeHead(200, {
		'Content-Type': 'text/xml'
	}); 
	res.end(resp.toString()); */
}).listen(process.env.PORT || 5000);


console.log('Added the calling feature to my application!'); 