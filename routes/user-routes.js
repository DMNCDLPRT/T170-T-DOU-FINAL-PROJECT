const express = require('express');
const { checkUser, requireAuth } = require('../middleware/authMiddleware');
const { getUserCart, addToCart, deleteCartItem, userOrders } = require('../controllers/userController');

const router = express.Router();

router.get("*", checkUser);

router.get('/user/cart/:id', requireAuth, getUserCart);
router.post('/user/cart/:productId/:id', requireAuth, addToCart);
router.delete('/user/cart/delete/:id/:productId', requireAuth, deleteCartItem);
router.get('/user/order/history/:id', requireAuth, userOrders);

module.exports = { routes: router }