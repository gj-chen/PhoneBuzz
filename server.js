//Require the twilio and express modules 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');
	url = require("url");

//create an express application 
var app = express(); 

//Routes for our API 
var router = express.Router(); //gets an instance of the express Router 

//Create an HTTP server that renders TwiML 
var server = http.createServer(function(req, res){
	//Create a TwiML response 
	var resp = new twilio.TwimlResponse(); 
	 

	resp.say({voice: 'woman'}, 'hello!! This is Gloria. I am a silly goose and I like bears, also david is a very cool guy :D')
    	.gather({
        	action: "www.google.com",
        	method:'POST',
        	finishOnKey: '*',
			//timeout: '20'
    	}, function() {
        	this.say('Please enter a number and press the star key when complete. You have 20 seconds.');
    	});
    	//.redirect('/fizzbuzzhtml.html');
    	//.say('You did not press anything');
    
	//var parsedUrl = url.parse(req.url, true); // true to get query as object
	//console.log(req.url);
	//console.log(parsedUrl);
  	//var queryAsObject = parsedUrl.query; //{Digits = "#####"}

  	//console.log("This is the queryAsObject: ")
  	//console.log(queryAsObject); 

  	//Convert JS object into JSON text and store in a string 
  	//var stringObject = JSON.stringify(queryAsObject); 
  	//console.log(stringObject);
  	//convert into JS objects 
  	//var digitObject = JSON.parse(stringObject); 
  	//console.log(digitObject.Digits);

  	//resp.say({voice: 'woman'}, 'You reached the end');

  	//var parsedObject = JSON.parse(queryAsObject); 
  	//console.log(parsedObject.Digits); 

  	//var jsontext = '{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}';
	//var contact = JSON.parse(jsontext);
	//document.write(contact.surname + ", " + contact.firstname);

  	//console.log(JSON.stringify(queryAsObject));

  	var resp2 = new twilio.TwimlResponse(); 
  	//if(Digits > 100){
  	//	resp.say({voice: 'woman'}, 'The number you entered is greater than 100');
  	//}

	//Render the TwiML document using 'toString' 
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	}); 
	res.end(resp.toString()); 
}).listen(process.env.PORT || 5000); 

//obtain the digits inputted from gather 



//route to new page 
//router.route('/fizzbuzzhtml.html');
//console.log('should have routed to new page')


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