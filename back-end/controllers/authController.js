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
        res.status(400).send("Please add All fields")
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

module.exports = {
    register
}

