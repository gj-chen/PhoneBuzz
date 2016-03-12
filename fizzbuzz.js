var twilio = require('twilio');
    express = require('express');
    
var resp = new twilio.TwimlResponse();

resp.say('Welcome to Acme Customer Service!')
    .gather({
        action:'http://www.example.com/callFinished.php',
        finishOnKey:'*'
    }, function() {
        this.say('Press 1 for customer service')
            .say('Press 2 for British customer service', { language:'en-gb' });
    });

console.log(resp.toString());

/**
Outputs the following:
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Welcome to Acme Customer Service!</Say>
    <Gather action="http://www.example.com/callFinished.php" finishOnKey="*">
        <Say>Press 1 for customer service.</Say>
        <Say language="en-gb">Press 2 for British customer service.</Say>
    </Gather>
</Response>
*/