const mongoose = require("mongoose")

const clientShema = mongoose.Schema({
    fullname: {
        type: String,
    },
    cin: {
        type: String,
        required: true
    },
    tel: {
        type: Number
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('client', clientShema)