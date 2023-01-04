const express = require('express')
const routerAppartement = express.Router()

const { addAppartement, updateAppartement, deleteAppartement } = require('../controllers/appartementController')

routerAppartement.post('/addAppartement', addAppartement)
routerAppartement.post('/updateAppartement/:id', updateAppartement)
routerAppartement.delete('/deleteAppartement/:id', deleteAppartement)

module.exports = routerAppartement

