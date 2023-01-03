const syndique = require('../models/syndiqueModel')
const bycrpt = require('bcryptjs')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
let ls = require('local-storage');
const { sendEmail, forgetPassword } = require('../Utils/sendEmail')
const generateToken = require('../Utils/generateToken');



// method : post
// url : api/auth/register
// acces : private

const register = async (req, res) => {

    const { fullname, email, password } = req.body

    if (!fullname || !email || !password) {
        res.status(404).send("Please add All fields")
    }

    const syndiqueExist = await syndique.findOne({ email })
    if (syndiqueExist) {
        res.status(400).send("user already exist")
    }

    //hash password
    const salt = await bycrpt.genSalt(10)
    const hashedPassword = await bycrpt.hash(password, salt)

    //create syndique

    try {
        const syndique_ = await syndique.create({
            fullname,
            email,
            password: hashedPassword,
            eToken: crypto.randomBytes(64).toString('hex'),
            isVerifed: false
        })

        await sendEmail(req, syndique_, res)

        if (syndique_) {
            res.status(201).json({
                _id: syndique_.id,
                fullname: syndique_.fullname,
                email: syndique_.email,
                password: syndique_.password,
                token: generateToken(syndique_.id),
                eToken: syndique_.eToken,
                isVerifed: syndique_.isVerifed,
                msg: res.message
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// method : post
// url : api/auth/login
// acces : public

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).send("Please add All fields")
    }
    try {
        const syndique_ = await syndique.findOne({ email })
        if (syndique_) {
            const isMatch = await bycrpt.compare(password, syndique_.password)
            if (isMatch && (syndique_.isVerifed === true)) {
                let token = generateToken(syndique_.id, syndique_.email, syndique_.fullname)
                ls.set('token', token)
                res.status(200).json({
                    _id: syndique_.id,
                    fullname: syndique_.fullname,
                    email: syndique_.email,
                    password: syndique_.password,
                    token: token,
                    isVerifed: syndique_.isVerifed,
                    msg: res.message
                })
            }
            else if (isMatch && (syndique_.isVerifed === false)) {
                res.status(401).send("first verify your email address to login")
            }
            else if (!isMatch) {
                res.status(400).send("password is incorrect")
            }
        }
        else {
            res.status(404).send("user not found")
        }
    }
    catch (error) {
        console.log(error)
    }
}

// method : post
// url : api/auth/forgot_password
// acces : public

const forget_password = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400).send("email is required")
    }
    try {
        const syndique_ = await syndique.findOne({ email })
        if (syndique_) {
            await forgetPassword(req, syndique_, res)
            res.status(200).json({
                _id: syndique_.id,
                email: syndique_.email,
                etoken: jwt.sign({ _id: syndique_.id }, process.env.JWT_SECRET, { expiresIn: '10m' }),
                msg: res.err
            })
        }
        else {
            res.status(404).send("user not found")
        }
    } catch (error) {
        console.log(error)
    }
}



const verify_email = async (req, res) => {
    try {
        const token = req.params.token
        const syndique_ = await syndique.findOne({ eToken: token })
        if (syndique_) {
            syndique_.isVerifed = true
            await syndique_.save()
            console.log("email is verified")
            // res.redirect('http://localhost:3000/Login')
        }
        else {
            console.log("email is not verified")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    verify_email,
    forget_password
}

