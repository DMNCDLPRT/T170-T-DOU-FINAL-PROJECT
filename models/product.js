const mongoose = require("mongoose");
const { Reviews } = require("./reviews");
const Joi = require('joi');
const { schema } = require('joi/lib/types/object');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    image: {
        data :Buffer,
        contentType: String
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    desc: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.ObjectId,
            ref: "reviews" 
        },
    ]
        
})
const validateProduct = (products) => {
    const schema = {
        name:               Joi.string().required().min(2).max(30),
        preferred_method:   Joi.string().required().valid('Img', 'Image'),
        img:                Joi.string().when('preferred_method', { is: 'Img', then: Joi.required() }),
        image:              Joi.string().when('preferred_method', { is: 'Image', then: Joi.required() }),
        price:              Joi.string().required(),
        desc:               Joi.string().required(),
        type:               Joi.string().required(),
    }
    return Joi.validateProd = (products, schema);
}

const Product = new mongoose.model('products', productSchema);

module.exports = Product;
module.exports.validateProd = validateProduct;