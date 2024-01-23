import { createConnection } from 'mysql2';
import { DBconfig } from './config.js';

const conn = createConnection(DBconfig);

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Perform a sample query (select all users)
// connection.query('SELECT * FROM users', (err, results, fields) => {
//     if (err) {
//         console.error('Error querying the database:', err);
//         return;
//     }

//     // Print the results
//     console.log('Users:', results);

//     // Close the connection
//     connection.end((err) => {
//         if (err) {
//             console.error('Error closing the connection:', err);
//         }
//         console.log('Connection closed');
//     });
// });

export { conn }