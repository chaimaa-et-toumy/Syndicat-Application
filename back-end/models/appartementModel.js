const mongoose = require('mongoose')

const appartementSchema = mongoose.Schema({
    adresse: {
        type: String,
        unique: true
    },
    isRented: {
        type: Boolean,
        default: false
    },
    prix: {
        type: Number
    },
    surface: {
        type: String
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('appartement', appartementSchema)

