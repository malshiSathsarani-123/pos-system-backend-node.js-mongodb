const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    product_code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    in_stock: {
        type: Number,
        required: true
    },
    additional_info: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', ItemSchema);
