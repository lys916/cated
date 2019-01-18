const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    orderInfo: mongoose.Schema.Types.Mixed,
    // protein: {type: Number, required: true},
    // amount: {type: Number, required: true},
    // active: {type: Boolean, default: false},
    // editing: {type: Boolean, default: false},
    
    createdOn: {type: Date, default: Date.now},
    token: {type: String},
    fulfilled: {type: Boolean, default: false}
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;


