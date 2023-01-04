const express = require('express')
const routerPaiment = express.Router()

const { addPaiment, updatePaiment } = require('../controllers/paimentController')
routerPaiment.post('/addPaiment', addPaiment)
routerPaiment.post('/updatePaiment/:id', updatePaiment)



module.exports = routerPaiment

