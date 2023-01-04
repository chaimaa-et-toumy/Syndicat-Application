const appartement = require('../models/appartementModel')
const clientModel = require('../models/clientModel')

//methode : post
//url : api/appartement/addAppartement
//acces : private

const addAppartement = async (req, res) => {
    const { adresse, isRented, prix, surface } = req.body
    if (!adresse || !isRented, !prix || !surface) {
        res.status(400).send("all field is required")
    }
    else {
        try {
            const appartementExist = await appartement.findOne({ adresse })
            if (appartementExist) {
                res.status(400).send("appartement already exist")
            }
            const newAppartement = new appartement({
                adresse,
                isRented,
                prix,
                surface
            })
            await newAppartement.save()
            res.status(200).send("appartement created successfully")
        } catch (error) {
            console.log(error)
        }
    }
}



module.exports = {
    addAppartement
}