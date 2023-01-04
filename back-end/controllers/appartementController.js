const appartement = require('../models/appartementModel')
const clientModel = require('../models/clientModel')

//methode : post
//url : api/appartement/addAppartement
//acces : private

const addAppartement = async (req, res) => {
    const { adresse, isRented, prix, surface, client } = req.body
    if (!adresse || !isRented, !prix || !surface || !client) {
        res.status(400).send("all field is required")
    }
    else {
        try {
            const client_ = await clientModel.findOne({ _id: client })
            if (!client_) {
                res.status(400).send("client not found")
            }

            const appartementExist = await appartement.findOne({ adresse })
            if (appartementExist) {
                res.status(400).send("appartement already exist")
            }
            else {
                const newAppartement = new appartement({
                    adresse,
                    isRented,
                    prix,
                    surface,
                    client: client_._id
                })
                await newAppartement.save()
                res.status(200).send("appartement created successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }
}





//methode : post
//url : api/appartement/updateAppartement/:id
//acces : private





module.exports = {
    addAppartement
}