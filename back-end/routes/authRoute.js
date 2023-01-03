const express = require('express')
const router = express.Router()

const { register, login, verify_email, forget_password } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get('/verify_email/:token', verify_email)
router.post('/forgotpassword', forget_password)


module.exports = router