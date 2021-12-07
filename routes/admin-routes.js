const express = require('express');
const { checkUser, requireAuth, isAdmin } = require("../middleware/authMiddleware");
const { viewAdminProducts, viewAdminAllOrders } = require("../controllers/adminController");
const { viewEditProduct, upload, editProduct, deleteProduct } = require("../controllers/product")

const router = express.Router();

router.get("*", isAdmin, requireAuth);
router.get("/admin/adminProducts", viewAdminProducts);
router.get("/admin/products/:id/edit", requireAuth, viewEditProduct);  // get Edit product view
router.patch("/admin/patchProducts/:id", requireAuth, upload.single("image"), editProduct);      // edit product
router.get("/admin/users/orders/all/history", viewAdminAllOrders);              // view all order history 
router.delete("/admin/products/delete/:id", requireAuth, deleteProduct);        // delete product


module.exports = { routes: router };