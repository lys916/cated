const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    deliveryDate: {type: Date, required: true},
    guestInfo: mongoose.Schema.Types.Mixed,
    items: [mongoose.Schema.Types.Mixed],
    // protein: {type: Number, required: true},
    // amount: {type: Number, required: true},
    // active: {type: Boolean, default: false},
    // editing: {type: Boolean, default: false},
    
    createdOn: {type: Date, default: Date.now},
    token: {type: String},
    total: {type: String},
    fulfilled: {type: Boolean, default: false}
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;


