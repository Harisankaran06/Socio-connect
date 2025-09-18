import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
  body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); }
  .perf-main { width: 100%; max-width: 1100px; margin: 40px auto; display: flex; flex-direction: column; align-items: stretch; position: relative; padding: 0 15px; }
  .back-arrow {
    position: absolute;
    left: 15px;
    top: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  .perf-title { font-size: 2rem; color: #7c4dff; margin-bottom: 28px; font-weight: 700; letter-spacing: -1px; text-align: center; }
  .card { 
    background: #fff; 
    border-radius: 18px; 
    padding: 28px; 
    box-shadow: 0 8px 32px rgba(155,92,241,0.12); 
    border: 1.5px solid #ececec; 
    margin-bottom: 25px;
  }
  .card-title { 
    font-weight: 600; 
    margin-bottom: 20px; 
    color: #222; 
    font-size: 1.25rem; 
    display: flex; 
    align-items: center; 
    gap: 10px; 
  }
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 25px;
  }
  .kpi-card {
    background: #f9faff;
    border: 1px solid #e8ebff;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
  }
  .kpi-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: #7c4dff;
    margin-bottom: 5px;
  }
  .kpi-label {
    font-size: 1rem;
    color: #555;
    font-weight: 500;
  }
  .kpi-change {
    font-size: 0.9rem;
    font-weight: 600;
  }
  .positive { color: #28c940; }
  .negative { color: #e03434; }

  .grid-2-col {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 25px;
  }
  
  .trends-table { width: 100%; border-collapse: collapse; }
  .trends-table th, .trends-table td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid #f0f0f0;
  }
  .trends-table th { font-size: 0.9rem; color: #888; text-transform: uppercase; }
  .trends-table td { font-size: 1rem; color: #444; font-weight: 500; }

  .leaderboard-list { list-style: none; padding: 0; }
  .leaderboard-item { display: flex; align-items: center; gap: 15px; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
  .leaderboard-item:last-child { border-bottom: none; }
  .leaderboard-rank { font-size: 1.1rem; font-weight: 700; color: #888; width: 30px; text-align: center; }
  .leaderboard-name { font-weight: 600; flex-grow: 1; }
  .leaderboard-score { font-weight: 700; color: #7c4dff; }
  .leaderboard-item:nth-child(1) .leaderboard-rank { color: #ffb300; }
  .leaderboard-item:nth-child(2) .leaderboard-rank { color: #a0a0a0; }
  .leaderboard-item:nth-child(3) .leaderboard-rank { color: #cd7f32; }
`;

const kpis = [
    { label: 'SLA Compliance', value: '89.7%', change: '+0.4%', trend: 'positive' },
    { label: 'Avg. First Response', value: '2.4 hrs', change: '+0.2 hrs', trend: 'positive' },
    { label: 'Customer Satisfaction', value: '4.2/5', change: '0', trend: 'positive' },
    { label: 'Resolution Rate', value: '85.9%', change: '+0.6%', trend: 'negative' },
];

const trends = [
    { month: 'September', csat: '4.6/5', resolution: '88.1%' },
    { month: 'August', csat: '4.5/5', resolution: '88.6%' },
    { month: 'July', csat: '4.5/5', resolution: '87.8%' },
    { month: 'June', csat: '4.4/5', resolution: '87.2%' },
    { month: 'May', csat: '4.3/5', resolution: '86.5%' },
];

const leaderboard = [
    { rank: 1, name: 'Kumbakonam Electric', score: '97.2%' },
    { rank: 2, name: 'Kumbakonam Water Board', score: '96.5%' },
    { rank: 3, name: 'Kumbakonam Sanitation', score: '95.8%' },
    { rank: 4, name: 'Kumbakonam Roads', score: '94.2%' },
    { rank: 5, name: 'Kumbakonam PWD', score: '93.5%' },
];

export default function PERMC19() {
  const navigate = useNavigate();

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>
      <div className="perf-main">
        <img src="/images/back.png" alt="Back" className="back-arrow" onClick={() => navigate(-1)} />
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
          <img src="/images/logo.png" alt="Socio Connect Logo" style={{height:60,objectFit:'contain'}} />
        </div>
        <div className="perf-title">Performance Metrics & KPIs</div>
        
        <div className="card">
            <div className="card-title">
                <span className="material-icons">speed</span>
                Key Performance Indicators
            </div>
            <div className="kpi-grid">
                {kpis.map(kpi => (
                    <div className="kpi-card" key={kpi.label}>
                        <div className="kpi-value">{kpi.value}</div>
                        <div className="kpi-label">{kpi.label}</div>
                        <div className={`kpi-change ${kpi.trend}`}>{kpi.change} vs last month</div>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid-2-col">
            <div className="card">
                <div className="card-title">
                    <span className="material-icons">trending_up</span>
                    Monthly Performance Trends
                </div>
                <table className="trends-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>CSAT Score</th>
                            <th>Resolution Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trends.map(t => (
                            <tr key={t.month}>
                                <td>{t.month}</td>
                                <td>{t.csat}</td>
                                <td>{t.resolution}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card">
                <div className="card-title">
                    <span className="material-icons">leaderboard</span>
                    Top Performers
                </div>
                <ul className="leaderboard-list">
                    {leaderboard.map(p => (
                        <li className="leaderboard-item" key={p.rank}>
                            <div className="leaderboard-rank">{p.rank}</div>
                            <div className="leaderboard-name">{p.name}</div>
                            <div className="leaderboard-score">{p.score} pts</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </>
  );
}



