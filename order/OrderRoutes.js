const express = require('express');
const stripe = require("stripe")("sk_test_5XOQ1slHb1beF5FTI6i869at");
const mongoose = require('mongoose');
const orderRouter = express.Router();
const Order = require('./OrderModel.js');


// const CustomFood = require('./CustomFoodModel');

orderRouter.post('/', async function(req, res){
   
   let total = req.body.total.toString();
   if(total.includes(".")){
      console.log('include .');
      total = total.replace(".", "");
   }else{
      console.log('no dot');
      total = total + "00";
      console.log('dot total', total);
   }
   console.log('recieved order from client, amount', total);
  console.log('posting order');
    try {
        let {status} = await stripe.charges.create({
          amount: Number(total),
          currency: "usd",
          description: "Custom charge",
          source: req.body.token
        });
        console.log('return status');
        if(status === 'succeeded'){
          console.log('saving order to mongo');

          Order.create(req.body).then(order =>{
            console.log('order saved');
            res.json(order);
          });
        }else{
          console.log('fail to save order');
        }
      } catch (err) {
        res.status(500).end();
      }
});

// customFoodRouter.post('/updateFood', function(req, res){
//     console.log('updating custom food', req.body);
// 	CustomFood.findByIdAndUpdate(req.body._id, req.body, {new: true}).then(updated => {
// 		res.json(updated);
// 	});
// });

// customFoodRouter.get('/getFoods', function(req, res){
//     const {userId} = req.query;
//     console.log('get custom foods id', userId);
// 	CustomFood.find({user: userId}).then(post => {
// 		res.json(post);
// 	});
// });

// customFoodRouter.delete('/deleteFood', function(req, res){
//     const {id} = req.query;
// 	CustomFood.findByIdAndRemove(id).then(deleted => {
// 		res.json(deleted);
// 	});
// });

// postRouter.get('/', function(req, res){
// 	const search =  req.query.search;
// 	if(search){
// 		const filter = new RegExp(search, 'i');
// 		Post.find({$or : [{title: filter}, {cuisine: filter}, {tags: filter}]})
// 		.populate('user', 'name')
// 		.then(posts => {
// 			res.json(posts);
// 		})
// 	} 
// });

// postRouter.get('/:id', function(req, res){
// 	const id = req.params.id;
// 	// find posts that owns by the people 'id user' is following...
// 	if (id){
// 		User.findById(id).then(user => {
// 			Post.find({ 'user' : { $in: user.following } })
// 			.sort({createdOn: -1})
// 			.populate('user')
// 			.then(posts => {
// 				console.log('res posts', posts);
// 			res.json(posts);
// 		})	
// 		});
		
// 	}
// });

// postRouter.post('/', function(req, res){
// 	console.log(req.body);
// 	// Post.find().then(posts => {
// 	// 	res.json(posts);
// 	// });
// });

module.exports = orderRouter;
