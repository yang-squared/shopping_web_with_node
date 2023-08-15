const mongoose = require('mongoose');
const Schegma = mongoose.Schegma;

const postSchgma = new Schegma({
    title: {
        type: String,
        required: ture
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: ture
    },
    creator: {
        type: Object,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchgma);