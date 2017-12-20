var mongoose = require('mongoose');

var zoneSchema = new mongoose.Schema({
    zoneId: {
        type: Number,
        min: 1,
        required: true,
        unique: true,
    },
    zoneType: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
});

module.exports = mongoose.model('zoneModel', zoneSchema);
