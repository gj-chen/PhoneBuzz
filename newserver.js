//Module requirements 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');
	path = require('path'); 
	url = require('url');
	bodyParser = require('body-parser'); 
	mongoose = require('mongoose');
	monk = require('monk');


//Create an Express application
var app = express(); 
//Create an Express router 
var router = express.Router();

//Creates a server for app to listen to 
http.createServer(app).listen(process.env.PORT || 5000);

//Uses bodyParser to support JSON encoded bodies 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Open MongoDB using monk 
var db = monk('mongodb://gjchen:Gloria05258729@ds015879.mlab.com:15879/callhistory');






//Middleware
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    req.db = db; 
    next(); 
});


//Router paths - http://localhost:8080/
//First page 
router.get('/', function(req, res, next) {
   res.sendFile(path.join(__dirname + '/index/index.html'));
});  

console.log('below get /');

router.get('/firstpage', function(req, res, next){
	
	var capability = new twilio.Capability('ACa1d489ae50b6b27532f10084df4310e7', 'e9fe291240918d37f60e595c043940b4');

	//Create a capability token for incoming & outcoming calls 
	capability.allowClientIncoming('ACa1d489ae50b6b27532f10084df4310e7');
	capability.allowClientOutgoing('ACa1d489ae50b6b27532f10084df4310e7');

	var token = capability.generate();

	var resp = new twilio.TwimlResponse(); 

	resp.say({voice: 'woman'}, 'Hello. This is Robot Gloria. Lets play fizz buzz') 
		.gather({
			action: '/fizzbuzz',
			method: 'GET',
			finishOnKey: '*', 
			timeout: '20' 
		}, function(){
			this.say({voice: 'woman'}, 'Please enter a number and press the star key when complete. You have 20 seconds.');
		}); 

    res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());
    console.log(resp.toString());
})

//Router path /fizzbuzz 
router.get('/fizzbuzz', function(req, res, next) {
	var digit_entered = req.param('Digits');
	var resp = new twilio.TwimlResponse();
	
	var i = 1;
	var result = "";
		while (i <= digit_entered){
			if (i%3 == 0 && i % 5 == 0) {
				result+= "Fizzbuzz";
			}
			else if (i % 3 == 0) {
				result+= "Fizz";
			}
			else if (i % 5 == 0) {
				result+= "Buzz";
			}
			else if(i == 1){
				result += "1";
			}
			else {
				result+= i;
			}
			if (i < digit_entered) {
				result += ", ";
			}
			
			i++;
		}

	resp.say({voice: 'woman'}, result);

	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());
});

console.log('before get number');
router.get('/getnumber', function(req, res, next){
	//Obtaining value of phone number
	console.log('inside get number before grabbing number');
	var phonenumber = req.param('phonenumber');
	var timedelay = req.param('timedelay');
	//var phonenumber = req.body.phonenumber;
	//var timedelay = req.body.timedelay; 
	console.log('the number number is:');
	console.log(phonenumber);
	console.log('the delay is:');
	console.log(timedelay);

	var number_grabbed = JSON.parse(phonenumber);
	console.log('number_grabbed');
	var number = '+1' + number_grabbed;
	console.log(number);

	//Token to allow outgoing calls 
	var capability = new twilio.Capability('ACa1d489ae50b6b27532f10084df4310e7', 'e9fe291240918d37f60e595c043940b4');
	capability.allowClientIncoming('ACa1d489ae50b6b27532f10084df4310e7');
	capability.allowClientOutgoing('ACa1d489ae50b6b27532f10084df4310e7');
	var token = capability.generate();

	//Make a call and respond with TwiML from given URL
	var client = require('twilio')('ACa1d489ae50b6b27532f10084df4310e7', 'e9fe291240918d37f60e595c043940b4');
	console.log('before null');
    console.log(req.headers.host);
    console.log('after null');

    //convert delay string into int 
    var delayInt = parseInt(timedelay, 10); 

    //setting delay timer

    setTimeout(function(){
    	console.log('Inside the delay');
    	client.calls.create({
            url: "https://desolate-anchorage-71888.herokuapp.com/firstpage",
            to: phonenumber,
            from: "+19256607526",
            method: "GET"
        },
        function(err, call){
            //process.stdout.write(call.sid);
            console.log('idk if it worked');
        });
    }, 1000 * delayInt);

//create a reroute to ../callHistory 
//res.redirect('/callHistory');
});

console.log('skipped get number');


//app.get 
app.get('/', router);
app.get('/firstpage', router);
app.get('/fizzbuzz', router);
app.get('/getnumber', router);






/*
//Mongo Database
//============================================
//Connection string 
var db_url = 'mongodb://gjchen:Gloria05258729@ds015879.mlab.com:15879/callhistory';
//Create database connection 
var db = mongoose.connect(db_url); 

//Connection Events 
//When successfully connected: 
mongoose.connection.on('connected', function(){
	console.log('Mongoose default connection opened to: ' + db_url); 
});
//If connection throws an error 
mongoose.connection.on('error', function(err){
	console.log('Connection error: ' + err); 
}); 
//If connection disconnects 
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose default connection disconnected'); 
})
//If the Node process ends, close the mongoose connection 
process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose default connection disconnected through app closing');
		process.exit(0);
	});
});


//Database Schema 
var Schema = mongoose.Schema; 
var callHistorySchema = new Schema({
	numberEntered: String 
});

//Converting our callHistory schema into a Model 
var callHistory = mongoose.model('callHistory', callHistorySchema); 

*/



