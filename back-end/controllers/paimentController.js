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

module.exports = {
    addPaiment
}