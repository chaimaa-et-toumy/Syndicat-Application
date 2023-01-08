require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./Config/DbConfig')
const router = require('./routes/authRoute')
const routerClient = require('./routes/clientRoute')
const routerAppartement = require('./routes/appartementRoute')
const routerPaiment = require('./routes/paimentRoute')
const errRoute = require('./middleware/RouterError')
const { requiredLogin } = require('./middleware/authMiddleware')


connectDb()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', router)
app.use('/api/client', routerClient)
app.use('/api/appartement', [requiredLogin, routerAppartement])
app.use('/api/paiment', [requiredLogin, routerPaiment])
app.use(errRoute)


const port = process.env.port || 5050

app.listen((port), (err) => {
    if (!err) {
        console.log(`the port ${port} is running`)
    }
    else {
        console.log(err)
    }
})

module.exports = app