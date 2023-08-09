const mongoose = require('mongoose');
const { schema } = require('./product');

const Schegma = mongoose.Schema;

const orderSchegma = new Schegma({
    product: [{
        product: { type: Object, required: true },
        quantity: {type: Number, required: true }
    }],
    user: {
        email:{
            type: String,
            required: true
        },
        userId: {
            type: Schegma.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
});

module.exports = mongoose.model('Order', orderSchegma);