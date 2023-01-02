require('dotenv').config()
const express = require('express')
const connectDb = require('./Config/DbConfig')
const router = require('./Routes/authRoute')


connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', router)


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