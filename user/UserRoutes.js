const express = require('express');
const User = require('./UserModel.js');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post('/signup', function(req, res){
   console.log('user signing up');
   const { emailPhone, password, name } = req.body;

	User.find({emailPhone}).then(userFound=>{
		console.log('user found', userFound);
		if(userFound.length > 0){
			res.json({errorMessage: 'You already have an account with his email or phone number. Please log in.'})
		}else{
			const user = new User();
			user.emailPhone = emailPhone;
         user.name = name;
         user.confirmed = false;
         user.confirmationNumber = '91622'

			bcrypt.hash(password, 11, (err, hash) => {
				if (err) throw err;
            user.password = hash;
            
            console.log('user to save', user);
				user.save().then(savedUser => {
					res.json(savedUser);
				});
			});
		}
	})
	
});

userRouter.post('/login', function(req, res){
	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if(!user){
			res.json({errorMessage: 'Wrong username or password'});
		}
		if(user){
			bcrypt.compare(password, user.password, function(err, valid) {
    			if(!valid){
    				res.json({errorMessage: 'Wrong username or password'});
				}
				console.log('pwd valid', true)
    			const token = jwt.sign(user, 'This is a secret string', { expiresIn: '1h' });
        		res.json({ token: token, username: user.name, email: user.email });
			});
		}
	});
});

userRouter.put('/addGoal', function(req, res){
	const { goal, userId } = req.body;
	console.log('goal to update', goal)
	console.log('id to update', userId);
	User.findByIdAndUpdate(userId, goal, {new: true}, function(err, updated){
		if(err){console.log(err)}
		console.log('GOAL IS SET!', updated);
		res.json(updated);
	});
});

module.exports = userRouter;