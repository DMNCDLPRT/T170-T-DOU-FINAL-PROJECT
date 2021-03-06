const express = require('express');
const {getAllCustomers, getAddCustomerView, getsignupCustomerView, addCustomer, getUserProfileView,
        getUpdateCustomerView, updateCustomer, getDeleteCustomerView, deleteCustomer, logoutCustomer} = require('../controllers/customerController');
const {getloginCustomerView, loginCustomer } = require('../controllers/loginControler');
const { requireAuth, checkUser, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('*', checkUser);

router.get('/admin', requireAuth, isAdmin, getAllCustomers);

router.get('/loginCustomer', getloginCustomerView);
router.post('/loginCustomer', loginCustomer);

router.get('/signupCustomer', getsignupCustomerView);
router.post('/signupCustomer', addCustomer);

router.get('/user/profile/:id',requireAuth, getUserProfileView);
router.post('/user/profile/:id',requireAuth, updateCustomer);

router.get('/addCustomer', requireAuth, isAdmin, getAddCustomerView);
router.post('/addCustomer', requireAuth, isAdmin, addCustomer);

router.get('/admin/updateCustomer/:id', requireAuth, isAdmin, getUpdateCustomerView);
router.post('/admin/updateCustomer/:id', requireAuth, isAdmin, updateCustomer);

router.get('/admin/deleteCustomer/:id', requireAuth, isAdmin, getDeleteCustomerView);
router.post('/admin/deleteCustomer/:id', requireAuth, isAdmin, deleteCustomer);

router.get('/logoutCustomer', logoutCustomer);

module.exports = {
    routes: router
}