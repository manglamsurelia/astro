const express =require('express');
const router  =express.Router();
const client = require('../controllers/clientTracking.controller');
const authenticationMiddleware = require('../middleware/Auth.middleware')

router.post('/create-client',authenticationMiddleware, client.createClient)
router.patch('/update-client/:id',authenticationMiddleware, client.updateClient)
router.delete('/delete-client/:id',authenticationMiddleware, client.deleteClient)
router.get('/showClients',authenticationMiddleware,client.showClients);
module.exports =router;