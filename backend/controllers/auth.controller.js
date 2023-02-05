const bcrypt = require("bcrypt");
const authService = require('../services/auth.service')

// controller for signup
exports.signup = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let user = req.body;
        let parentId = req.jwt.id
        // now we set user password to hashed password 
        user.password = await bcrypt.hash(user.password, salt);
    
        const data = await authService.signupService(user, parentId);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for login
exports.login = async (req, res) => {
    try {
        const body = req.body;
        const data = await authService.loginService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for change-password
exports.changePassword = async (req, res) => {
    try {
        const body = req.body;
        const { email } = req.jwt;
        body.email = email;

        const data = await authService.changePasswordService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for all-user
exports.allUser = async (req, res) => {
    try {

        const data = await authService.allUserService(req.jwt);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

