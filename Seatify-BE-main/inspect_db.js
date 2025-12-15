
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function inspect() {
    const connection = await mysql.createConnection({
        host: process.env.NODE_MYSQL_HOST,
        user: process.env.NODE_MYSQL_USER,
        password: process.env.NODE_MYSQL_PASSWORD,
        database: process.env.NODE_MYSQL_DBNAME
    });

    console.log('Connected to database.');

    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Tables:', tables);

    // Check for a users table
    const tableNames = tables.map(t => Object.values(t)[0]);
    const userTable = tableNames.find(t => t.toLowerCase().includes('user') || t.toLowerCase().includes('login'));

    if (userTable) {
        console.log(`Found potential user table: ${userTable}`);
        const [columns] = await connection.execute(`DESCRIBE ${userTable}`);
        console.log('Columns:', columns);

        // Try to fetch one user to see data format (masking password)
        const [rows] = await connection.execute(`SELECT * FROM ${userTable} LIMIT 1`);
        console.log('Sample row:', rows);
    } else {
        console.log('No obvious user table found.');
    }

    await connection.end();
}

inspect().catch(console.error);
