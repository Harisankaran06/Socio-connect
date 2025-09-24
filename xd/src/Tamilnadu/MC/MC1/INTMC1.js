import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
  :root { --accent: #9b5cf1; }
  html, body { height: 100%; }
  body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); position: relative; }
  body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
  body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
  body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
  .header { width: 100%; background: transparent; border-bottom: none; padding: 0 !important; margin: 0 !important; display: flex; align-items: center; justify-content: center; box-shadow: none; position: relative; min-height: 0; height: auto; }
  .logo { font-size: 2rem; font-weight: bold; letter-spacing: 0.05em; color: #9b5cf1; padding: 0 !important; margin: 0 !important; line-height: 0; height: auto; }
  .dashboard-main { 
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin-top: 80px; 
    position: relative; 
    z-index: 1; 
    padding: 0 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .logo {
    text-align: center;
    margin-bottom: 30px;
  }
  .logo img {
    width: 150px;
    height: auto;
  }
  .dashboard-title { 
    font-size: 2.5rem; 
    color: #7c4dff; 
    margin-bottom: 12px; 
    text-align: center; 
    font-weight: 700; 
    letter-spacing: -1px; 
  }
  .dashboard-subtitle { 
    color: #555; 
    font-size: 1.2rem; 
    margin-bottom: 40px; 
    text-align: center; 
    max-width: 600px;
  }
  .card-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 24px; 
    width: 100%; 
    justify-items: center; 
    margin-top: 0;
    max-width: 1000px;
  }
  .dashboard-card { 
    background: #fff; 
    border-radius: 16px; 
    padding: 32px 24px; 
    width: 100%;
    max-width: 300px;
    min-height: 180px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    box-shadow: 0 4px 20px rgba(155,92,241,0.15); 
    transition: all 0.3s ease; 
    font-size: 1.1rem; 
    font-weight: 500; 
    cursor: pointer; 
    border: 2px solid transparent; 
    position: relative; 
  }
  .dashboard-card:hover { 
    border: 2px solid #9b5cf1; 
    box-shadow: 0 8px 32px rgba(155,92,241,0.25); 
    background: #fcfcff; 
    transform: translateY(-4px) scale(1.02); 
    z-index: 2; 
  }
  .card-icon { 
    font-size: 2.5rem; 
    margin-bottom: 16px; 
    color: #9b5cf1; 
  }
  .card-title { 
    font-weight: 600; 
    font-size: 1.2rem; 
    color: #23222c; 
    margin-bottom: 8px; 
    text-align: center; 
  }
  .card-desc { 
    font-size: 0.95rem; 
    color: #666; 
    text-align: center; 
    line-height: 1.4;
  }
  
  @media (max-width: 768px) {
    .dashboard-main {
      margin-top: 60px;
      padding: 0 16px;
    }
    .dashboard-title {
      font-size: 2rem;
    }
    .dashboard-subtitle {
      font-size: 1.1rem;
      margin-bottom: 32px;
    }
    .card-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .dashboard-card {
      max-width: 100%;
      min-height: 160px;
      padding: 28px 20px;
    }
    .logo img {
      width: 120px;
    }
  }
  
  @media (max-width: 480px) {
    .dashboard-main {
      margin-top: 50px;
    }
    .dashboard-title {
      font-size: 1.8rem;
    }
    .card-icon {
      font-size: 2.2rem;
    }
    .logo img {
      width: 100px;
    }
  }
`;


export default function Interface() {
  const navigate = useNavigate();
  return (
    <>
      <style>{styles}</style>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      
      <main className="dashboard-main">
        <div className="logo">
          <img src="/images/logo.png" alt="Socio Connect Logo" />
        </div>
        
        <div className="dashboard-title">Welcome Back</div>
        <div className="dashboard-subtitle">Select an option below to get started</div>
        
        <section className="card-grid">
          <div className="dashboard-card" onClick={() => navigate('/dbtn')}>
            <span className="material-icons card-icon">dashboard</span>
            <div className="card-title">Dashboard</div>
            <div className="card-desc">Overview and main metrics</div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/dptn')}>
            <span className="material-icons card-icon">apartment</span>
            <div className="card-title">Departments</div>
            <div className="card-desc">Manage organizational units</div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/maptn')}>
            <span className="material-icons card-icon">map</span>
            <div className="card-title">Map View</div>
            <div className="card-desc">Geographic data visualization</div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/anatn')}>
            <span className="material-icons card-icon">bar_chart</span>
            <div className="card-title">Analysis</div>
            <div className="card-desc">Data analysis and insights</div>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/pertn')}>
            <span className="material-icons card-icon">trending_up</span>
            <div className="card-title">Performance</div>
            <div className="card-desc">Performance metrics and KPIs</div>
          </div>
        </section>
      </main>
    </>
  );
}
