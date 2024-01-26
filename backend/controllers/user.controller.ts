import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RequestHandler, Response } from 'express';
import { executeQuery } from '../db/db_conn'
import { secretKey } from '../db/config'
import { MiddlewareRequest, Role } from '../includes/types'

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
        console.log(result)
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

export const updateUser: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { username, email, password } = req.body
        const userId = req.params.id
        console.log(userId)
        if (!userId) {
            res.status(400).json({ success: false, error: 'Invalid user ID' });
            return
        }

        const checkIfExist = 'SELECT id FROM users WHERE id = ?';
        const result = await executeQuery(checkIfExist, [userId]);

        if (result.length > 0) {
            console.log(password)
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password.trim(), salt);
            const updatedSql = 'UPDATE users SET username = ?, email= ?, password= ? WHERE id = ?';
            await executeQuery(updatedSql, [username, email, hashPass, userId])
            res.json({ success: true, message: 'User updated' });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
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




