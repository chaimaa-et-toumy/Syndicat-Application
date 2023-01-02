const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoose connected : ${conn.connection.host}`)

    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDb