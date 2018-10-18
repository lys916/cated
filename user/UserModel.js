const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	height: mongoose.Schema.Types.Mixed,
	grams: mongoose.Schema.Types.Mixed,
	weight: {type: Number},
	age: {type: Number},
	goalWeight: {type: String},
	goalCalories: {type: Number},
	goalSet: {type: Boolean, default: false},
	training: {type: String},
	admin: {type: Boolean, default: false}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;