const express = require('express');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');
const { getUserCart, addToCart, deleteCartItem, userOrders } = require('../controllers/userController');

const router = express.Router();

router.get("*", requireAuth, checkUser);

router.get('/user/cart/:id', getUserCart);
router.post('/user/cart/:productId/:id', addToCart);
router.delete('/user/cart/delete/:id/:productId', deleteCartItem);
router.get('/user/order/history/:id', userOrders);

module.exports = { routes: router }