const express = require('express')
const routerPaiment = express.Router()

const { addPaiment, updatePaiment, deletePaiment } = require('../controllers/paimentController')
routerPaiment.post('/addPaiment', addPaiment)
routerPaiment.post('/updatePaiment/:id', updatePaiment)
routerPaiment.get('/deletePaiment/:id', deletePaiment)



module.exports = routerPaiment

