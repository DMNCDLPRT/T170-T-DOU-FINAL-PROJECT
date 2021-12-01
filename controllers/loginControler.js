
const{ Customer, login } = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

// error handler
/* const handleErrors = (err) => {
	console.log(err.message, err);
} */

const getloginCustomerView = (req, res, next) => {
    res.render('auth/loginCustomer', {title: "T'Dou | Login"});
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email, role) => {
	return jwt.sign({ id, email, role } , JWT_SECRET, {
		expiresIn: maxAge
	});
}

const loginCustomer = async (req, res, next) => {
	const { error } = login(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    const { userEmailPhone, pssword } = req.body;
	// const user = await Customer.findOne({ email }).lean();

	const user = await Customer.findOne({
    $or: [{
      "email": userEmailPhone
    }, {
      "phone": userEmailPhone
    }, {
      "username": userEmailPhone
    }]
  	});

	if (!user || !(await bcrypt.compare(pssword, user.pssword))) {
		return res.json({ status: 'error', error: 'Wrong email/password' });
		/* return handleErrors(error); */
	} 
	
	if (await bcrypt.compare(pssword, user.pssword)) {
		const token = createToken(user._id, user.email, user.role);
		
		res.cookie('jwt', token, {httpOnly: true}, "Stack", { expiresIn: "10h"});
		return res.redirect('/');
		/* return res.json({ status: 'ok', data: token }); */
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