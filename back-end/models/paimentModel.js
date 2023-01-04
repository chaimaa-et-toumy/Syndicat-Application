const mongoose = require("mongoose")

const paimentSchema = mongoose.Schema({
    prix: {
        type: Number,
    },
    date_paiment: {
        type: Date,
    },
    appartement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appartement'
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('paiment', paimentSchema)