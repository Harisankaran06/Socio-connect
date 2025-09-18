import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  .logo-absolute {
    position: absolute;
    top: 2mm;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: 150px;
    height: auto;
    margin: 0;
    padding: 0;
    background: transparent;
    display: block;
    line-height: 0;
  }
  .bg-circle {
    position: fixed;
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.18;
    background: #ae90ff;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
  body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); }
  .header { width: 100%; background: transparent; border-bottom: none; padding: 0 !important; margin: 0 !important; display: flex; align-items: center; justify-content: center; box-shadow: none; position: relative; min-height: 0; height: auto; }
  .logo { font-size: 2rem; font-weight: bold; letter-spacing: 0.05em; color: #9b5cf1; padding: 0 !important; margin: 0 !important; line-height: 0; height: auto; }
  .dashboard-main { width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 130px !important; }
  .dashboard-title { font-size: 2rem; color: #7c4dff; margin-bottom: 8px; text-align: center; font-weight: 700; letter-spacing: -1px; }
  .dashboard-subtitle { color: #555; font-size: 1.15rem; margin-bottom: 32px; text-align: center; }
  .card-grid { display: grid; grid-template-columns: repeat(3, minmax(210px, 1fr)); gap: 32px 40px; max-width: 950px; width: 100%; justify-items: center; margin-top: 10px; }
  .dashboard-card { background: #fff; border-radius: 18px; padding: 38px 30px 32px 30px; min-width: 245px; max-width: 290px; min-height: 148px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07); transition: box-shadow 0.16s, border 0.14s, transform 0.18s; font-size: 1.1rem; font-weight: 500; cursor: pointer; border: 1.5px solid #ececec; position: relative; }
  .dashboard-card:hover { border: 1.5px solid #9b5cf1; box-shadow: 0 16px 48px rgba(155,92,241,0.22), 0 2px 10px rgba(155,92,241,0.10); background: #f8faff; transform: translateY(-10px) scale(1.03); z-index: 2; }
  .card-icon { font-size: 2.3rem; margin-bottom: 12px; color: #9b5cf1; }
  .card-title { font-weight: 600; font-size: 1.14rem; color: #23222c; margin-bottom: 6px; text-align: center; }
  .card-desc { font-size: 1rem; color: #888fa2; text-align: center; }
`;


export default function INTMC9() {
  const navigate = useNavigate();
  return (
    <>
  <style>{styles}</style>
  {/* Decorative background circles for NLTN theme */}
  <div className="bg-circle" style={{width:400,height:400,top:-100,left:-100,background:'#ae90ff',position:'fixed'}}></div>

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <img className="logo-absolute" src="/images/logo.png" alt="Socio Connect Logo" />
      <main className="dashboard-main">
        <div className="dashboard-title">Welcome Back </div>
        <div className="dashboard-subtitle">Select an option below to get started</div>
        <section className="card-grid">
          <div className="dashboard-card" onClick={() => navigate('/dbmc9')} style={{cursor:'pointer'}}>
            <span className="material-icons card-icon">dashboard</span>
            <div className="card-title">Dashboard</div>
            <div className="card-desc">Overview and main metrics</div>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/dpmc9')} style={{cursor:'pointer'}}>
            <span className="material-icons card-icon">apartment</span>
            <div className="card-title">Departments</div>
            <div className="card-desc">Manage organizational units</div>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/mapmc9')}>
            <span className="material-icons card-icon">map</span>
            <div className="card-title">Map View</div>
            <div className="card-desc">Geographic data visualization</div>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/anamc9')}>
            <span className="material-icons card-icon">bar_chart</span>
            <div className="card-title">Analysis</div>
            <div className="card-desc">Data analysis and insights</div>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/permc9')}>
            <span className="material-icons card-icon">trending_up</span>
            <div className="card-title">Performance</div>
            <div className="card-desc">Performance metrics and KPIs</div>
          </div>
        </section>
      </main>
    </>
  );
}
