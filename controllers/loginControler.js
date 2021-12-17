
const{ Customer, login } = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getloginCustomerView = (req, res, next) => {
    res.render('auth/loginCustomer', {title: "T'Dou | Login"});
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email, role) => {
	return jwt.sign({ id, email, role } , process.env.JWT_SECRET,  {
		expiresIn: maxAge
	});
}

const loginCustomer = async (req, res, next) => {
	const { error } = login(req.body);
    if(error) return res.json({ status: 'error', error: details[0].message});

    const { uid, password } = req.body;
	// const user = await Customer.findOne({ email }).lean();

	console.log(uid, password);
	const user = await Customer.findOne({
    $or: [{
      "email": uid
    }, {
      "phone": uid
    }, {
      "username": uid
    }]
  	});

	if (!user) {
		return res.json({ status: 'error-email', error: 'No user found'});
	}
	if(!(await bcrypt.compare(password, user.pssword))){
		return res.json({ status: 'error-password', error: 'Passwords Dont Match'});
	}
	if (await bcrypt.compare(password, user.pssword)) {
		const token = createToken(user._id, user.email, user.role);
		
		res.cookie('jwt', token, {httpOnly: true}, "Stack", { expiresIn: "10h"} );
		return res.status(200).json({ user: user._id });
	} 
	return res.json({ status: 'error', error: 'Invalid password/email' }); 
}

const frontpage = (req, res) => {
	res.render('/home/Home.ejs', { title: "T'Dou - Best Online Shopping Store" });
}

module.exports = {
    getloginCustomerView,
    loginCustomer,
	frontpage
}