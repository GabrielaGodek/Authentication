import * as mysql from 'mysql2/promise';
import crypto from 'crypto'

export const connectionOptions: mysql.PoolOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DB || 'auth',
    connectionLimit: 10,
};

export const secretKey = crypto.randomBytes(32).toString('hex');