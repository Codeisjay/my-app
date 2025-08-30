import React, { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const signup = async () => {
    try {
      const res = await axios.post(`${API_URL}/signup`, { email, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setToken(res.data.token);
      setMessage("Login successful! Token stored.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  const accessProtected = async () => {
    try {
      const res = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: token },
      });
      setMessage(res.data.message + " | UserID: " + res.data.user.id);
    } catch (err) {
      setMessage(err.response?.data?.error || "Unauthorized");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔐 Auth Demo</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
      <button onClick={accessProtected} disabled={!token}>Access Protected</button>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default App;
