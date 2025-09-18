import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
  body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); }
  .dashboard-main { width: 100%; max-width: 1200px; margin: 40px auto; display: flex; flex-direction: column; align-items: stretch; position: relative; padding: 0 15px; }
  .back-arrow {
    position: absolute;
    left: 15px;
    top: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  .dashboard-title { font-size: 2rem; color: #7c4dff; margin-bottom: 7px; font-weight: 700; letter-spacing: -1px; text-align: center; }
  .dashboard-subtitle { color: #555; font-size: 1.08rem; margin-bottom: 28px; text-align: center; }
  .metrics-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 22px; margin-bottom: 32px; }
  .metric-card { 
    background: #fff; 
    border-radius: 18px; 
    padding: 22px; 
    box-shadow: 0 8px 32px rgba(155,92,241,0.12); 
    display: flex; 
    flex-direction: column; 
    border: 1.5px solid #ececec;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(155,92,241,0.18);
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
    box-shadow: 0 8px 32px rgba(155, 92, 241, 0.12); 
    padding: 22px 28px; 
    border: 1.5px solid #ececec;
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

const metrics = [
  { icon: "description", title: "Total Complaints", value: "45", change: "+5%", changeColor: "#15bd60", className: "mc-total" },
  { icon: "error_outline", title: "Open Complaints", value: "8", change: "+2%", changeColor: "#e1861e", className: "mc-open" },
  { icon: "schedule", title: "In Progress", value: "16", change: "+5%", changeColor: "#e54f4a", className: "mc-progress" },
  { icon: "check_circle", title: "Resolved", value: "21", change: "+9%", changeColor: "#15bd60", className: "mc-resolved" },
  { icon: "trending_up", title: "Avg Resolution", value: "1.8d", change: "-0.2d", changeColor: "#15bd60", className: "mc-avg" },
  { icon: "error", title: "Overdue", value: "3", change: "+1", changeColor: "#e03434", className: "mc-overdue" }
];

const categories = [
    { label: "Electricity", value: 18, color: "#ffb300" },
    { label: "Water Supply", value: 15, color: "#16aaff" },
    { label: "Sanitation", value: 10, color: "#28c940" },
    { label: "Roads", value: 7, color: "#ff792a" },
    { label: "PWD", value: 5, color: "#5e35b1" },
];

const recentComplaints = [
    { desc: "Street light not working in Paramathi Road", status: "Open" },
    { desc: "Sewage overflow in Senthamangalam", status: "In Progress" },
    { desc: "Pothole on main road in Tiruchengode Road", status: "Resolved" },
    { desc: "No water supply in Mohanur", status: "Open" }
];

export default function DBMC22() {
  const navigate = useNavigate();

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>
      <div className="dashboard-main">
        <img src="/images/back.png" alt="Back" className="back-arrow" onClick={() => navigate(-1)} />
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
          <img src="/images/logo.png" alt="Socio Connect Logo" style={{height:60,objectFit:'contain'}} />
        </div>
        <div className="dashboard-title">Dashboard Overview</div>
            
        <div className="metrics-row">
          {metrics.map((item) => (
            <div key={item.title} className={`metric-card ${item.className}`}>
              <span className="material-icons metric-icon">{item.icon}</span>
              <div className="metric-title">{item.title}</div>
              <div className="metric-value-row">
                <span className="metric-value">{item.value}</span>
                <span className="metric-change" style={{color:item.changeColor}}>{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lower-content">
          <div className="card">
            <div className="card-title"><span className="material-icons">category</span>Complaints by Category</div>
            <ul className="list">
              {categories.map(cat => (
                <li key={cat.label} className="list-item">
                  <span className="list-item-label" style={{color: cat.color}}>{cat.label}</span>
                  <span className="list-item-value">{cat.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="card-title"><span className="material-icons">history</span>Recent Complaints</div>
            <ul className="list">
              {recentComplaints.map((complaint, index) => (
                <li key={index} className="list-item">
                  <span className="list-item-label">{complaint.desc}</span>
                  <span className={`status status-${complaint.status.toLowerCase().replace(' ', '')}`}>{complaint.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}



