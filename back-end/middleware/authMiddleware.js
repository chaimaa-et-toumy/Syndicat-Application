const jwt = require('jsonwebtoken');
const Syndique = require('../models/syndiqueModel');
const ls = require('local-storage');


const requiredLogin = async (req, res, next) => {

    let token = ls.get('token');
    console.log(token)
    if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.syndique = await Syndique.findById(decode.id).select('-password');
        next();
    }
    else {
        res.status(401).send("Not authorized , no token !")
    }
}

module.exports = { requiredLogin };
