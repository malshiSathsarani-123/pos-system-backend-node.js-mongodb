const express = require('express');
const router = express.Router();
const customerController = require('./controller/customer_controller');
const userController = require('./controller/user_controller');
const orderController = require('./controller/order.controller')

// User routes
router.get('/users', userController.getUsers);
router.post('/createUser', userController.saveUsers);
router.put('/updateUser', userController.updateUsers);
router.delete('/deleteUser', userController.deleteUsers);
// Customer routes
router.get('/customers', customerController.getCustomer);
router.post('/createCustomer', customerController.saveCustomer);
router.put('/updateCustomer', customerController.updateCustomer);
router.delete('/deleteCustomer', customerController.deleteCustomer);
// Order routes
router.post('/createOrder', orderController.saveOrder);
router.get('/orders', orderController.getOrder);
router.delete('/deleteOrder', orderController.deleteOrder);

module.exports = router;
