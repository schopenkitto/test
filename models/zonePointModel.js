var mongoose = require('mongoose');

var zonePointSchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 1,
        required: true,
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180,
    },
});