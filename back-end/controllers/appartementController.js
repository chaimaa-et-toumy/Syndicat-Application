const appartement = require('../models/appartementModel')
const clientModel = require('../models/clientModel')

//methode : post
//url : api/appartement/addAppartement
//acces : private

const addAppartement = async (req, res) => {
    const { body } = req
    if (!body.adresse || !body.isRented, !body.prix || !body.surface) {
        res.status(400).send("all field is required")
    }
    else {
        try {
            const appartementExist = await appartement.findOne({ adresse: body.adresse })
            if (appartementExist) {
                res.status(400).send("appartement already exist")
            }
            else {
                const newAppartement = new appartement({ ...body })
                await newAppartement.save()
                res.status(201).send("appartement created successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }
}


//methode : post
//url : api/appartement/updateAppartement/:id
//acces : private

const updateAppartement = async (req, res) => {
    const { body } = req
    const { id } = req.params
    try {
        if (body.client) {
            const client_ = await clientModel.findOne({ _id: body.client })
            if (!client_) {
                res.status(400).send("client not found")
            }
        }
        const appartementExist = await appartement.findOne({ adresse: body.adresse })
        if (appartementExist) {
            res.status(400).send("appartement already exist")
        }
        else {
            await appartement.updateOne({ _id: id }, { ...body })
            res.status(200).send(await appartement.findOne({ _id: id }))
        }
    } catch (error) {
        console.log(error)
    }

}

//methode : delete
//url : api/appartement/deleteAppartement/:id
//acces : private

const deleteAppartement = async (req, res) => {
    const { id } = req.params
    await appartement.findByIdAndRemove({ _id: id })
    res.status(200).send("delete successufully")
}

//methode : get
//url : api/appatement/getAllAppartement
//acces : private

const getAllAppartement = async (req, res) => {
    try {
        const appartement_ = await appartement.find().populate('client')
        res.status(200).send(appartement_)
    } catch (error) {
        console.log(error)
    }
}

//methode : get
//url : api/appatement/getOneAppartement/:id
//acces : private

const getOneAppartement = async (req, res) => {
    const { id } = req.params
    try {
        const appartement_ = await appartement.findOne({ _id: id }).populate('client')
        res.status(200).send(appartement_)
    } catch (error) {
        console.log(error)
    }
}

//methode : get
//url : api/appatement/countAppartementRented
//acces : private
const countAppartementRented = async (req, res) => {
    try {
        const appartement_ = await appartement.find({ isRented: true }).countDocuments()
        res.status(200).send(appartement_.toString())
    } catch (error) {
        console.log(error)
    }
}

//methode : get
//url : api/appatement/countAppartementNotRented
//acces : private
const countAppartementNotRented = async (req, res) => {
    try {
        const appartement_ = await appartement.find({ isRented: false }).countDocuments()
        res.status(200).send(appartement_.toString())
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addAppartement,
    updateAppartement,
    deleteAppartement,
    getAllAppartement,
    getOneAppartement,
    countAppartementRented,
    countAppartementNotRented
}