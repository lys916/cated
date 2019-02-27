const express = require('express');

const orderRouter = express.Router();
const Order = require('./OrderModel.js');
const {STRIPE_SECRET_KEY} = require('../config');
const stripe = require("stripe")(STRIPE_SECRET_KEY);
console.log(STRIPE_SECRET_KEY);
var accountSid = 'AC73ba0bc327ba7720bf0ffc2cfbb5abe1'; // Your Account SID from www.twilio.com/console
var authToken = 'bf0d5407abcde1f5496ec68f30baabc4';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// /order/
orderRouter.post('/', async function(req, res){
   // build total for stripe to charge
   let total = req.body.total.toString();

   if(total.includes(".")){
      console.log('include .');
      total = total.replace(".", "");
   }else{
      console.log('no dot');
      total = total + "00";
      console.log('dot total', total);
   }

   try {
      // charging
      let {status} = await stripe.charges.create({
         // amount: Number(total),
         amount: 50,
         currency: "usd",
         description: "Custom charge",
         source: req.body.token
      });

      if(status === 'succeeded'){
         // twilio - build message to send to customer 
         client.messages.create({
            body: 'We have receieved your order.',
            to: '+1'+req.body.orderInfo.delPhone,  // Text this number
            from: '+19166196281' // From a valid Twilio number
         }).then((message) =>{
            console.log('sms sent', message.sid)
         }).catch(err=>{
            console.log('err sms', err);
         });

         // save order to mongo
         Order.create(req.body).then(order =>{
            res.json(order);
         });
      }else{
          console.log('fail to save order');
      }
   // stripe fail charging
   } catch (err) {
      res.status(500).end();
   }
});

module.exports = orderRouter;
