import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplaints, getComplaintsByStatus, updateComplaintStatus as updateComplaintStatusAPI } from '../../../../utils/api';

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
:root { --accent: #9b5cf1; }
html, body { height: 100%; }
body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); position: relative; }
body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }

.main-content { 
  margin-left: 0; 
  padding: 32px; 
  min-height: 100vh; 
  position: relative; 
  z-index: 1; 
  width: 100vw; 
  box-sizing: border-box; 
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
  color: #7c4dff;
  display: flex;
  align-items: center;
  gap: 12px;
}

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

.stats-container {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(155,92,241,0.18);
  padding: 24px;
  margin-bottom: 32px;
  text-align: center;
}

.total-complaints {
  font-size: 2.5rem;
  font-weight: bold;
  color: #7c4dff;
  margin-bottom: 8px;
}

.stats-label {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.resolve-btn {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
}

.resolve-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.priority-btn {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
}

.priority-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3);
}

.urgent-btn {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
}

.urgent-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.3);
}

.complaints-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(155,92,241,0.18);
  padding: 24px;
}

.section-title {
  font-size: 1.5rem;
  color: #7c4dff;
  margin-bottom: 20px;
  font-weight: 600;
}

.complaint-item {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border-left: 4px solid #795548;
  transition: all 0.2s ease;
}

.complaint-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(155,92,241,0.15);
}

.complaint-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 8px;
}

.complaint-id {
  font-weight: 600;
  color: #795548;
}

.complaint-date {
  color: #666;
  font-size: 0.9rem;
}

.complaint-desc {
  color: #333;
  margin-bottom: 8px;
}

.complaint-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-open {
  background: #e3f2fd;
  color: #1976d2;
}

.status-progress {
  background: #fff3e0;
  color: #f57c00;
}

