const express = require('express')
const routerAppartement = express.Router()

const { addAppartement } = require('../controllers/appartementController')

routerAppartement.post('/addAppartement', addAppartement)

module.exports = routerAppartement

