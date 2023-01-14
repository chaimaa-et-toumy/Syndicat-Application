const express = require('express')
const router = express.Router()

const { register, login, verify_email, forget_password, resetpassword, logout, verify_email_rest } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get('/verify_email/:token', verify_email)
router.post('/forgotpassword', forget_password)
router.post('/resetpassword/:token', resetpassword)
router.get('/forgetPassword/:token', verify_email_rest)
router.get('/logout', logout)



module.exports = router