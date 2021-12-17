const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const { Customer } = require('../models/customer');
const { checkUser } = require('../middleware/authMiddleware');

const getUserCart = async (req, res) => {
    let { id } = req.params;
    const user = await Customer.findById(id).populate('cart.item');

    for(let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].item === null){
            user.cart.splice(i, 1)
            await user.save();
        } 
    }
    const data = user.cart;
    res.render("user/cart", { data, title: "Your Cart" });
}

const addToCart = async (req, res) => {
    
    const { id, productId } = req.params;

    const userData = await Customer.findById(id);
    const product = await Product.findById(productId);

    let flag = 0;
    let cartLimit = true;

    for (user of userData.cart) {
        if (productId == user.item) {
            user.quantity+=Number(req.body.quantity);
            if (user.quantity > 5) {
            }
            flag = 1;
            break;
        }
    }

    if (flag != 1) {
        obj = {
            item: product,
            quantity: Number(req.body.quantity)
        }
        userData.cart.push(obj);
        await userData.save();
        res.redirect('/user/cart/' + id);
    } else {
        if (cartLimit === false) {
            /* req.flash('error', "You cannot add more than 5 items.. "); */
            console.log("You cannot add more than 5 items.. ");
            res.redirect('/products/' + productId);
        } else {
            await userData.save();
            res.redirect('/user/cart/' + id);
        }
    }
}

const deleteCartItem = async (req, res) => {

    try{
        const{ id, productId } = req.params;
        const data = await Customer.findById(id);
  
        data.cart.splice(data.cart.findIndex((e) => e.item == productId), 1);
        
        
        await data.save();
        /* req.flash("success","Item Deleted From Your Cart"); */
        console.log("success","Item Deleted From Your Cart")
        res.redirect("/user/cart/" + id);
    } catch(e){
        /* req.flash("error","There was a problem deleting from the cart"); */
        console.log("There was a problem deleting from the cart")
        res.redirect("/user/cart/" + id);
    }
}

const userOrders = async (req, res) => {
    try{
        const id = req.params.id
        const data = await  Customer.findById(id).populate("orders");
        await data.populate({ path:'orders.orderList.item', model:Product }).execPopulate();
        const orders = data.orders;
        res.render("user/order", { orders, title: "Order History" });
        // res.send(orders)
    }catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})
    }
}

module.exports = {
    getUserCart,
    addToCart,
    deleteCartItem,
    userOrders
}