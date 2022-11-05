const express =require('express');
const router = express.Router();
const user = require('../controllers/userDatatable.controller');
const userDataTableMiddleware = require('../middleware/Auth.middleware')

router.post('/create-UserDataTable',userDataTableMiddleware, user.createUserTable)
router.patch('/update-UserDataTable/:id',userDataTableMiddleware, user.updateUserTable)
router.delete('/delete-UserDataTable/:id',userDataTableMiddleware, user.deleteUserTable)
router.get('/showUserDataTable',userDataTableMiddleware,user.showUserTable);
module.exports =router;