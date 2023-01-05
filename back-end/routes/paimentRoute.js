const express = require('express')
const routerPaiment = express.Router()


const { addPaiment, updatePaiment, deletePaiment, getAllPaiment, getOnePaiment } = require('../controllers/paimentController')
routerPaiment.post('/addPaiment', addPaiment)
routerPaiment.post('/updatePaiment/:id', updatePaiment)
routerPaiment.get('/deletePaiment/:id', deletePaiment)
routerPaiment.get('/getAllPaiment', getAllPaiment)
routerPaiment.get('/getOnePaiment/:id', getOnePaiment)



module.exports = routerPaiment