.status-resolved {
  background: #e8f5e8;
  color: #4caf50;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

.error {
  text-align: center;
  padding: 40px;
  color: #f44336;
  font-size: 1.1rem;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .main-content { padding: 16px; }
  .action-buttons { flex-direction: column; align-items: center; }
  .complaint-header { flex-direction: column; align-items: flex-start; gap: 4px; }
}
`;

export default function RoadsDepartment() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalComplaints, setTotalComplaints] = useState(0);

  useEffect(() => {
    fetchRoadsComplaints();
  }, []);

  const fetchRoadsComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getComplaints('MC1');
      console.log('🏢 Roads Dept - API Response:', response);
      
      if (response && response.success && response.data) {
        // Filter complaints for Roads department
        const roadsComplaints = response.data.filter(complaint => 
          complaint.category && complaint.category.toLowerCase().includes('road') ||
          complaint.category && complaint.category.toLowerCase().includes('infrastructure') ||
          complaint.department && complaint.department.toLowerCase().includes('road')
        );
        
        console.log('🛣️ Filtered Roads Complaints:', roadsComplaints);
        setComplaints(roadsComplaints);
        setTotalComplaints(roadsComplaints.length);
      } else {
        setError('No data received from API');
      }
    } catch (err) {
      console.error('🚨 Error fetching roads complaints:', err);
      setError(err.message);
      
      // Fallback mock data for roads department
      const mockRoadsComplaints = [
        {
          id: 'ROA001',
          description: 'Large pothole on Main Street causing accidents',
          status: 'Open',
          category: 'Roads',
          date: '2025-09-22',
          department: 'Roads'
        },
        {
          id: 'ROA002', 
          description: 'Road repair work incomplete for 2 weeks',
          status: 'In Progress',
          category: 'Roads',
          date: '2025-09-21',
          department: 'Roads'
        },
        {
          id: 'ROA003',
          description: 'Traffic signal not working at intersection',
          status: 'Resolved',
          category: 'Roads', 
          date: '2025-09-20',
          department: 'Roads'
        },
        {
          id: 'ROA004',
          description: 'Road flooding during rain due to poor drainage',
          status: 'Open',
          category: 'Roads',
          date: '2025-09-19',
          department: 'Roads'
        },
        {
          id: 'ROA005',
          description: 'Missing road signs creating confusion',
          status: 'In Progress',
          category: 'Roads',
          date: '2025-09-18',
          department: 'Roads'
        },
        {
          id: 'ROA006',
          description: 'Broken street divider needs immediate repair',
          status: 'Open',
          category: 'Roads',
          date: '2025-09-17',
          department: 'Roads'
        }
      ];
      
      setComplaints(mockRoadsComplaints);
      setTotalComplaints(mockRoadsComplaints.length);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (action, complaintId = null) => {
    try {
      console.log(`🔄 Updating complaint ${complaintId || 'all'} with action: ${action}`);
      
      if (complaintId) {
        // Update specific complaint
        const complaint = complaints.find(c => c.id === complaintId);
        if (!complaint) {
          console.error('Complaint not found');
          return;
        }
        
        try {
          let newStatus, priority = null;
          
          if (action === 'resolve') {
            newStatus = 'Resolved';
          } else if (action === '2days') {
            newStatus = 'In Progress';
            priority = '2 days';
          } else if (action === '1day') {
            newStatus = 'In Progress'; 
            priority = '1 day';
          }
          
          // Call API to update status in database
          const updateResult = await updateComplaintStatusAPI(complaintId, newStatus, priority, 'MC1');
          console.log(`✅ Updated complaint ${complaintId} in database:`, updateResult);
          
          // Immediately refresh data from database to ensure UI shows latest persistent data
          await fetchRoadsComplaints();
          
        } catch (apiError) {
          console.warn(`⚠️ API update failed for ${complaintId}:`, apiError.message);
        }
        
        // Update local state for specific complaint
        const updatedComplaints = complaints.map(complaint => {
          if (complaint.id === complaintId) {
            if (action === 'resolve') {
              return { ...complaint, status: 'Resolved' };
            } else if (action === '2days') {
              return { ...complaint, priority: '2 days', status: 'In Progress' };
            } else if (action === '1day') {
              return { ...complaint, priority: '1 day', status: 'In Progress' };
            }
          }
          return complaint;
        });
        
        setComplaints(updatedComplaints);
        console.log(`✅ Updated local complaint ${complaintId} for ${action} action`);
        
      } else {
        // Update all open complaints (bulk action)
        const updatedComplaints = complaints.map(complaint => {
          if (complaint.status === 'Open' || complaint.status === 'In Progress') {
            if (action === 'resolve') {
              return { ...complaint, status: 'Resolved' };
            } else if (action === '2days') {
              return { ...complaint, priority: '2 days', status: 'In Progress' };
            } else if (action === '1day') {
              return { ...complaint, priority: '1 day', status: 'In Progress' };
            }
          }
          return complaint;
        });
        
        setComplaints(updatedComplaints);
        console.log(`✅ Updated complaints for ${action} action`);
      }
      
    } catch (err) {
      console.error('🚨 Error updating complaint status:', err);
      setError('Failed to update complaint status');
    }
  };

  const getStatusClass = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'open': return 'status-open';
      case 'in progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-open';
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Open';
    // Status is already in proper case from database
    return status;
  };

  if (loading) {
    return (
      <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <style>{styles}</style>
        <main className="main-content">
          <div className="loading">🛣️ Loading Roads Department data...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>

      <main className="main-content">
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:24,marginTop:8}}>
          <img src="/images/logo.png" alt="Socio Connect Logo" style={{width:150,objectFit:'contain',display:'block'}} />
        </div>
        
        <header className="header">
          <h1>
            <span className="material-icons" style={{fontSize:'2rem'}}>add_road</span>
            Roads Department
          </h1>
          <div className="back-arrow" onClick={() => navigate(-1)}>
            <span className="material-icons" style={{ fontSize: '24px', color: '#7c4dff' }}>arrow_back</span>
          </div>
        </header>

        <div className="stats-container">
          <div className="total-complaints">{totalComplaints}</div>
          <div className="stats-label">Total Roads Complaints</div>
          
          <div className="action-buttons">
            <button 
              className="action-btn resolve-btn"
              onClick={() => updateComplaintStatus('resolve')}
            >
              <span className="material-icons" style={{fontSize:'18px',marginRight:'8px'}}>check_circle</span>
              Resolved
            </button>
            <button 
              className="action-btn priority-btn"
              onClick={() => updateComplaintStatus('2days')}
            >
              <span className="material-icons" style={{fontSize:'18px',marginRight:'8px'}}>schedule</span>
              2 Days
            </button>
            <button 
              className="action-btn urgent-btn"
              onClick={() => updateComplaintStatus('1day')}
            >
              <span className="material-icons" style={{fontSize:'18px',marginRight:'8px'}}>priority_high</span>
              1 Day
            </button>
          </div>
        </div>

        <div className="complaints-section">
          <h2 className="section-title">
            <span className="material-icons" style={{fontSize:'1.5rem',marginRight:'8px'}}>list_alt</span>
            Complaint Details
          </h2>
          
          {error && (
            <div className="error">
              Error: {error}
              <br />
              <small>Showing sample data for demonstration</small>
            </div>
          )}
          
          {complaints.length === 0 ? (
            <div className="no-data">No roads complaints found</div>
          ) : (
            complaints.map((complaint, index) => (
              <div key={complaint.id || index} className="complaint-item">
                <div className="complaint-header">
                  <span className="complaint-id">#{complaint.id}</span>
                  <span className="complaint-date">{complaint.date}</span>
                </div>
                <div className="complaint-desc">{complaint.description}</div>
                <div className="complaint-footer" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
                  <span className={`complaint-status ${getStatusClass(complaint.status)}`}>
                    {formatStatus(complaint.status)}
                  </span>
                  {complaint.priority && (
                    <span style={{color:'#ff9800',fontWeight:'600',fontSize:'0.9rem'}}>
                      Priority: {complaint.priority}
                    </span>
                  )}
                  <div className="complaint-actions" style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    <button 
                      className="action-btn resolve-btn"
                      style={{fontSize:'0.8rem',padding:'6px 12px',minWidth:'auto'}}
                      onClick={() => updateComplaintStatus('resolve', complaint.id)}
                    >
                      <span className="material-icons" style={{fontSize:'14px',marginRight:'4px'}}>check_circle</span>
                      Resolved
                    </button>
                    <button 
                      className="action-btn priority-btn"
                      style={{fontSize:'0.8rem',padding:'6px 12px',minWidth:'auto'}}
                      onClick={() => updateComplaintStatus('2days', complaint.id)}
                    >
                      <span className="material-icons" style={{fontSize:'14px',marginRight:'4px'}}>schedule</span>
                      2 Days
                    </button>
                    <button 
                      className="action-btn urgent-btn"
                      style={{fontSize:'0.8rem',padding:'6px 12px',minWidth:'auto'}}
                      onClick={() => updateComplaintStatus('1day', complaint.id)}
                    >
                      <span className="material-icons" style={{fontSize:'14px',marginRight:'4px'}}>priority_high</span>
                      1 Day
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}