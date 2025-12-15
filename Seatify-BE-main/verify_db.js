
import db from './config/db.js';

async function verifyConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Successfully connected to the database.');

        const [rows] = await connection.execute('SELECT 1');
        console.log('Query test successful:', rows);

        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

verifyConnection();
