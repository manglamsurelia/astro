const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authenticationMiddleware = require('../middleware/Auth.middleware');

// route for signup
router.post("/registration", authenticationMiddleware, auth.signup);

// route for login
router.post("/login", auth.login);

// route for change-password
router.patch("/change-password", authenticationMiddleware, auth.changePassword);

// route to show all-user
router.get("/all-user", authenticationMiddleware, auth.allUser);

module.exports = router;