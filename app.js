const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./controller/user_controller');
const customerController = require('./controller/customer_controller');
const orderController = require('./controller/order.controller')

app.use(cors());

app.use(
    express.urlencoded({
        extended : true,
    })
)

app.use(express.json())

// User routes
app.get('/users',(req,res) => {
    userController.getUsers((req,res,next) => {
        res.send();
    })
})

app.post('/createUser', (req,res) => {
    userController.saveUsers(req.body,(callback) => {
        res.send();
    });
});

app.put('/updateUser', (req,res) => {
    userController.updateUsers(req.body,(callback) => {
        res.send(callback);
    });
});

app.delete('/deleteUser', (req,res) => {
    userController.deleteUsers(req.body,(callback) => {
        res.send(callback);
    });
});

// Customer routes
app.get('/customers', customerController.getCustomer);

app.post('/createCustomer', (req, res) => {
    customerController.saveCustomer(req, res);
});

app.put('/updateCustomer', (req, res) => {
    customerController.updateCustomer(req, res);
});

app.delete('/deleteCustomer', (req, res) => {
    customerController.deleteCustomer(req, res);
});

// Order routes
app.post('/createOrder', (req, res) => {
    orderController.saveOrder(req, res);
});

app.get('/orders', orderController.getOrder);

app.delete('/deleteOrder', (req, res) => {
    orderController.deleteOrder(req, res);
});

module.exports = app;