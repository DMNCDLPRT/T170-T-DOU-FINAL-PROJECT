const object = require('joi/lib/types/object');
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "Customer",
    },
    orderid: {
        type: String,
        required: true,
        unique: true,
    },
    paymentid: {
        type: String,
        required: true,
        unique: true,
    },
    orderList: [
        {
            type: Object,
            required: true
        },
    ],
    purchaseDate: {
        type: Date,
        default: Date.now(),
    },
    finalPrice: {
        type: Number,
        required: true,
    },
});


const Orders = mongoose.model("orders", orderSchema);

module.exports.Orders = Orders;
