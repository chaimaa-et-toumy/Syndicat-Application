const express = require('express')
const routerAppartement = express.Router()

const { addAppartement, updateAppartement } = require('../controllers/appartementController')

routerAppartement.post('/addAppartement', addAppartement)
routerAppartement.post('/updateAppartement/:id', updateAppartement)

module.exports = routerAppartement

