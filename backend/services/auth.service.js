const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('../db');
const config = require('../config/config');

// service for signup
exports.signupService = async (data, parentId) => {
    try {
        var findEmail = `SELECT * FROM registration WHERE email="${data.email}"`;
        const findEmailresult = await sql.query(findEmail);
        if (findEmailresult.length > 0) {
            return {
                sucess: false,
                message: 'email-id already in use, please try with some other id'
            }
        }
        else {
            var query = `INSERT INTO registration (email,userName,role,parentId,password) VALUES ("${data.email}","${data.userName}","${data.role}",${parentId},"${data.password}")`;
            const result = await sql.query(query)
            if (result) {
                return {
                    sucess: true,
                    message: 'successfully inserted'
                }
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for login
exports.loginService = async (data) => {
    try {
        var query = `SELECT * FROM registration WHERE email="${data.email}"`;
        let result = await sql.query(query);
        if (result.length === 0) {
            return {
                sucess: false,
                message: 'Email not found'
            }
        }
        else {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(data.password, result[0]['password']);

            if (validPassword) {

                const accessToken = jwt.sign({ userName: result[0]['userName'], email: result[0]['email'], role: result[0]['role'], id: result[0]['id'] }, config.jwt.SECRET, {
                    expiresIn: 86400 // 24 hours
                });

                return {
                    sucess: true,
                    message: 'successfully login',
                    token: accessToken,
                    role: result[0]['role'],
                    email: result[0]['email']
                }
            } else {
                return {
                    sucess: false,
                    message: 'incorrect password'
                }
            }

        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for change-password
exports.changePasswordService = async (data) => {
    try {
        var findQuery = `SELECT * FROM registration WHERE email="${data.email}"`;
        let findresult = await sql.query(findQuery);
        if (findresult.length == 0) {
            return {
                sucess: false,
                message: 'User has not registered with us'
            }
        } else {
            const validPassword = await bcrypt.compare(data['old-password'], findresult[0]['password']);
            if (validPassword) {
                const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password 
                const newPassword = await bcrypt.hash(data['new-password'], salt);

                var query = `UPDATE registration
                SET password = "${newPassword}" 
                WHERE email = "${data.email}"`;

                let result = await sql.query(query);
                if (result) {
                    return {
                        sucess: true,
                        message: 'password updated'
                    }
                }
            }
            else {
                return {
                    sucess: false,
                    message: 'old-password is incorrect'
                }
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for showing all-user
exports.allUserService = async (data) => {
    try {
        var query;
        if (data.role == 'admin') {
            query = `SELECT * FROM registration`
        } else {
            query = `SELECT * FROM registration WHERE parentId="${data.id}" or id="${data.id}"`;
        }
        let result = await sql.query(query);

        if (result) {
            return {
                sucess: true,
                message: 'successfully retrieve',
                data: result
            }
        }

    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};