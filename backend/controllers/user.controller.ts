import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { executeQuery } from '../db/db_conn'

export const getUsers: RequestHandler = async (req, res) => {
    try {
        console.log('get')
        const sql = `SELECT * FROM users`
        const queryResult = await executeQuery(sql);

        res.json({ success: true, data: queryResult })
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
    }
}
export const registerUser: RequestHandler = async (req, res) => {
    try {
        const { username, password, email, created_at } = req.body;
        const hashPass = await bcrypt.hash(password, 1);
        const sql = `INSERT INTO users(username, password, email, created_at) VALUES (?, ?, ?, ?)`;
        const result = await executeQuery(sql, [username, hashPass, email, created_at]);

        if (!result) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }
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
        console.log(result)

        const isMatch = await bcrypt.compare(password, result[0].password);

        if (isMatch) {
            const token = jwt.sign({ userId: result[0].id }, 'my_secret_key', { expiresIn: '1h' });
            res.json({ success: true, message: 'Login Successful', token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};




