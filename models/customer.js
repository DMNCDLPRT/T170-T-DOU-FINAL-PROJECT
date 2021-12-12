const mongoose = require('mongoose');
const { product } = require('./product');
const { orders } = require('./order');
const Joi = require('joi');
const findOrCreate = require('mongoose-findorcreate');
const { schema } = require('joi/lib/types/object');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pssword: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    cart: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    orders:[{
        type: mongoose.ObjectId,
        ref: "orders"
    }],
    role: {
        type: String,
        default: "Customer"

    }
});

const validateCustomer = (customer) => {
    const schema = {
        username:           Joi.string().max(50).required(),
        email:              Joi.string().email().required(),
        phone:              Joi.string().max(11).max(11).required(),
        pssword:            Joi.string().min(8).max(50).required(),
        role:               Joi.string().required()
    }

    return Joi.validate(customer, schema);
}

const validateLogin = (customer) => {
    const schema = {
        preferred_method:   Joi.string().required().valid('Email', 'Phone', 'Name'),
        username:           Joi.string().when('preferred_method', { is: 'Name', then: Joi.required() }),
        email:              Joi.string().email().when('preferred_method', { is: 'Email', then: Joi.required() }),
        phone:              Joi.string().max(11).max(11).when('preferred_method', { is: 'Phone', then: Joi.required() }),
        pssword:            Joi.string().min(8).max(50).required(),
    }

    return Joi.login = (customer, schema);
}

customerSchema.plugin(findOrCreate);
const Customer = mongoose.model('Customer', customerSchema);

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
module.exports.login = validateLogin;