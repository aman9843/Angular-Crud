const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require('../models')
const User = db.Users

// Protected Route
const protect = asyncHandler(async(req,res,next) => {

    let token;
    if(req.headers.authorization) {
        try {
            token = req.headers.authorization
            const decode = jwt.verify(token,"aman")
            req.user = await User.findByPk(decode.id)
            next()


        } catch(error) {
            console.log(error)
            res.status(401)
            throw new Error('Authorization of Token Failed ')

        }
    } if(!token) {
        res.status(401)
        throw new Error('Not Authorized & No Token')
    }



})

// Admin
const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error("Not Authorized ")
    }
}


module.exports = {protect,admin}
