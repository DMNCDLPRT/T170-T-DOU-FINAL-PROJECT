const express = require('express');
const { userOrder, userOrderVerify, userOrderPAymentFail, userPaymentErrorCode} = require("../controllers/orderController");
const {  requireAuth } = require("../middleware/authMiddleware")

const router = express.Router();

router.get('*', requireAuth);

router.post('/user/order', userOrder);
router.post('/user/order/verify/:id', userOrderVerify);
router.get('/user/payment/:payment_id/:error_code', userOrderPAymentFail);
router.post('/user/order/paymentfail', userPaymentErrorCode);

module.exports = { routes: router };