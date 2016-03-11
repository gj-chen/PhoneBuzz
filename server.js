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
	 

	resp.say({voice: 'woman'}, 'hello!! This is Gloria. I am testing Twilio and Node.js!')
    	.gather({
        	//finishOnKey: '#',
			timeout: '60'
    	}, function() {
        	this.say('Please enter a number and press the pound key when complete.');
    });

	//console.log(resp.toString());

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