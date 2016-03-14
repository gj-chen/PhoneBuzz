//Module requirements 
var twilio = require('twilio'); 
	express = require('express'); 
	http = require('http');
	path = require('path'); 
	bodyParser = require('body-parser'); 


//Create an Express application
var app = express(); 
//Create an Express router 
var router = express.Router();

//Creates a server for app to listen to 
http.createServer(app).listen(process.env.PORT || 5000);

//Uses bodyParser to support JSON encoded bodies 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Middleware
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


//Router paths - http://localhost:8080/
//First page 
router.get('/', function(req, res, next) {
   res.sendFile(path.join(__dirname + '/index/index.html'));
});

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

//Generate outcoming capability token and make phone call 
router.post('/outcoming', function(req, res, next){
	//Create access to make outgoing calls 
	var client = require('twilio')('ACa1d489ae50b6b27532f10084df4310e7', 'e9fe291240918d37f60e595c043940b4');
	var capability = new twilio.Capability('ACa1d489ae50b6b27532f10084df4310e7', 'e9fe291240918d37f60e595c043940b4');

	//Create a capability token for outcoming calls
	capability.allowClientOutgoing('ACa1d489ae50b6b27532f10084df4310e7');

	var token = capability.generate();

	//Obtaining POST value of phone number
	var phonenumber_from_form = req.body.phonenumber;
	//Append +1(for USA calls) to correct format 
	var phonenumber = "+1" + phonenumber_from_form;

	console.log(phonenumber);
 
	 client.makeCall({
            to: phonenumber,
            from: +19256606725,
            url: '/firstpage'
        }, function(err, message) {
            console.log('Made it inside the makeCall function');
            console.log('The phone number from to: phonenumber is:')
            console.log(phonenumber);
            console.log(err);

        });

	/*resp.say({voice: 'woman'}, 'Hello. This is Robot Gloria. Lets play fizz buzz') 
		.gather({
			action: '/fizzbuzz',
			method: 'GET',
			finishOnKey: '*', 
			timeout: '20' 
		}, function(){
			this.say({voice: 'woman'}, 'Please enter a number and press the star key when complete. You have 20 seconds.');
		}); */

    res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
    res.end(resp.toString());
})

//app.get 
app.get('/', router);
app.get('/firstpage', router);
app.get('/fizzbuzz', router);
app.post('/outcoming', router);
