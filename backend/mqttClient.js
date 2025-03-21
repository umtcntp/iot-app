const mqtt = require("mqtt");
const pool = require("./db");
const { broadcast } = require("./websocket");

const client = mqtt.connect("mqtt://localhost");

client.on("connect", () => {
    console.log("Connected to MQTT Broker.");
    client.subscribe("iot/sensors");
});

client.on("message", async (topic, message) => {
    const data = JSON.parse(message.toString());
    console.log("Received sensor data:", data);

    await pool.query(
        "INSERT INTO sensors (sensor_id, temperature, humidity) VALUES ($1, $2, $3)",
        [data.sensor_id, data.temperature, data.humidity]
    );

    const result = await pool.query(
        "SELECT * FROM sensors WHERE sensor_id = $1 ORDER BY timestamp DESC LIMIT 1",
        [data.sensor_id]
    );

    const latestData = result.rows[0];
    console.log("Latest data:", latestData);

    broadcast(latestData);
});

module.exports = client;
