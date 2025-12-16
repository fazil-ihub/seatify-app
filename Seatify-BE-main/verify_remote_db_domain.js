import mysql from 'mysql2/promise';

const config = {
    host: 'k12.velzx.com', // Trying domain name
    user: 'shadivic_wp806',
    password: 'Shanmugavel@18',
    database: 'shadivic_wp806',
    connectTimeout: 10000
};

async function test() {
    console.log(`Connecting to ${config.host}...`);
    try {
        const conn = await mysql.createConnection(config);
        console.log("✅ LIVE Connection Successful!");
        await conn.end();
    } catch (err) {
        console.log("❌ Connection Failed:", err.message);
    }
}

test();
