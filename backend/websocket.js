const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("New WebSocket connection.");

    ws.on("message", (message) => {
        console.log("WebSocket message:", message);
    });
});

// Function to broadcast data
const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

module.exports = { wss, broadcast };
