const express = require('express')
const routerClient = express.Router()

const { addClient, updateClient, deleteClient, getAllClient, getOneClient, countClient } = require('../controllers/clientController')

routerClient.post('/addClient', addClient)
routerClient.post('/updateClient/:id', updateClient)
routerClient.delete('/deleteClient/:id', deleteClient)
routerClient.get('/getAllClient', getAllClient)
routerClient.get('/getOneClient/:id', getOneClient)
routerClient.get('/countClient', countClient)

module.exports = routerClient