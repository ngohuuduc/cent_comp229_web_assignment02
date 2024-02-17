const mongoose = require('express')

const productsSchema = new mongoose.Schema({
    product: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    price: {
        type: double,
        required : true,
        default: 0.0
    },
    quantity: {
        type: double,
        required : true,
        default: 1.0
    },
    category: {
        type: String,
        required : true
    }

})

module.exports = mongoose.model('products',productsSchema)