const express = require('express');
const { checkUser, requireAuth, isAdmin } = require("../middleware/authMiddleware");
const { viewAdminProducts } = require("../controllers/adminController");
const { viewEditProduct, upload, editProduct, deleteProduct } = require("../controllers/product")

const router = express.Router();

router.get("*", checkUser, requireAuth);
router.get("/admin/adminProducts", isAdmin, viewAdminProducts);
router.get("/admin/products/:id/edit", requireAuth, isAdmin, viewEditProduct);    // get Edit product view
router.patch("/admin/patchProducts/:id", requireAuth, isAdmin, upload.single("image"), editProduct);      // edit product

router.delete("/admin/products/delete/:id", requireAuth, deleteProduct);          // delete product

module.exports = { routes: router };