import React, { useState } from "react";
import "./App.css";

function App() {
  const [history, setHistory] = useState([]);

  const API = "https://incidentiq-ryxt.onrender.com";

  const triggerIncident = async () => {
    try {
      const res = await fetch(`${API}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "kubernetes",
          message: "test",
          severity: "low"
        })
      });

      const data = await res.json();

      console.log("DATA:", data);

      setHistory((prev) => [data, ...prev]);

    } catch (err) {
      console.error("ERROR:", err);
      alert("Error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 IncidentIQ Dashboard</h1>

      <button onClick={triggerIncident}>Trigger Incident</button>

      <h2>History</h2>

      {history.map((item, i) => (
        <pre key={i}>{JSON.stringify(item, null, 2)}</pre>
      ))}
    </div>
  );
}

export default App;