const { Customer, validate } = require('../models/customer');
const bcrypt = require('bcryptjs');

const getAllCustomers = async (req, res) => {
    const list = await Customer.find().exec();
    res.render('admin/customerlist', {
        customers: list,
        title: "Admin | Customers list"
    });
}

const getsignupCustomerView =  (req, res) => {
    res.render('auth/signupCustomer', {title: "T'Dou | Sign Up"});
}

const getAddCustomerView = (req, res) => {
    res.render('admin/addCustomer', {title: "Admin | Add Customer"});
}

const getUserProfileView = async (req, res) => {
    try {
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('user/profile', {
            customer: onecustomer,
            title: "T'Dou | " + onecustomer.username
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addCustomer = async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        console.log(error);
        return res.status(422).send(error.details[0].message);
    }

    const data = req.body;
    console.log(data);
    if(await Customer.findOne({ username: data.username })){
        return res.status(422).json({ error: 'error-username', message: 'Username already exist!' });
    }
    if(await Customer.findOne({ email: data.email })){
        return res.status(422).json({ error: 'error-email', message: 'Email already in use!' });
    }
    if(await Customer.findOne({ phone: data.phone })){
        return res.status(422).json({ error: 'error-contact', message: 'Contact already in use!' })
    }
    if(data.pssword !== data.confirm){
        return res.status(422).json({ error: 'error-password', message: 'Passwords do not match!' })
    }
    try {
        const { pssword: plainPassword } = req.body;
        const password = await bcrypt.hash(plainPassword, 10);
        let user = await new Customer({
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            pssword: password,
            role: data.role
        });
        user = await user.save();
        console.log("Account created successfully")
        return res.status(200).json({ user: user._id });

    } catch (e) {
        console.log("errorerreere");
        res.status(400).json({ error: 'Required fields must be filled in' });
    }
}

const getUpdateCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('admin/updateCustomer', {
            customer: onecustomer,
            title: "Admin | Update Customer"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCustomer = async(req, res, next) => {
    const { error } = validate(req.body);
    if(error){
        const messageError = error.details[0].message;
        return res.status(422).json({ error: messageError});
    }

    const id = req.params.id;
    const data = req.body;
    try {
        const { pssword: plainPassword } = req.body;
        const password = await bcrypt.hash(plainPassword, 10);

        let user = await Customer.findByIdAndUpdate(id, {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            pssword: password,
            role: data.role
        }, {new: true});
        if(!user) return res.status(404).send('Customer with the given id not found');

        console.log("Account created successfully")
        return res.status(200).json({ user: user.fullname });

    } catch (error) {
        console.log("errorerreere")
        res.status(400).json({ error: 'something went wrong' });
    }
}

const getDeleteCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('admin/deleteCustomer', {
            customer: onecustomer,
            title: "Admin | Delete Customer"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByIdAndRemove(id);
        if(!customer) return res.status(404).send('Customer with the given id not found');
        res.redirect('/admin');      
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const logoutCustomer = (req, res) => {
    res.cookie('jwt', '',  {maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    getAllCustomers,
    getAddCustomerView,
    getsignupCustomerView,
    getUserProfileView,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer,
    logoutCustomer
}