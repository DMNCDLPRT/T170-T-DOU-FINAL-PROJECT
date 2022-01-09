const express = require('express');
const { checkUser, requireAuth, isAdmin } = require("../middleware/authMiddleware");
const { viewAdminProducts, viewAdminAllOrders } = require("../controllers/adminController");
const { viewEditProduct, upload, editProduct, deleteProduct} = require("../controllers/product")

const router = express.Router();

router.get("*", requireAuth);

router.get("/admin/adminProducts", viewAdminProducts, isAdmin);
router.get("/admin/products/:id/edit", viewEditProduct, isAdmin);  // get Edit product view
router.patch("/admin/patchProducts/:id", upload.single("image"), editProduct, isAdmin);      // edit product
router.get("/admin/users/orders/all/history", viewAdminAllOrders, isAdmin);              // view all order history 
router.delete("/admin/products/delete/:id", deleteProduct, isAdmin);        // delete product

module.exports = { routes: router };