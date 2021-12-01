const express = require("express")
const Product = require("../models/product");
const Order = require("../models/order");


const viewAdminProducts = async (req, res) => {
    try{
        const data = await Product.find({});
        res.render("admin/adminProducts",{ data, title: "T'Dou | Admin Products"});
    } catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})
    }
};

const viewAdminAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({}).populate('user').populate({ 
            path:'orderList.item',
            model:Product        
        });
        
        res.render('/admin/users/orders/all/history/',{ 
            orders,
            title: "Admin Order History" 
        })
        // res.send(orders);
    }
    catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})
    
    }
}


module.exports = {
    viewAdminProducts,
    viewAdminAllOrders
};