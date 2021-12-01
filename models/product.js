const mongoose = require("mongoose");
const { Reviews } = require("./reviews");
const Joi = require('joi');

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

const Product = new mongoose.model('products', productSchema);

const validateProduct = (product) => {
    const schema = {
        name:               Joi.string().required().max(50).min(4),
        preferred_method:   Joi.string().required().valid('Img', 'Image'),
        img:                Joi.string().when('preferred_method', { is: 'Img', then: Joi.required() }),
        image:              Joi.string().when('preferred_method', { is: 'Image', then: Joi.required() }),
        price:              Joi.string().required(),
        desc:               Joi.string().required(),
        type:               Joi.string().required(),
    }
    return Joi.validate(product, schema);
}

module.exports = Product;
module.exports.validate = validateProduct;