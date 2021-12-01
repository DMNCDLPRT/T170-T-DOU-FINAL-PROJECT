const { Customer, validate } = require('../models/customer');
const bcrypt = require('bcryptjs');


const getAllCustomers = async (req, res, next) => {
    const list = await Customer.find().exec();
    res.render('admin/customerlist', {
        customers: list,
        title: "Admin | Customers list"
    });
}

const getsignupCustomerView =  (req, res, next) => {
    res.render('auth/signupCustomer', {title: "T'Dou | Sign Up"});
}

const getAddCustomerView = (req, res, next) => {
    res.render('admin/addCustomer', {title: "Admin | Add Customer"});
}

const addCustomer = async (req, res, next) => {
    const { error } = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    
    const data = req.body;
    const { pssword: plainPassword } = req.body;
    const password = await bcrypt.hash(plainPassword, 10);

    let customer = await new Customer({
        username: data.username,
        email: data.email,
        phone: data.phone,
        pssword: password,
        role: data.role
    });
    customer = await customer.save();
    res.redirect('/');
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
    if (error) return res.status(422).send(error.details[0].message);

    const id = req.params.id;
    const data = req.body;

    const { pssword: plainPassword } = req.body;
    const password = await bcrypt.hash(plainPassword, 10);

    let customer = await Customer.findByIdAndUpdate(id, {
        username: data.username,
        email: data.email,
        phone: data.phone,
        pssword: password,
        role: data.role
    }, {new: true});
    if(!customer) return res.status(404).send('Customer with the given id not found');

    res.redirect('/');
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
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer,
    logoutCustomer
}