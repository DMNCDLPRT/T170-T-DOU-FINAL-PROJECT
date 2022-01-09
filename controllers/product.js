const express = require("express");
const mongoose = require("mongoose");
const Product = require('../models/product');
const { Reviews } = require("../models/reviews");
const { Customer } = require("../models/customer");
const fs = require('fs-extra');
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,"/uploads/product"));
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    },
});
  
const upload = multer({ storage: storage });

const productData = async (req, res) => {
    try {
        const data = await Product.find({});
        res.render("home/Home", { 
            data,
            title: "T'Dou | best Online shopping store"
        });
    } catch (err) {
        console.log(err);
        /* res.status(404).render("error/error", { status: "404" }); */
    }
}

const viewAddNewProduct = (req, res) => {
    try {
        res.render("admin/addNewProduct", { title: "Admin | Add new product"});
    } catch (e) {
        console.log(e);
        /* res.status(404).render("error/error", { status: "404" }); */
    }
}
const product = async (req, res) => {

    try {
        const data = req.body;
        if(data.name == '' || data.desc == '' || data.price == ''){
            return res.json({ status: 'error', error: 'Required fields must be filled in'});
        }
        if(data.image == '' && data.img == '') {
            return res.json({ status: 'error', error: 'Required fields must be filled in'});
        }
        if(data.price >= Number(100000)) {
            console.log(data.price);
            return res.json({ status: 'error', error: 'You cannot set price more than 1000000'});
        }
        try {
            let file; 
            console.log(req.file.path);
            file = path.join(__dirname, "/uploads/product/" + req.file.filename);
            data.image = { data: fs.readFileSync(file), contentType: "image/png" };
        } catch {
            data.image = null;
        }
        await Product.create(data);
        console.log("Item Added Sucessfully " + data.image + data.img);
        res.redirect("/admin/adminProducts");

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: 'error', message: 'Somthing went wrong' });
    }
}

const viewViewProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id).populate("reviews");
        
        res.render("home/viewProduct", { data, title: data.name });
    } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
    }
}

const viewEditProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id);

        res.render("admin/editProduct", { data, title: "Edit Product" });
    } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
    }
}

// patch
const editProduct = async (req, res) => {

    try {
        const { id } = req.params.id;
        const data = req.body;

        if(data.price <= Number(100000)){
            if (req.file != undefined) {
                const file = path.join(__dirname + "/uploads/product/" + req.file.filename);
                data.image = { data: fs.readFileSync(path.join(file)), contentType: "image/png",};
            }
            await Product.findByIdAndUpdate(id, data);
  
            console.log("Database updated");
            req.flash("status", "Item details were editted and sucessfully");
            console.log("Item details were eddited and sucessfully");
            res.redirect("/admin/adminProducts");
        } else{
            req.flash('error',"You cannot set price more than 100000");
            console.log("You cannot set price more than 100000");
            res.redirect(`/admin/products/${id}/edit`)
        }
    } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleting = await Product.findById(id);
        await Product.findByIdAndDelete(id);
        console.log("The item " + deleting.name + " was deleted sucessfully");
        /* req.flash(
          "status",
          `The item "${deleting.name}" was deleted successfully..`
        ); */
        res.redirect("/admin/adminProducts");
    } catch (e) {
        res.status(404).render("error/error", { status: "404" });
    }
}

const productReviews = async (req, res) => {

    const { user_id } = req.params;
    const data = req.body;
    console.log(data); 

    try {

        if (data.rating == '0'){
            return res.status(400).json({ error: 'rating is required' }); 
        }
        if (data.comment == ''){
            return res.status(400).json({ error: 'comment is required' }); 
        }

        let username = await Customer.findById(user_id);
        data.user = username.username;
        console.log(data.user);
        data.date = Date.now();
        const { id } = req.params;
        
        const productObj = await Product.findById(id);  // Finding the Product Object
        const reviewObj = new Reviews(data);            // Creating an object of the Reviews Model having the data value as productId, to which changes will be made
        productObj.reviews.push(reviewObj);             // Automaticaly Pushes Only the Object id inside the Array [as mentioned in the schema]
        await productObj.save();                        // Product is updated and then saved in Data base;
        await reviewObj.save();                         // Product is updated and then saved in Data base;

        console.log("Comment Saved in Database");
        return res.status(200).json({ user: data.user });

    } catch {
        return res.status(404).json({ error: 'error', message: 'Something went wrong' }); 
    }
}

//Creating a middlewasre that authenticates review changes of operations
const reviewChange = async (req, res, next) => {
    const userReview = await Reviews.findById(req.params.rev_id);
  
    if (userReview.user == req.user.username) next();
    else {
        req.session.previousUrl = req.headers.referer;
        req.flash("login", "You are not authorized for this operation");
        res.redirect(req.session.previousUrl);
    }
};

// getViewProduct - render the view product
const getViewProduct = async (req, res) => {
    try {
        const { id, rev_id } = req.params;
        try {
            const data = await Reviews.findById(rev_id);
            res.render("user/edit", {title: "T'Dou | Edit Comment", data, id, rev_id });
        } catch (e) {
            /* req.flash("error", "Sorry We encountered a problem"); */
            res.redirect(`/products/${id}`);
        }
    } catch (e) {
        res.status(404).render("error/error", { status: "404" });
    }
}

const patchReviwProduct = async (req, res) => {
    try {
        const { id, rev_id } = req.params;
        const data = req.body;
        data.date = Date.now();
        try {
            await Reviews.findByIdAndUpdate(rev_id, data);
            return res.status(200).json({ rating: data.rating });
        } catch (e) {
            res.status(404).json({ error: 'error', message: 'There was a problem updating your comment' });
            res.redirect(`/view/products/${id}`);
        }
    } catch (e) {
        res.status(404).json({ error: 'error', message: 'Something went wrong' }); 
    }
}

const deleteReviewProduct = async (req, res) => {
    try {
        const { id, rev_id } = req.params;
        try {
            await Reviews.findByIdAndDelete(rev_id);
            /* req.flash("success", "Your Review was Deleted successfully"); */
            console.log("Your Review was sucessfully Deleted!");
            res.redirect(`/view/products/${id}`);
        } catch (e) {
            /* req.flash("error", "There was a problem updating your comment"); */
            console.log("There was a Problem updating your comment");
            res.redirect(`/view/products/${id}`);
        }
    } catch (e) {
        res.status(404).render("error/error", { status: "404" });
    }
}

module.exports = { 
    productData,
    viewAddNewProduct,
    upload,
    product,
    viewViewProduct,
    viewEditProduct,
    editProduct,
    deleteProduct,
    productReviews,
    reviewChange,
    getViewProduct,
    patchReviwProduct,
    deleteReviewProduct
};