const client = require('../models/clientModel');

// method : post
// url : api/client/addClient
// acces : private

const addClient = async (req, res) => {
    const { fullname, cin, tel } = req.body
    if (!fullname || !cin || !tel) {
        res.status(200).send("All filed is required")
    }
    try {
        const clientExist = await client.findOne({ cin })
        if (clientExist) {
            res.status(400).send("client already exist")
        }
        const newClient = new client({
            fullname,
            cin,
            tel
        })
        await newClient.save()
        res.status(200).send("created successfully")
    }
    catch (error) {
        console.log(error)
    }
}

//methode : post
//url : api/client/updateClient/:id
//acces : private

const updateClient = async (req, res) => {
    const { fullname, cin, tel } = req.body
    const { id } = req.params
    if (!fullname || !cin || !tel) {
        res.status(400).send("all field is required")
    }
    else {
        try {

            const clientExist = await client.findOne({ cin })
            if (clientExist) {
                res.status(400).send("client already exist")
            }

            const client_ = await client.updateOne({ _id: id }, {
                fullname,
                cin,
                tel
            })
            res.status(200).send("client update successfully")
        } catch (error) {
            console.log(error)
        }
    }

}

//methode : delete
//url : api/client/delete/:id
//acces : private

const deleteClient = async (req, res) => {
    const { id } = req.params
    try {
        const client_ = await client.findByIdAndRemove({ _id: id })
        res.status(200).send("client deleted successfully")
    } catch (error) {
        console.log(error)
    }
}

//methode : get
//url : api/client/getAllClient
//acces : private

const getAllClient = async (req, res) => {
    const client_ = await client.find({})
    res.status(200).send(client_)
}

//methode : get
//url : api/client/getOneClient 
//acces : private

const getOneClient = async (req, res) => {
    const { id } = req.params
    const client_ = await client.findById({ _id: id })
    res.status(200).send(client_)
}


module.exports = {
    addClient,
    updateClient,
    deleteClient,
    getAllClient,
    getOneClient
}
