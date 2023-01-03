const mongoose = require("mongoose")

const syndiqueSchema = mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    eToken: {
        type: String
    },
    isVerifed: {
        type: Boolean,
        default: false
    },
    isReset: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('syndique', syndiqueSchema)