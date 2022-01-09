const express = require('express');
const {getAllCustomers, getAddCustomerView, getsignupCustomerView, addCustomer, getUserProfileView,
        getUpdateCustomerView, updateCustomer, getDeleteCustomerView, deleteCustomer, logoutCustomer} = require('../controllers/customerController');
const {getloginCustomerView, loginCustomer } = require('../controllers/loginControler');
const { getForgotPasswordView, forgotPassword, getNewPasswordView  } = require('../controllers/forgotPass')    
const { requireAuth, checkUser, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('*', checkUser);

router.get('/admin', requireAuth, isAdmin, getAllCustomers);

router.get('/loginCustomer', getloginCustomerView);
router.post('/loginCustomer', loginCustomer);

router.get('/signupCustomer', getsignupCustomerView);
router.post('/signupCustomer', addCustomer);

router.get('/user/profile/:id', getUserProfileView);
router.post('/user/profile/:id', updateCustomer);

router.get('/addCustomer', requireAuth, isAdmin, getAddCustomerView);
router.post('/addCustomer', requireAuth, isAdmin, addCustomer);

router.get('/admin/updateCustomer/:id', requireAuth, isAdmin, getUpdateCustomerView);
router.post('/admin/updateCustomer/:id', requireAuth, isAdmin, updateCustomer);

router.get('/admin/deleteCustomer/:id', requireAuth, isAdmin, getDeleteCustomerView);
router.post('/admin/deleteCustomer/:id', requireAuth, isAdmin, deleteCustomer);

router.get('/forgotPassword/', getForgotPasswordView);
router.post('/forgotPassword', forgotPassword);

router.get('/forgotPassword/reset', getNewPasswordView);
router.post('/forgotPassword/reset',);

router.get('/logoutCustomer', logoutCustomer);

module.exports = {
    routes: router
}