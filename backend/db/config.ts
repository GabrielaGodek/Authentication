import * as mysql from 'mysql2/promise';

export const connectionOptions: mysql.PoolOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DB || 'auth',
    connectionLimit: 10,
};