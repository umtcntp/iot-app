const express = require("express");
require("dotenv").config();
require("./mqttClient");
require("./websocket");
const bodyParser = require('body-parser');
const { login } = require('./auth');
const { authorize } = require('./middleware');
const pool = require("./db");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.post('/login', login);

app.post('/company', authorize(['System Admin']), (req, res) => {
    res.send('Company added.');
});

app.get('/sensors', authorize(['System Admin', 'Company Admin', 'User']), async (req, res) => {
    const result = await pool.query('SELECT * FROM sensors');
    res.json(result.rows);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
