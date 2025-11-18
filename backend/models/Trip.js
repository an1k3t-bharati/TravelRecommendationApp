const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    description: {
        type: String,
    },
    estimated_budget: {
        type: Number,
    },
    image_url: {
        type: String,
    },
    popularity: {
        type: Number,
    }
}, {
    timestamps: true 
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;