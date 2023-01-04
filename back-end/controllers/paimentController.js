const paiment = require('../models/paimentModel')
const Appartement = require('../models/appartementModel')


//methode : post
//url : api/paiment/addPaiment
//acces : private

const addPaiment = async (req, res) => {
    const { prix, date_paiment, appartement } = req.body
    if (!prix || !date_paiment || !appartement) {
        res.status(200).send("all filed is required")
    }
    const Searchappartement = await Appartement.findOne({ _id: appartement })
    if (!Searchappartement) {
        res.status(200).send("appartement not found")
    }
    if (Searchappartement.isRented === false) {
        res.status(200).send("appartement not rented")
    }
    const newPaiment = new paiment({
        prix,
        date_paiment,
        appartement
    })
    try {
        const savePaiment = await newPaiment.save()
        res.status(200).send({ msg: "paiment added", savePaiment })
    }
    catch (error) {
        console.log(error)
    }
}

//methode : post
//url : api/paiment/updatePaiment/:id
//acces : private
const updatePaiment = async (req, res) => {
    const { prix, date_paiment, appartement } = req.body
    const { id } = req.params
    if (!prix || !date_paiment || !appartement) {
        res.status(200).send("all filed is required")
    }
    const Searchappartement = await Appartement.findOne({ _id: appartement })
    if (!Searchappartement) {
        res.status(200).send("appartement not found")
    }
    if (Searchappartement.isRented === false) {
        res.status(200).send("appartement not rented")
    }
    try {
        const updatePaiment = await paiment.updateOne({ _id: id }, {
            prix,
            date_paiment,
            appartement
        })
        if (updatePaiment) {
            res.status(200).json({
                prix,
                date_paiment,
                appartement
            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

//methode : get
//url : api/paiment/deleteAppartement/:id
//acces : private
const deletePaiment = async (req, res) => {
    const { id } = req.params
    const SearchPaiment = await paiment.findByIdAndRemove({ _id: id })
    res.status(200).send("delete successufully")
}


module.exports = {
    addPaiment,
    updatePaiment,
    deletePaiment
}