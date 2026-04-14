import React, { useState } from "react";
import "./App.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid
} from "recharts";

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

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      if (!data || !data.event) {
        alert("Invalid response");
        return;
      }

      setHistory((prev) => [data, ...prev]);

    } catch (err) {
      console.error("ERROR:", err);
      alert("Error occurred. Check console.");
    }
  };

  const severityData = [
    { name: "Low", value: history.filter(h => h?.event?.severity === "low").length },
    { name: "Medium", value: history.filter(h => h?.event?.severity === "medium").length },
    { name: "High", value: history.filter(h => h?.event?.severity === "high").length }
  ];

  const timelineData = history
    .slice()
    .reverse()
    .map((_, i) => ({
      index: i + 1,
      incidents: Math.floor(Math.random() * 5) + 1
    }));

  return (
    <div className="container">
      <h1>🚀 IncidentIQ Dashboard</h1>

      <button onClick={triggerIncident}>Trigger Incident</button>

      <div className="charts">
        <div className="chart">
          <h3>📊 Severity Distribution</h3>
          <BarChart width={400} height={250} data={severityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </div>

        <div className="chart">
          <h3>📈 Incident Timeline</h3>
          <LineChart width={500} height={250} data={timelineData}>
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="incidents" stroke="#2196F3" />
          </LineChart>
        </div>
      </div>

      <div>
        <h2>📜 Incident History</h2>

        {history.length === 0 && (
          <p>No incidents yet</p>
        )}

        {history.map((item, index) => (
          <div key={index} className="history-card">
            <p>{JSON.stringify(item)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;