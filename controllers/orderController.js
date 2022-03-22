const { Customer }= require("../models/customer");
const Razorpay = require("razorpay");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");
const { Orders } = require("../models/order");
require('dotenv').config();

const instance = new Razorpay({
    key_id: process.env.RZP_key_id,
    key_secret: process.env.RZP_key_secret
});

const userOrder = (req, res) => {
    try{
        let reciept = "ODRCPT_ID_" + uuid().slice(-12, -1);
        const data = req.body;
        data.receipt = reciept;

        console.log(data);

        instance.orders.create(data)
        .then((order) => {
            order.rzp_key = process.env.RZP_key_id 
            res.send(order)
        })
        .catch((err) => {
            res.send({"failure": "This payment cannot be done, please try again."});
        })

    } catch(e){
          console.log(e);
          res.status(404).render('error/error',{"status":"404"});
    }
}

const userOrderVerify = async (req, res) => {
    try{
        let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RZP_key_secret)
            .update(body.toString())
            .digest("hex");

        var response = { status: "failure" };
        if (expectedSignature === req.body.razorpay_signature) {
            try {
                const id = req.params.id;
                const userObj = await Customer.findById(id);
                let amount = req.body.order.amount / 100;
                const data = {
                    user: req.user,
                    orderid: req.body.razorpay_order_id,
                    paymentid: req.body.razorpay_payment_id,
                    orderList: userObj.cart,
                    purchaseDate: Date.now(),
                    finalPrice: amount,
                };

                console.log(data.user);
                const orderObj = new Orders(data);
                userObj.orders.push(orderObj);
                await orderObj.save();
                userObj.cart.splice(0,userObj.orders.length);
                await userObj.save();
                console.log("Your Order was Placed successfully");
                response = { status: "success", orderId: req.body.razorpay_order_id };

            } catch (e) {
                console.log("There is a problem with orders");
                console.log(e);
            }
        }

        res.send(response);

    } catch(e) {
        console.log(e);
        res.status(404).render('error/error',{"status":"404"});
    }
}

const userPaymentErrorCode = (req, res) => {
    try{
        console.log('Order failure!');
    } catch(e) {
        console.log(e);
        res.status(404).render('error/error',{"status":"404"});
    }
}

const userOrderPAymentFail = (req, res) => {
    try{
        console.log('payment failed!');
        res.send({"redirect":`/user/payment/${req.body.error.payment_id}/${req.body.error.payment_id}`})
    } catch(e) {
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})
    }
}

module.exports = {
    userOrder,
    userOrderVerify,
    userOrderPAymentFail,
    userPaymentErrorCode
}