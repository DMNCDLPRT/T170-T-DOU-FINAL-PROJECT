const express = require('express');
const { productData, viewAddNewProduct, upload, product, viewViewProduct, productReviews, getViewProduct,
   patchReviwProduct, deleteReviewProduct } = require('../controllers/product');
const { requireAuth, checkUser, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("*", checkUser);

router.get('/', productData);                                                    // get Home
router.get('/admin/products/new', requireAuth, isAdmin, viewAddNewProduct);      // get view add new product
router.post('/admin/products/new', requireAuth, isAdmin,  upload.single("image"), product);  // add mew product
router.get("/view/products/:id", viewViewProduct);                               // get Selected product view
router.post("/products/:id/user/review/", requireAuth);                          // post user review
router.post("/products/:id/user/review/:user_id", requireAuth, productReviews);  // post review product
router.get("/products/:id/reviews", getViewProduct);                             // getViewProduct = /products/:id/:rev_id
router.get("/products/:id/reviews/:rev_id", requireAuth, getViewProduct);        // get view
router.patch("/products/:id/reviews/:rev_id", requireAuth,  patchReviwProduct);  // edit user comment
router.delete("/products/:id/reviews/:rev_id", requireAuth, deleteReviewProduct); // delete product reveiw

module.exports = { routes: router }