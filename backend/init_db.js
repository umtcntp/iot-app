const pool = require("./db");

const initDB = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sensors (
        id SERIAL PRIMARY KEY,
        sensor_id VARCHAR(50) NOT NULL,
        temperature FLOAT NOT NULL,
        humidity FLOAT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("Tables created.");

        const users = [
            { username: "admin", password: "admin123", role: "System Admin" },
            { username: "company_admin", password: "company123", role: "Company Admin" },
            { username: "user", password: "user123", role: "User" }
        ];

        for (const user of users) {
            const res = await pool.query("SELECT 1 FROM users WHERE username = $1", [user.username]);
            if (res.rowCount === 0) {
                await pool.query(
                    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
                    [user.username, user.password, user.role]
                );
                console.log(`Default user added: ${user.username}`);
            } else {
                console.log(`User already exists: ${user.username}`);
            }
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        pool.end();
    }
};

initDB();
