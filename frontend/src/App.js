import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "./Login";

function App() {
  const [sensorData, setSensorData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }

    // Start the WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => setSensorData(JSON.parse(event.data));

    return () => socket.close(); // Close the connection when the component unmounts
  }, []);

  if (!userRole) return <Login onLogin={() => window.location.reload()} />;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>IoT Sensor Data</h1>
      {sensorData ? (
        <div style={{ border: "1px solid #ccc", padding: "20px", display: "inline-block" }}>
          <p><strong>Sensor ID:</strong> {sensorData.sensor_id}</p>
          <p><strong>Temperature:</strong> {sensorData.temperature}°C</p>
          <p><strong>Humidity:</strong> {sensorData.humidity}%</p>
          <p>
            <strong>Timestamp:</strong> {new Date(sensorData.timestamp).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>Waiting for data...</p>
      )}
      <br />
      <button onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>
        Logout
      </button>
    </div>
  );
}

export default App;
