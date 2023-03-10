const express = require('express')
const routerAppartement = express.Router()

const { addAppartement, updateAppartement, deleteAppartement, getAllAppartement, getOneAppartement, countAppartementRented, countAppartementNotRented } = require('../controllers/appartementController')

routerAppartement.post('/addAppartement', addAppartement)
routerAppartement.post('/updateAppartement/:id', updateAppartement)
routerAppartement.delete('/deleteAppartement/:id', deleteAppartement)
routerAppartement.get('/getAllAppartement', getAllAppartement)
routerAppartement.get('/getOneAppartement/:id', getOneAppartement)
routerAppartement.get('/countAppartementRented', countAppartementRented)
routerAppartement.get('/countAppartementNotRented', countAppartementNotRented)

module.exports = routerAppartement

