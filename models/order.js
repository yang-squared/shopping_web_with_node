const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');
const { schema } = require('./product');

const Schegma = mongoose.Schema;

const UserSchegma = new Schegma({
    userId: {
        type: Schegma.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        items: [{
            productId: {
                type: Schegma.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

UserSchegma.methods.addOrder = function (product) {
    const orderItems = [...this.order.items]

    orderItems.push({
        
    })
}