const express = require('express')
const errRoute = express()

errRoute.all('*', (req, res) => {
    const err = new Error(`can't find this route : ${req.originalUrl}`)
    res.status(404).send(err.message)
})
module.exports = errRoute