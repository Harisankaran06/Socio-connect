import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
:root { --accent: #9b5cf1; }
html, body { height: 100%; }
body { background: linear-gradient(135deg, #e8ebff, #f8f5ff); min-height: 100vh; overflow-x: hidden; position: relative; }
body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }

.main-content { margin-left: 0; padding: 32px; min-height: 100vh; position: relative; z-index: 1; width: 100vw; box-sizing: border-box; }
.dashboard-header { display: flex; justify-content: center; align-items: center; margin-bottom: 32px; position: relative; }
.dashboard-header h1 { margin: 0; font-size: 2rem; color: #7c4dff; }
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
.search { padding: 10px 20px; border-radius: 25px; border: 1px solid #e0e0e0; background: #f9f9f9; font-size: 15px; transition: border 0.3s; }
.search:focus { border-color: #9b5cf1; outline: none; background: #fff; }
.notification-icon { margin-left: 16px; width: 32px; height: 32px; background: linear-gradient(to right, #9b5cf1, #6a7dff); border-radius: 50%; display: inline-block; vertical-align: middle; position: relative; }
.notification-icon::after { content: '3'; position: absolute; top: -6px; right: -6px; background: #ff4d4f; color: white; font-size: 12px; width: 18px; height: 18px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; }

.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 28px;
  max-width: 1100px;
  margin: 0 auto;
}

.department-box {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07);
  border: 1.5px solid rgba(155,92,241,0.10);
  padding: 28px 20px;
  text-align: center;
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  pointer-events: auto;
  user-select: none;
  outline: none;
  width: 100%;
  min-height: 120px;
}

.department-box .material-icons {
  font-size: 2.8rem;
  color: #7c4dff;
  pointer-events: none;
}

.department-box:hover,
.department-box:focus {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(155, 92, 241, 0.18);
  border-color: #7c4dff;
  outline: 2px solid #7c4dff;
  outline-offset: 2px;
}

.department-box:active {
  transform: translateY(-4px);
}

@media (max-width: 900px) {
  .sidebar { width: 60px; }
  .main-content { margin-left: 60px; padding: 16px; }
  .sidebar-header h2, .sidebar-header span, .sidebar-header img, .menu li, .profile { display: none; }
  .departments-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .department-box {
    font-size: 1rem;
    padding: 20px 16px;
  }
}
`;

export default function Dashboard() {
  const navigate = useNavigate();

  const departments = [
    { name: "Electricity", icon: "bolt" },
    { name: "Water Supply", icon: "water_drop" },
    { name: "Sanitation", icon: "cleaning_services" },
    { name: "Roads", icon: "add_road" },
    { name: "PWD", icon: "engineering" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>

      <main className="main-content">
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:24,marginTop:8}}>
          <img src="/images/logo.png" alt="Socio Connect Logo" style={{width:150,objectFit:'contain',display:'block'}} />
        </div>
        <header className="dashboard-header">
          <h1>Departments</h1>
          <div className="back-arrow" onClick={() => navigate(-1)}>
            <span className="material-icons" style={{ fontSize: '24px', color: '#7c4dff' }}>arrow_back</span>
          </div>
        </header>

        <div className="departments-grid">
          {departments.map((dept, index) => (
            <button 
              key={index} 
              className="department-box"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 Department clicked:', dept.name);
                const deptRoutes = {
                  'Electricity': '/tamilnadu/mc1/elemc1',
                  'Water Supply': '/tamilnadu/mc1/watmc1',
                  'Sanitation': '/tamilnadu/mc1/sanmc1',
                  'Roads': '/tamilnadu/mc1/roamc1',
                  'PWD': '/tamilnadu/mc1/pwdmc1'
                };
                const route = deptRoutes[dept.name];
                console.log('📍 Navigating to route:', route);
                if (route) {
                  navigate(route);
                } else {
                  console.error('❌ No route found for department:', dept.name);
                }
              }}
              style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
            >
              <span className="material-icons" style={{ pointerEvents: 'none' }}>{dept.icon}</span>
              <span style={{ pointerEvents: 'none' }}>{dept.name}</span>
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
