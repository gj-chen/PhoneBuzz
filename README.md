# PhoneBuzz

To play Phonebuzz, go to https://desolate-anchorage-71888.herokuapp.com/

To run Phonebuzz locally, use the following command: node newserver.js. You can sub in your own Twilio credentials in the router.get('/firstpage', function(req, res, next){}) call. 

Because the application currently runs on a demo Twilio account, it can only make outgoing calls to my Twilio account. However, you can still make an incoming call to the phone listed. 

Tools used: MongoDB, Express.js, Node.js
