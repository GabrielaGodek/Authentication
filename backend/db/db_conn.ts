import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config()

const connectionOptions: mysql.PoolOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DB || 'auth',
};

export async function executeQuery(query: string, values?: any[]): Promise<any> {
    const pool = mysql.createPool(connectionOptions);

    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');

        const [rows, fields] = await connection.execute(query, values);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        pool.end();
    }
}
