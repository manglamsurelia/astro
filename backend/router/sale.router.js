const express =require('express');
const router = express.Router();
const customer = require('../controllers/sale.controller');
const customerMiddleware = require('../middleware/Auth.middleware')

router.post('/create-customer',customerMiddleware, customer.createCustomer)
router.patch('/update-customer/:id',customerMiddleware, customer.updateCustomer)
router.delete('/delete-customer/:id',customerMiddleware, customer.deleteCustomer)
router.get('/showCustomers',customerMiddleware,customer.showCustomers);
router.get('/analytics',customerMiddleware,customer.analytics);
module.exports =router;