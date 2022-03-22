const express = require("express")
const Product = require("../models/product");
const { Orders } = require("../models/order");
const { Customer } = require("../models/customer");


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
        const orders = await Orders.find({}).populate('user').populate({ 
            path:'orderList.item',
            model: Product        
        });
        console.log(orders);
        
        res.render('admin/orderHistory',{ 
            orders,
            title: "Admin Order History" 
        })
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