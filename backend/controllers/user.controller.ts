import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RequestHandler, Response } from 'express';
import { executeQuery } from '../db/db_conn'
import { secretKey } from '../db/config'
// import {  } from '../includes/types'
import { isValid } from '../includes/validation'
import { Errors, ValidationResponse, MiddlewareRequest, Role, InputType } from '../includes/types'

import csrf from 'csurf'

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const sql = `SELECT * FROM users`
        const queryResult = await executeQuery(sql);

        res.json({ success: true, data: queryResult })
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
    }
}

export const registerUser: RequestHandler = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const usernameValidation = isValid(username, InputType.Username)
        const passwordValidation = isValid(password, InputType.Password)
        const emailValidation = isValid(email, InputType.Email)
        if (!username || (typeof username !== 'string' && username.trim() === '') || !usernameValidation.isValid) {
            return res.status(400).json({ success: false, error: Errors.INVALID_USERNAME });
        }

        if (!password || (typeof password !== 'string' && password.trim() === '') || !passwordValidation.isValid) {
            return res.status(400).json({ success: false, error: Errors.INVALID_PASSWORD });
        }

        if (!email || (typeof email !== 'string' && email.trim() === '') || !emailValidation.isValid) {
            return res.status(400).json({ success: false, error: Errors.INVALID_EMAIL });
        }
        let checkIfExistSql = `SELECT id FROM users WHERE email = ?`
        const checkIfExistResult = await executeQuery(checkIfExistSql, [email]);
        console.log(checkIfExistResult)
        if (checkIfExistResult.length > 0) {
            return res.status(400).json({ success: false, error: Errors.USER_EXIST });
        }



        const type: string = Role.User;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password.trim(), salt);

        const sql = `INSERT INTO users(username, password, email, type) VALUES (?, ?, ?, ?)`;
        const result = await executeQuery(sql, [username, hashPass, email, type]);

        if (!result || !result.insertId) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }
        const token = jwt.sign({ userId: result.insertId }, secretKey, { expiresIn: '24h' });
        res.json({ success: true, message: 'Register Successful', token });
        // res.json({ success: true, message: 'Register Successful', token, csrfToken: req.csrfToken() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const loginUser: RequestHandler = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are Required' });
        }

        const sql = `SELECT * FROM users WHERE email = ?`;
        const result = await executeQuery(sql, [email]);

        if (result.length === 0) {
            return res.status(400).json({ message: 'No user in the database' });
        }
        const isMatch = await bcrypt.compare(password.trim(), result[0].password.trim());
        if (isMatch) {
            const token = jwt.sign({ userId: result[0].id }, secretKey, { expiresIn: '24h' });
            res.json({ success: true, message: 'Login Successful', token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body
        const userId = req.params.id

        let usernameValidation: ValidationResponse
        let passwordValidation: ValidationResponse
        if (username !== undefined) {
            usernameValidation = isValid(username, InputType.Username);

            if (typeof username !== 'string' || username.trim() === '' || !usernameValidation.isValid) {
                return res.status(400).json({ success: false, error: Errors.INVALID_USERNAME });
            }
        }
        if (password !== undefined) {
            passwordValidation = isValid(password, InputType.Password);

            if (typeof password !== 'string' || password.trim() === '' || !passwordValidation.isValid) {
                return res.status(400).json({ success: false, error: Errors.INVALID_PASSWORD });
            }
        }
        if (!userId) {
            res.status(400).json({ success: false, error: 'Invalid user ID' });
            return
        }

        const checkIfExist = 'SELECT id FROM users WHERE id = ?';
        const result = await executeQuery(checkIfExist, [userId]);

        if (result.length > 0) {
            let updateFields = [];
            let values = [];

            if (username !== undefined) {
                updateFields.push('username = ?');
                values.push(username);
            }
            if (password !== undefined) {
                const salt = await bcrypt.genSalt(10);
                const hashPass = await bcrypt.hash(password.trim(), salt);
                updateFields.push('password = ?');
                values.push(hashPass);
            }
            if (updateFields.length > 0) {

                const updatedSql = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
                values.push(userId);

                await executeQuery(updatedSql, values);
                res.json({ success: true, message: 'User updated' });
            } else {
                res.status(404).json({ success: false, error: 'User not found' });
            }
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const deleteUser: RequestHandler = async (req, res): Promise<void> => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ success: false, error: 'Invalid user ID' });
            return
        }

        const checkIfExist = 'SELECT id FROM users WHERE id = ?';
        const result = await executeQuery(checkIfExist, [userId]);

        if (result.length > 0) {
            const deleteSql = 'DELETE FROM users WHERE id = ?';
            await executeQuery(deleteSql, [userId]);
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const getProfile = async (req: MiddlewareRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const sql = `SELECT * FROM users WHERE id = ?`;
        const result = await executeQuery(sql, [userId]);
        res.json({ success: true, data: result })
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}




