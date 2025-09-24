import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getStats, getCategoryStats } from '../../../../utils/api';
import RecentComplaints from "./RecentComplaints";

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
  :root { --accent: #9b5cf1; }
  html, body { height: 100%; }
  body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); position: relative; }
  body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
  body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
  body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
  .dashboard-main { width: 100%; max-width: 1200px; margin: 40px auto; display: flex; flex-direction: column; align-items: stretch; position: relative; padding: 0 15px; z-index: 1; }
  .back-arrow {
    position: absolute;
    left: 15px;
    top: 15px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
    z-index: 100;
  }
  .back-arrow:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(124, 77, 255, 0.3);
  }
  .dashboard-title { font-size: 2rem; color: #7c4dff; margin-bottom: 7px; font-weight: 700; letter-spacing: -1px; text-align: center; position: relative; }
  .refresh-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 40px;
    height: 40px;
    background: rgba(124, 77, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border: 2px solid rgba(124, 77, 255, 0.2);
  }
  .refresh-btn:hover {
    background: rgba(124, 77, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(124, 77, 255, 0.3);
  }
  .refresh-btn.loading {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: translateY(-50%) rotate(0deg); }
    to { transform: translateY(-50%) rotate(360deg); }
  }
  .dashboard-subtitle { color: #555; font-size: 1.08rem; margin-bottom: 28px; text-align: center; }
  .metrics-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 22px; margin-bottom: 32px; }
  .metric-card { 
    background: #fff; 
    border-radius: 18px; 
    padding: 22px; 
    box-shadow: 0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07); 
    display: flex; 
    flex-direction: column; 
    border: 1.5px solid rgba(155,92,241,0.10);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(155,92,241,0.22), 0 2px 10px rgba(155,92,241,0.10);
  }
  .metric-icon { font-size: 2.2rem; margin-bottom: 10px; }
  .metric-title { font-size: 1rem; color: #555; margin-bottom: 5px; font-weight: 500; }
  .metric-value-row { display: flex; align-items: baseline; }
  .metric-value { font-size: 1.8rem; font-weight: 700; color: #23222d; }
  .metric-change { font-size: 0.9rem; padding-left: 7px; font-weight: 600; }
  .mc-total .metric-icon { color: #356ad6; }
  .mc-open .metric-icon { color: #e1861e; }
  .mc-progress .metric-icon { color: #e54f4a; }
  .mc-resolved .metric-icon { color: #15bd60; }
  .mc-avg .metric-icon { color: #8a22ef; }
  .mc-overdue .metric-icon { color: #e03434; }
  
  .lower-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px; }
  .card { 
    background: #fff; 
    border-radius: 18px; 
    box-shadow: 0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07); 
    padding: 22px 28px; 
    border: 1.5px solid rgba(155,92,241,0.10);
  }
  .card-title { font-weight: 600; margin-bottom: 14px; color: #222; font-size: 1.15rem; display: flex; align-items: center; gap: 8px; }
  
  .list { list-style: none; padding: 0; }
  .list-item { display: flex; justify-content: space-between; align-items: center; font-size: 1rem; padding: 9px 0; border-bottom: 1px solid #f5f5f5; }
  .list-item:last-child { border-bottom: none; }
  .list-item-label { font-weight: 500; color: #444; }
  .list-item-value { font-weight: 600; }
  .status { padding: 3px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
  .status-open { background-color: #fdf2e4; color: #e1861e; }
  .status-progress { background-color: #fadede; color: #e54f4a; }
  .status-resolved { background-color: #e6f7ef; color: #15bd60; }
`;

export default function DBTN() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);  // Start empty, populate from API only
  const [categories, setCategories] = useState([]);  // Start empty, populate from API only
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);  // For manual refresh button

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh dashboard data every 30 seconds to reflect real-time updates
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing dashboard data...');
      fetchDashboardData();
    }, 30000); // Refresh every 30 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData(false); // Don't show main loading state
    setRefreshing(false);
  };

  const fetchDashboardData = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      console.log('🔄 Fetching dashboard data from API...');
      
      // Fetch statistics using robust API utility
      const statsData = await getStats('MC1');
      const categoryData = await getCategoryStats('MC1');
      
      if (statsData && statsData.success) {
        const stats = statsData.data;
        console.log('✅ Stats API data:', stats);
        
        // Calculate metrics from real API data only
        const total = parseInt(stats.total) || 0;
        const open = parseInt(stats.open) || 0;
        const inProgress = parseInt(stats.in_progress) || 0;
        const resolved = parseInt(stats.resolved) || 0;
        const closed = parseInt(stats.closed) || 0;
        
        console.log('🔍 Debug values:');
        console.log('  - stats.total:', stats.total, 'type:', typeof stats.total);
        console.log('  - parseInt(stats.total):', total);
        console.log('  - total.toString():', total.toString());
        
        // Calculate percentage changes
        const openPercent = total > 0 ? Math.round((open / total) * 100) : 0;
        const progressPercent = total > 0 ? Math.round((inProgress / total) * 100) : 0;
        const resolvedPercent = total > 0 ? Math.round((resolved / total) * 100) : 0;
        
        const updatedMetrics = [
          { 
            icon: "description", 
            title: "Total Complaints", 
            value: total.toString(), 
            change: `${total} total`, 
            changeColor: "#15bd60", 
            className: "mc-total" 
          },
          { 
            icon: "error_outline", 
            title: "Open Complaints", 
            value: open.toString(), 
            change: `${openPercent}% of total`, 
            changeColor: "#e1861e", 
            className: "mc-open" 
          },
          { 
            icon: "schedule", 
            title: "In Progress", 
            value: inProgress.toString(), 
            change: `${progressPercent}% of total`, 
            changeColor: "#e54f4a", 
            className: "mc-progress" 
          },
          { 
            icon: "check_circle", 
            title: "Resolved", 
            value: resolved.toString(), 
            change: `${resolvedPercent}% success`, 
            changeColor: "#15bd60", 
            className: "mc-resolved" 
          },
          { 
            icon: "trending_up", 
            title: "Success Rate", 
            value: `${resolvedPercent}%`, 
            change: `${resolved}/${total} resolved`, 
            changeColor: "#15bd60", 
            className: "mc-avg" 
          },
          { 
            icon: "error", 
            title: "Closed", 
            value: closed.toString(), 
            change: "System closed", 
            changeColor: "#6c757d", 
            className: "mc-overdue" 
          }
        ];
        
        console.log('📊 Setting metrics array:', updatedMetrics);
        console.log('📊 Total complaints metric:', updatedMetrics[0]);
        setMetrics(updatedMetrics);
      } else {
        throw new Error('Stats API response invalid');
      }

      if (categoryData && categoryData.success) {
        const categories = categoryData.data;
        console.log('✅ Category API data:', categories);
        
        const categoryColors = {
          "Electricity": "#ffb300",
          "Water Supply": "#16aaff", 
          "Sanitation": "#28c940",
          "Roads": "#ff792a",
          "PWD": "#5e35b1",
          "Others": "#9c27b0"
        };
        
        const updatedCategories = categories.map(cat => ({
          label: cat.category,
          value: parseInt(cat.count),
          color: categoryColors[cat.category] || "#757575"
        }));
        
        setCategories(updatedCategories);
      } else {
        throw new Error('Category API response invalid');
      }
      
      if (showLoading) {
        setLoading(false);
      }
      console.log('✅ Dashboard data loaded successfully from API');
    } catch (error) {
      console.error('❌ API Error fetching dashboard data:', error);
      console.error('❌ Error details:', {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request,
        stack: error.stack
      });
      setError(`API Connection Failed: ${error.message}`);
      if (showLoading) {
        setLoading(false);
      }
      // NO FALLBACK DATA - API only approach
      setMetrics([]);
      setCategories([]);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>
      <div className="dashboard-main">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <span className="material-icons" style={{ fontSize: '24px', color: '#7c4dff' }}>arrow_back</span>
        </div>
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
          <img src="/images/logo.png" alt="Socio Connect Logo" style={{height:60,objectFit:'contain'}} />
        </div>
        <div className="dashboard-title">
          Dashboard Overview - API Data Only
          <div 
            className={`refresh-btn ${refreshing ? 'loading' : ''}`}
            onClick={handleManualRefresh}
            title="Refresh dashboard data"
          >
            <span className="material-icons" style={{ fontSize: '20px', color: '#7c4dff' }}>
              refresh
            </span>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
            <div style={{fontSize: '40px', marginBottom: '20px'}}>🔄</div>
            <h3>Loading Dashboard Data...</h3>
            <p>Fetching real-time statistics from database</p>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div style={{textAlign: 'center', padding: '40px', backgroundColor: '#fff3f3', borderRadius: '10px', border: '2px solid #ff4444', margin: '20px 0'}}>
            <div style={{fontSize: '40px', marginBottom: '20px'}}>❌</div>
            <h3 style={{color: '#cc0000'}}>API Connection Failed</h3>
            <p style={{color: '#666', marginBottom: '20px'}}>{error}</p>
            <button 
              onClick={fetchDashboardData}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🔄 Retry Connection
            </button>
            <div style={{marginTop: '15px', fontSize: '14px', color: '#888'}}>
              Make sure XAMPP/WAMP is running and database is configured
            </div>
          </div>
        )}
        
        {/* Success State - Show data only when API works */}
        {!loading && !error && (
          <>
            <div className="metrics-row">
              {metrics.length > 0 ? metrics.map((item) => (
                <div 
                  key={item.title} 
                  className={`metric-card ${item.className}`}
                  onClick={
                    item.title === "Total Complaints" ? () => navigate('/totmc1') : 
                    item.title === "Open Complaints" ? () => navigate('/opemc1') :
                    item.title === "In Progress" ? () => navigate('/promc1') :
                    item.title === "Resolved" ? () => navigate('/resmc1') :
                    item.title === "Success Rate" ? () => navigate('/sucmc1') :
                    item.title === "Closed" ? () => navigate('/clomc1') : undefined
                  }
                  style={(item.title === "Total Complaints" || item.title === "Open Complaints" || item.title === "In Progress" || item.title === "Resolved" || item.title === "Success Rate" || item.title === "Closed") ? {cursor: 'pointer'} : {}}
                >
                  <span className="material-icons metric-icon">{item.icon}</span>
                  <div className="metric-title">{item.title}</div>
                  <div className="metric-value-row">
                    <span className="metric-value">{item.value}</span>
                    <span className="metric-change" style={{color:item.changeColor}}>{item.change}</span>
                  </div>
                </div>
              )) : (
                <div style={{textAlign: 'center', padding: '40px', color: '#666', width: '100%'}}>
                  <h3>📊 No Statistics Available</h3>
                  <p>API data could not be loaded</p>
                </div>
              )}
            </div>

            <div className="lower-content">
              <div className="card">
                <div className="card-title"><span className="material-icons">category</span>Complaints by Category</div>
                {categories.length > 0 ? (
                  <ul className="list">
                    {categories.map(cat => (
                      <li key={cat.label} className="list-item">
                        <span className="list-item-label" style={{color: cat.color}}>{cat.label}</span>
                        <span className="list-item-value">{cat.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{textAlign: 'center', padding: '20px', color: '#666'}}>
                    <span className="material-icons" style={{fontSize: '48px', color: '#ddd'}}>pie_chart</span>
                    <p>No category data available from API</p>
                  </div>
                )}
              </div>

              <div className="card">
                <div className="card-title"><span className="material-icons">history</span>Recent Complaints</div>
                <RecentComplaints />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}