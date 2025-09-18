import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
  body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); }
  .analytic-main { width: 100%; max-width: 900px; margin: 40px auto; display: flex; flex-direction: column; align-items: stretch; position: relative; padding: 0 15px; }
  .back-arrow {
    position: absolute;
    left: 15px;
    top: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  .analytic-title { font-size: 2rem; color: #7c4dff; margin-bottom: 28px; font-weight: 700; letter-spacing: -1px; text-align: center; }
  .card { 
    background: #fff; 
    border-radius: 18px; 
    padding: 28px 34px 24px 28px; 
    box-shadow: 0 8px 32px rgba(155,92,241,0.18); 
    border: 1.5px solid #ececec; 
    margin-bottom: 25px;
  }
  .card-title { 
    font-weight: 600; 
    margin-bottom: 20px; 
    letter-spacing: -0.5px; 
    color: #222; 
    font-size: 1.25rem; 
    display: flex; 
    align-items: center; 
    gap: 10px; 
  }
  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 25px;
  }
  .summary-card {
    background: #fff;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(155,92,241,0.12);
    border: 1.5px solid #ececec;
    text-align: center;
  }
  .summary-card .material-icons {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  .summary-card-title {
    font-size: 1rem;
    color: #555;
    margin-bottom: 5px;
  }
  .summary-card-value {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .best-performer .material-icons { color: #28c940; }
  .best-performer .summary-card-value { color: #28c940; }
  .needs-improvement .material-icons { color: #ff792a; }
  .needs-improvement .summary-card-value { color: #ff792a; }

  .perf-table { width: 100%; border-collapse: collapse; }
  .perf-table th, .perf-table td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid #f0f0f0;
  }
  .perf-table th { font-size: 0.9rem; color: #888; text-transform: uppercase; }
  .perf-table td { font-size: 1rem; color: #444; }
  .department-name { display: flex; align-items: center; gap: 10px; font-weight: 500; }
  .progress-bar { 
    background: #f0f0f0; 
    border-radius: 8px; 
    height: 12px; 
    width: 100px;
    position: relative; 
    overflow: hidden;
  }
  .progress-bar span { 
    height: 100%; 
    border-radius: 8px; 
    display: block; 
    position: absolute; 
    left: 0; 
    top: 0; 
  }
  .pb-san { background: #28c940; width: 85%; }
  .pb-pwd { background: #16aaff; width: 87%; }
  .pb-elec { background: #ffb300; width: 89%; }
  .pb-water { background: #ff792a; width: 78%; }
  .pb-road { background: #5e35b1; width: 85%; }
  .perf-percent { font-weight: 600; color: #333; }

  .grid-2-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
  .list { list-style: none; padding: 0; }
  .list-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
  .list-item:last-child { border-bottom: none; }
  .list-item-label { font-weight: 500; }
  .list-item-value { font-weight: 600; color: #7c4dff; }
`;

const departmentPerformance = [
    { name: 'Sanitation', resolved: 9, total: 12, satisfaction: 89, icon: 'cleaning_services', color: '#28c940', progressClass: 'pb-san' },
    { name: 'PWD', resolved: 5, total: 7, satisfaction: 86, icon: 'engineering', color: '#16aaff', progressClass: 'pb-pwd' },
    { name: 'Electricity', resolved: 7, total: 8, satisfaction: 92, icon: 'bolt', color: '#ffb300', progressClass: 'pb-elec' },
    { name: 'Water Supply', resolved: 9, total: 14, satisfaction: 80, icon: 'water_drop', color: '#ff792a', progressClass: 'pb-water' },
    { name: 'Roads', resolved: 8, total: 11, satisfaction: 83, icon: 'add_road', color: '#5e35b1', progressClass: 'pb-road' },
];

const summary = {
    bestPerformer: 'Electricity',
    needsImprovement: 'Water Supply',
};

export default function ANAMC12() {
  const navigate = useNavigate();

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>
      <div className="analytic-main">
        <img src="/images/back.png" alt="Back" className="back-arrow" onClick={() => navigate(-1)} />
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
          <img src="/images/logo.png" alt="Socio Connect Logo" style={{height:60,objectFit:'contain'}} />
        </div>
        <div className="analytic-title">Department Performance Analysis</div>

        <div className="summary-grid">
          <div className="summary-card best-performer">
            <span className="material-icons">emoji_events</span>
            <div className="summary-card-title">Best Performer</div>
            <div className="summary-card-value">{summary.bestPerformer}</div>
          </div>
          <div className="summary-card needs-improvement">
            <span className="material-icons">trending_down</span>
            <div className="summary-card-title">Needs Improvement</div>
            <div className="summary-card-value">{summary.needsImprovement}</div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-title">
            <span className="material-icons">assessment</span>
            Performance Metrics
          </div>
          <table className="perf-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Resolved</th>
                <th>Avg. Time</th>
                <th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {departmentPerformance.map(d => (
                <tr key={d.name}>
                  <td>
                    <div className="department-name">
                      <span className="material-icons">{d.icon}</span> {d.name}
                    </div>
                  </td>
                  <td>{d.resolved}</td>
                  <td>
                    <div className="progress-bar">
                      <span style={{width: `${(d.resolved/d.total)*100}%`}} className={d.progressClass}></span>
                    </div>
                  </td>
                  <td className="perf-percent">{`${Math.round((d.resolved/d.total)*100)}%`}</td>
                  <td>{`${d.satisfaction}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-2-col">
          <div className="card">
            <div className="card-title">
              <span className="material-icons">place</span>
              Complaint Hotspots
            </div>
            <ul className="list">
              <li className="list-item"><span className="list-item-label">1. RS Puram</span> <span className="list-item-value">8 cases</span></li>
              <li className="list-item"><span className="list-item-label">2. Gandhipuram</span> <span className="list-item-value">7 cases</span></li>
              <li className="list-item"><span className="list-item-label">3. Peelamedu</span> <span className="list-item-value">6 cases</span></li>
              <li className="list-item"><span className="list-item-label">4. Saibaba Colony</span> <span className="list-item-value">5 cases</span></li>
            </ul>
          </div>
          <div className="card">
            <div className="card-title">
              <span className="material-icons">timer</span>
              Resolution Time Analysis
            </div>
            <ul className="list">
              <li className="list-item"><span className="list-item-label">Under 24 hours</span> <span className="list-item-value">45%</span></li>
              <li className="list-item"><span className="list-item-label">1-3 days</span> <span className="list-item-value">35%</span></li>
              <li className="list-item"><span className="list-item-label">3-7 days</span> <span className="list-item-value">15%</span></li>
              <li className="list-item"><span className="list-item-label">Over 7 days</span> <span className="list-item-value">5%</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

