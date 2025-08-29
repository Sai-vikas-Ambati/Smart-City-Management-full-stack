import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line,
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         Cell } from 'recharts';
import './App.css';

const App = () => {
  // Sample data for the dashboard
  const [energyData, setEnergyData] = useState([
    { name: '00:00', consumption: 400 },
    { name: '04:00', consumption: 300 },
    { name: '08:00', consumption: 600 },
    { name: '12:00', consumption: 800 },
    { name: '16:00', consumption: 700 },
    { name: '20:00', consumption: 500 },
    { name: '24:00', consumption: 400 },
  ]);

  const [trafficData] = useState([
    { name: 'Mon', volume: 4000 },
    { name: 'Tue', volume: 3000 },
    { name: 'Wed', volume: 5000 },
    { name: 'Thu', volume: 4500 },
    { name: 'Fri', volume: 6000 },
    { name: 'Sat', volume: 3500 },
    { name: 'Sun', volume: 2500 },
  ]);

  const [wasteData] = useState([
    { name: 'Compost', value: 400 },
    { name: 'Recyclable', value: 300 },
    { name: 'Regular', value: 300 },
    { name: 'Hazardous', value: 200 },
  ]);

  const [airQualityData] = useState([
    { name: 'Jan', pm25: 40, pm10: 60, no2: 30 },
    { name: 'Feb', pm25: 35, pm10: 50, no2: 25 },
    { name: 'Mar', pm25: 45, pm10: 70, no2: 40 },
    { name: 'Apr', pm25: 30, pm10: 45, no2: 20 },
    { name: 'May', pm25: 25, pm10: 40, no2: 15 },
    { name: 'Jun', pm25: 20, pm10: 35, no2: 10 },
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Simulate loading real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      // Update energy consumption with slight variations
      setEnergyData(prev => 
        prev.map(item => ({
          ...item,
          consumption: item.consumption + (Math.random() * 50 - 25)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">City Dashboard</h1>
        <div className="date">{new Date().toDateString()}</div>
      </div>

      {/* Metrics Section */}
      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">ENERGY CONSUMPTION</h3>
            <div className="metric-icon">⚡</div>
          </div>
          <h2 className="metric-value">4,256 kWh</h2>
          <div className="metric-trend trend-down">
            <span>↓ 3.5% from yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">TRAFFIC FLOW</h3>
            <div className="metric-icon">🚗</div>
          </div>
          <h2 className="metric-value">87%</h2>
          <div className="metric-trend trend-up">
            <span>↑ 2.1% from yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">AIR QUALITY</h3>
            <div className="metric-icon">🌬️</div>
          </div>
          <h2 className="metric-value">Good</h2>
          <div className="metric-trend trend-up">
            <span>↑ 5 points better today</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">WATER USAGE</h3>
            <div className="metric-icon">💧</div>
          </div>
          <h2 className="metric-value">1,287 m³</h2>
          <div className="metric-trend trend-down">
            <span>↓ 1.8% from yesterday</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Energy Consumption (24h)</h3>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={energyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="consumption" stroke="#1976d2" fill="#1976d2" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Weekly Traffic Volume</h3>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trafficData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Waste Management</h3>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Air Quality Trends</h3>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={airQualityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pm25" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="pm10" stroke="#82ca9d" />
                <Line type="monotone" dataKey="no2" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Systems Status */}
      <div className="systems-status">
        <div className="status-header">
          <h3 className="status-title">Systems Status</h3>
        </div>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-indicator status-normal"></span>
            <span className="status-name">Power Grid</span>
            <span className="status-value">Normal</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-normal"></span>
            <span className="status-name">Water Supply</span>
            <span className="status-value">Normal</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-warning"></span>
            <span className="status-name">Traffic Signals</span>
            <span className="status-value">Warning</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-normal"></span>
            <span className="status-name">Public Wi-Fi</span>
            <span className="status-value">Normal</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-critical"></span>
            <span className="status-name">Waste Collection</span>
            <span className="status-value">Critical</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-normal"></span>
            <span className="status-name">Street Lighting</span>
            <span className="status-value">Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;