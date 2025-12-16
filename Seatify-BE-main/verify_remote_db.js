import mysql from 'mysql2/promise';

const config = {
    host: '162.55.65.66',
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
        if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
            console.log("\n⚠️  IMPORTANT: You must enable 'Remote MySQL' in cPanel.");
            console.log("1. Go to cPanel > Remote MySQL");
            console.log("2. Add your IP address to the list.");
            console.log("   (You can find your IP by searching 'what is my ip' on Google)");
        }
    }
}

test();
