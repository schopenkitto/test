var mongoose = require('mongoose');

var measdataSchema = new mongoose.Schema({
    measTime: {
        type: Date,
        required: true,
    },
    dataCount: {
        type: Number,
        min: 0,
    },
    data: {
        type: Buffer,
    },
    comment: {
        type: String,
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'deviceModel',
    }
})

module.exports = mongoose.model('measdataMode', measdataSchema);