const jwt = require('jsonwebtoken')
const generateToken = (id, email, name) => {
    return jwt.sign({ id, email, name }, process.env.JWT_SECRET, { expiresIn: '2d' })
}
module.exports = generateToken