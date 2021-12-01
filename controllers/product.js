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

const product =  async (req, res) => {
    
    try {
        
        const data = req.body;

        if(data.price <= Number(100000)){
            let file; 
            try {
                console.log(req.file.path);
                file = path.join(__dirname, "/uploads/product/" + req.file.filename);
                data.image = { data: fs.readFileSync(file), contentType: "image/png" };
            } catch {
                data.image = null;
            }
            await Product.create(data);
        
            /* req.flash("status", "Item Added Sucessfully!!"); */
            console.log("Item Added Sucessfully")
            res.redirect("/");
        } else{
            /* req.flash('error',"You cannot set price more than 100000"); */
            console.log("error price more than 100000");
            console.log(data.price);
            res.redirect("/admin/products/new");
        }
    } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
      }
};

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
            /* req.flash("status", "Item details were editted and sucessfully"); */
            console.log("Item details were eddited and sucessfully");
            res.redirect("/admin/adminProducts");
        } else{
            /* req.flash('error',"You cannot set price more than 100000"); */
            console.log("You cannot set price more than 100000");
            res.redirect(`/admin/products/${id}/edit`)
        }
    } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
    }
};

/* const editProduct = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    if (req.file != undefined) {
        try {
            const file = path.join(__dirname + "/uploads/product/" + req.file.filename);
            data.image = { data: fs.readFileSync(path.join(file)), contentType: "image/png", };

            let product = await Product.findByIdAndUpdate(id, {
                name: data.name,
                img: data.img,
                image: data.image,
                price: data.price,
                desc: data.desc,
                type: data.type,
            }, { new: true });
            if(!product) return res.status(404).send('Product with the given id not found');
        } catch{

        }
    }
  
    req.flash("status", "Item details were editted and sucessfully");
    console.log("Database updated");
    res.redirect("/admin/adminProducts");
}; */

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
/*     try { */
        // console.log("\n\n\n\n\n\nThis is the reviews request \n\n\n\n\n")
        // console.log(req)
        const { user_id } = req.params;
        const data = req.body;
        console.log(data);

        let username = await Customer.findById(user_id);
        data.user = username.username;
        console.log(data.user);

        data.date = Date.now();

        const { id } = req.params;
        //Finding the Product Object
        const productObj = await Product.findById(id);
        //Creating an object of the Reviews Model having the data value as productId, to which changes will be made
        const reviewObj = new Reviews(data);
        //Automaticaly Pushes Only the Object id inside the Array [as mentioned in the schema]
        productObj.reviews.push(reviewObj);
        //Product is updated and then saved in Data base;
        await productObj.save();
        //reviewObj is a object that is then saved in data base;
        await reviewObj.save();

        console.log("Comment Saved in Database");
        /* req.flash("success","Your review was added successfully !") */
        res.redirect(`/view/products/${id}`);
/*       } catch (e) {
        res.status(404).render("error/error", { status: "404" });
      } */
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
            res.render("reviews/edit", { data, id, rev_id });
        } catch (e) {
            req.flash("error", "Sorry We encountered a problem");
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
            req.flash("success", "Your Review was Updated successfully");
            res.redirect(`/products/${id}`);
        } catch (e) {
            req.flash("error", "There was a problem updating your comment");
            res.redirect(`/products/${id}`);
        }
    } catch (e) {
        res.status(404).render("error/error", { status: "404" });
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