import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
body { background: linear-gradient(135deg, #e8ebff, #f8f5ff); min-height: 100vh; overflow-x: hidden; position: relative; }
body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174, 144, 255, 0.2); z-index: 0; }
body::before { width: 400px; height: 400px; top: -120px; left: -120px; }
body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }

.main-content { margin-left: 0; padding: 32px; min-height: 100vh; position: relative; z-index: 1; width: 100vw; box-sizing: border-box; }
.dashboard-header { display: flex; justify-content: center; align-items: center; margin-bottom: 32px; position: relative; }
.dashboard-header h1 { margin: 0; font-size: 2rem; color: #7c4dff; }
.back-arrow {
    position: absolute;
    left: 32px;
    top: 0;
    transform: translateY(0);
    cursor: pointer;
    width: 40px;
    height: 40px;
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
  box-shadow: 0 8px 32px rgba(155,92,241,0.12);
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
  border: 1.5px solid #ececec;
}

.department-box .material-icons {
  font-size: 2.8rem;
  color: #7c4dff;
}

.department-box:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(155, 92, 241, 0.18);
  border-color: #7c4dff;
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

export default function DPMC18() {
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
          <img src="/images/back.png" alt="Back" className="back-arrow" onClick={() => navigate(-1)} />
        </header>

        <div className="departments-grid">
          {departments.map((dept, index) => (
            <div key={index} className="department-box">
              <span className="material-icons">{dept.icon}</span>
              {dept.name}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
