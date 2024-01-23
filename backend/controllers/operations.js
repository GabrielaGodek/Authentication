import util from 'util'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { conn } from '../db/db_conn.js'

const queryAsync = util.promisify(conn.query).bind(conn)

const getUsers = async (req, res) => {
    try {
        const sql = `SELECT * FROM users`
        const result = await queryAsync(sql)

        res.json(result);

    } catch (err) {
        console.error(err)
    }
}
const registerUser = async (req, res) => {
    try {
        const { username, password, email, created_at } = req.body
        const hashPass = await bcrypt.hash(password, 1)
        const sql = `INSERT INTO users(username, password, email, created_at) VALUES (?, ?, ?, ?)`
        const result = await queryAsync(sql, [username, hashPass, email, created_at])

    } catch (err) {
        console.error(err.message)
    }

}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.warn(req.body)
        if (!email && !password) {
            return res.status(400).json({ message: 'Email and Password are Required' })
        }
        const sql = `SELECT * FROM users WHERE email = ?`
        const result = await queryAsync(sql, email)
        if (result.length === 0) {
            return res.status(400).json({ message: 'No user in database' })
        }

        let isMatch = await bcrypt.compare(password, result[0].password)

        if (isMatch) {
            const token = jwt.sign({ userId: result[0].id }, 'my_secret_key', { expiresIn: '1h' })
            res.json({ message: 'Login Successful', token })
            // return true
        } else {
            res.json({ message: 'Invalid password' })
        }
    } catch (err) {
        console.error(err.message)
    }
}
export { getUsers, registerUser, loginUser }