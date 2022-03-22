const express = require('express');
const { checkUser, requireAuth, isAdmin } = require("../middleware/authMiddleware");
const { viewAdminProducts, viewAdminAllOrders } = require("../controllers/adminController");
const { viewEditProduct, upload, editProduct, deleteProduct} = require("../controllers/product")

const router = express.Router();

router.get("*", requireAuth);

router.get("/admin/adminProducts", requireAuth, viewAdminProducts, isAdmin);
router.get("/admin/products/:id/edit", requireAuth,  viewEditProduct, isAdmin);  // get Edit product view
router.patch("/admin/patchProducts/:id", requireAuth,  upload.single("image"), editProduct, isAdmin);      // edit product
router.get("/admin/users/orders/all/history", requireAuth, viewAdminAllOrders, isAdmin);              // view all order history 
router.delete("/admin/products/delete/:id", requireAuth, deleteProduct, isAdmin);        // delete product

module.exports = { routes: router };