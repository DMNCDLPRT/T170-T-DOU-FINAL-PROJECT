const { Customer } = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getForgotPasswordView = (req, res, next) => {
    res.render('auth/forgotPassword', {title: "Forgot Password"});
}

const forgotPassword = async (req, res, next) => {
    const data = req.body;
    try{
        if(await Customer.findOne({ email: data.email })){
            const email = await Customer.findOne({ email: data.email });
            res.status(200).json({ 
                success: 'email-found',
                url: '/forgotPassword/reset',
                data: email
            });
        }
        res.status(400).json({ error: 'error', message: 'Email not found' });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getNewPasswordView = (req, res, next) => {
    let userData = req.params;
    res.render('auth/reset', { data: userData, title: "New Password"});
}



module.exports = {
    getForgotPasswordView,
    forgotPassword,
    getNewPasswordView
}