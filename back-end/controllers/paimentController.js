const paiment = require('../models/paimentModel')
const Appartement = require('../models/appartementModel')
const Client = require('../models/clientModel')


//methode : post
//url : api/paiment/addPaiment
//acces : private

const addPaiment = async (req, res) => {
    const { prix, date_paiment, appartement } = req.body
    if (!prix || !date_paiment || !appartement) {
        res.status(400).send("all filed is required")
    }
    const Searchappartement = await Appartement.findOne({ _id: appartement })
    if (!Searchappartement) {
        res.status(400).send("appartement not found")
    }
    if (Searchappartement.isRented === false) {
        res.status(400).send("appartement not rented")
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

//methode : delete
//url : api/paiment/deleteAppartement/:id
//acces : private
const deletePaiment = async (req, res) => {
    const { id } = req.params
    const SearchPaiment = await paiment.findByIdAndRemove({ _id: id })
    res.status(200).send("delete successufully")
}

//methode : get
//url : api/paiment/getAllPaiment
//acces : private

const getAllPaiment = async (req, res) => {

    try {
        const allPaiment = await paiment.find().populate({ path: 'appartement', populate: { path: 'client' } })
        res.status(200).send(allPaiment)
    } catch (error) {
        console.log(error)
    }
}

//methode : get
//url : api/paiment/getOnePaiment/:id
//acces : private

const getOnePaiment = async (req, res) => {
    const { id } = req.params
    try {
        const SearchOnePaiment = await paiment.find({ _id: id }).populate({ path: 'appartement', populate: { path: 'client' } })
        res.status(200).send(SearchOnePaiment)
    }
    catch (err) {
        console.log(err);
    }
}

//methode : get
//url : api/paiment/countPaiment
//acces : private

const countPaiment = async (req, res) => {
    try {
        const countPaiment = await paiment.countDocuments()
        res.status(200).send(countPaiment.toString())
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    addPaiment,
    updatePaiment,
    deletePaiment,
    getAllPaiment,
    getOnePaiment,
    countPaiment
}