var mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
    deviceId: {
        type: Number,
        min: 1,
        required: true,
    },
    deviceType: {
        type: Number,
    },
    comment: {
        type: String,
    },
    zonePoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'zoneModel'
    },
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'zoneModel'
    }
});

module.exports = mongoose.model('deviceModel', deviceSchema);

