const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    destination_name: String,
    country: String,
    description: String,
    estimated_budget: Number,
    weather: String,
    locationType: String,
    transport: String,
    popularity: Number,
});

module.exports = mongoose.model('Destination', destinationSchema);