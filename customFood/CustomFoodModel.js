const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CustomFoodSchema = new mongoose.Schema({
	name: {type: String, required: true},
    measurement: {type: String, required: true},
    fat: {type: Number, required: true},
    carb: {type: Number, required: true},
    protein: {type: Number, required: true},
    amount: {type: Number, required: true},
    active: {type: Boolean, default: false},
    editing: {type: Boolean, default: false},
    user: {type: ObjectId, ref: 'User'},
	createdOn: {type: Date, default: Date.now}
});

const CustomFoodModel = mongoose.model('CustomFood', CustomFoodSchema);

module.exports = CustomFoodModel;


