const { Customer, forgot } = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getForgotPasswordView = (req, res, next) => {
    res.render('auth/forgotPassword', {title: "Forgot Password"});
}

const forgotPassword = async (req, res, next) => {
    const { error } = forgot(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    const { token, pssword: plainPassword} = req.body;
    const id = req.params.id;

    const user = jwt.verify(token, JWT_SECRET);
    const _id = user(id);

    const password = await bcrypt.hash(plainPassword, 10);

    let customer = await Customer.findByIdAndUpdate(_id, {
        pssword: password
    }, {new: true});

    if(!customer) return res.status(404).send('Customer with the given id not found');

    res.redirect('auth/loginCustomer');

}

module.exports = {
    getForgotPasswordView,
    forgotPassword
}