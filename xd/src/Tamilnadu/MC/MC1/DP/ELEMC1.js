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
  border-left: 4px solid #7c4dff;
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
  color: #7c4dff;
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

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  z-index: 1000;
  transform: translateX(400px);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.notification.show {
  transform: translateX(0);
}

.notification.success {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.notification.error {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

@media (max-width: 768px) {
  .main-content { padding: 16px; }
  .action-buttons { flex-direction: column; align-items: center; }
  .complaint-header { flex-direction: column; align-items: flex-start; gap: 4px; }
}
`;

export default function ElectricityDepartment() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, show: false } : null);
      setTimeout(() => setNotification(null), 300);
    }, 3000);
  };

  useEffect(() => {
    fetchElectricityComplaints();
  }, []);

  const fetchElectricityComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getComplaints('MC1');
      console.log('🏢 Electricity Dept - API Response:', response);
      
      if (response && response.success && response.data) {
        // Filter complaints for Electricity department
        const electricityComplaints = response.data.filter(complaint => 
          complaint.category && complaint.category.toLowerCase().includes('electricity') ||
          complaint.department && complaint.department.toLowerCase().includes('electricity')
        );
        
        console.log('⚡ Filtered Electricity Complaints:', electricityComplaints);
        setComplaints(electricityComplaints);
        setTotalComplaints(electricityComplaints.length);
      } else {
        setError('No data received from API');
      }
    } catch (err) {
      console.error('🚨 Error fetching electricity complaints:', err);
      setError(err.message);
      
      // Fallback mock data for electricity department
      const mockElectricityComplaints = [
        {
          id: 'ELE001',
          description: 'Street light not working on Main Road',
          status: 'Open',
          category: 'Electricity',
          date: '2025-09-22',
          department: 'Electricity'
        },
        {
          id: 'ELE002', 
          description: 'Power outage in residential area',
          status: 'In Progress',
          category: 'Electricity',
          date: '2025-09-21',
          department: 'Electricity'
        },
        {
          id: 'ELE003',
          description: 'Faulty transformer creating noise',
          status: 'Resolved',
          category: 'Electricity', 
          date: '2025-09-20',
          department: 'Electricity'
        }
      ];
      
      setComplaints(mockElectricityComplaints);
      setTotalComplaints(mockElectricityComplaints.length);
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
          
          console.log(`🔄 About to call API with:`, { complaintId, newStatus, priority });
          
          try {
            // Call API to update status in database
            const updateResult = await updateComplaintStatusAPI(complaintId, newStatus, priority, 'MC1');
            console.log(`✅ Updated complaint ${complaintId} in database:`, updateResult);
            showNotification(`✅ Complaint #${complaintId} ${action === 'resolve' ? 'resolved' : 'updated'} successfully!`);
            
            // Immediately refresh data from database to ensure UI shows latest persistent data
            await fetchElectricityComplaints();
            
          } catch (apiError) {
            // Fallback: Update local state if API fails
            console.warn(`⚠️ API failed, using local fallback for complaint ${complaintId}:`, apiError.message);
            
            // Update local state as fallback
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
            showNotification(`✅ Complaint #${complaintId} ${action === 'resolve' ? 'resolved' : 'updated'} locally (API unavailable)`);
          }
          
        } catch (apiError) {
          console.error(`❌ API update failed for ${complaintId}:`, apiError);
          console.error('📄 Full error details:', {
            message: apiError.message,
            stack: apiError.stack,
            cause: apiError.cause
          });
          
          // Show detailed error message to help debug
          let errorMessage = `Failed to update complaint #${complaintId}`;
          if (apiError.message) {
            errorMessage += `: ${apiError.message}`;
          }
          
          showNotification(`❌ ${errorMessage}`, 'error');
        }
        
      } else {
        // Update all open complaints (bulk action)
        const openComplaintsToUpdate = complaints.filter(complaint => 
          complaint.status === 'open' || complaint.status === 'in_progress'
        );
        
        if (openComplaintsToUpdate.length > 0) {
          let successCount = 0;
          let failureCount = 0;
          
          // Update each complaint via API with database persistence
          for (const complaint of openComplaintsToUpdate) {
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
              const updateResult = await updateComplaintStatusAPI(complaint.id, newStatus, priority, 'MC1');
              console.log(`✅ Updated complaint ${complaint.id} in database:`, updateResult);
              successCount++;
              
            } catch (apiError) {
              console.warn(`⚠️ API update failed for ${complaint.id}:`, apiError.message);
              failureCount++;
            }
          }
          
          // Show summary notification
          if (successCount > 0) {
            showNotification(`✅ ${successCount} complaints ${action === 'resolve' ? 'resolved' : 'updated'} successfully!`);
          }
          if (failureCount > 0) {
            showNotification(`❌ ${failureCount} complaints failed to update`, 'error');
          }
          
          // Refresh data from database to show latest persistent state
          await fetchElectricityComplaints();
        }
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
          <div className="loading">⚡ Loading Electricity Department data...</div>
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
            <span className="material-icons" style={{fontSize:'2rem'}}>bolt</span>
            Electricity Department
          </h1>
          <div className="back-arrow" onClick={() => navigate(-1)}>
            <span className="material-icons" style={{ fontSize: '24px', color: '#7c4dff' }}>arrow_back</span>
          </div>
        </header>

        <div className="stats-container">
          <div className="total-complaints">{totalComplaints}</div>
          <div className="stats-label">Total Electricity Complaints</div>
          
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
            <div className="no-data">No electricity complaints found</div>
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

      {/* Notification Toast */}
      {notification && (
        <div className={`notification ${notification.type} ${notification.show ? 'show' : ''}`}>
          <span className="material-icons" style={{fontSize: '20px'}}>
            {notification.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {notification.message}
        </div>
      )}
    </>
  );
}