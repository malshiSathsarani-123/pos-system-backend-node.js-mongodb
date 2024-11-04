const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    customer_id: {
        type: String,
        ref: 'Customer',
        required: true
    }
});

module.exports = mongoose.model('Orders', orderSchema);
