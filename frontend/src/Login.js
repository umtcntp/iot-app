import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch("http://localhost:5001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            onLogin();
        } else {
            alert("Login failed!");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
