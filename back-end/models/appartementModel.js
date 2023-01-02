const mongoose = require('mongoose')

const appartementSchema = mongoose.Schema({
    adresse: {
        type: String
    },
    isRented: {
        type: Boolean,
        default: false
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('appartement', appartementSchema)

