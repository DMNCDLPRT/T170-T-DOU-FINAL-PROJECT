const express = require('express');
const { productData, viewAddNewProduct, upload, product, viewViewProduct, productReviews, getViewProduct,
   patchReviwProduct, deleteReviewProduct } = require('../controllers/product');
const { requireAuth, checkUser, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("*", checkUser);

router.get('/', productData);                                          // get Home
router.get('/admin/products/new', isAdmin, viewAddNewProduct);         // get view add new product
router.post('/admin/products/new', requireAuth, isAdmin,  upload.single("image"), product);  // add mew product

router.get("/view/products/:id", viewViewProduct);                     // get Selected product view

router.get("/products/:id/reviews", getViewProduct);                   // getViewProduct = /products/:id/:rev_id
router.post("/products/:id/user/:user_id/review", requireAuth, productReviews);     // post review product
router.get("/products/:id/reviews/:rev_id", requireAuth, getViewProduct);
router.patch("/products/:id/reviews/:rev_id", requireAuth,  patchReviwProduct);
router.delete("/products/:id/reviews/:rev_id",requireAuth, deleteReviewProduct);

module.exports = { routes: router }