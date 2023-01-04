const express = require('express')
const routerPaiment = express.Router()

const { addPaiment } = require('../controllers/paimentController')
routerPaiment.post('/addPaiment', addPaiment)



module.exports = routerPaiment

