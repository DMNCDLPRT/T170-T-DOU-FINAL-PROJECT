const jwt = require('jsonwebtoken');
const { Customer } = require('../models/customer');
require('dotenv').config();

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    
    // check json web token exist and is user verifed
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/loginCustomer');
                next();
            } else {
                console.log("require Auth middleware");
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/loginCustomer');
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log("check User middleware");
                console.log(decodedToken);
                let user = await Customer.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = 'Guest';
        next();
    }
}

const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/');
                next();
            } else {
                console.log("check isAdmin middleware");
                console.log(decodedToken);
                let user = await Customer.findById(decodedToken.id);
                next();
                if(user.role !== "Admin"){
                    res.status(404).json({ error: 'You need to be an admin to continue!' }); 
                }
            }
        });
    } else {
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser,
    isAdmin
}