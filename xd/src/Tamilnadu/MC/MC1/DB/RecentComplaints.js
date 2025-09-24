import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentComplaints } from '../../../../utils/api';

const RecentComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case API fails
  const fallbackComplaints = [
    {
      id: 1,
      title: "Water supply issue in Block A",
      status: "Open",
      category: "Water Supply",
      created_at: "2025-09-20"
    },
    {
      id: 2,
      title: "Street light not working",
      status: "In Progress",
      category: "Electricity",
      created_at: "2025-09-19"
    },
    {
      id: 3,
      title: "Garbage collection delayed",
      status: "Open",
      category: "Sanitation",
      created_at: "2025-09-18"
    }
  ];

  useEffect(() => {
    fetchRecentComplaints();
  }, []);

  const fetchRecentComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getRecentComplaints('MC1');

      if (response.data && response.data.success && response.data.data) {
        console.log('✅ Recent complaints API success:', response.data);
        setComplaints(response.data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.warn('⚠️ Recent complaints API failed, using fallback data:', error.message);
      setError(error.message);
      setComplaints(fallbackComplaints);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return '#e74c3c';
      case 'in progress': return '#f39c12';
      case 'resolved': return '#27ae60';
      case 'closed': return '#95a5a6';
      default: return '#3498db';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'water supply': return '💧';
      case 'electricity': return '⚡';
      case 'roads': return '🛣️';
      case 'sanitation': return '🗑️';
      case 'pwd': return '🏗️';
      default: return '📝';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleComplaintClick = (complaint) => {
    // Navigate to map page, passing complaint data via state
    navigate('/maptn', { 
      state: { 
        selectedComplaint: complaint,
        filterCategory: complaint.category 
      } 
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>📋 Recent Complaints</h3>
        </div>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading recent complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>📋 Recent Complaints</h3>
        {error && (
          <span style={styles.fallbackIndicator} title="Using fallback data due to API error">
            ⚠️ Offline Mode
          </span>
        )}
      </div>
      
      {complaints.length === 0 ? (
        <div style={styles.noData}>
          <p>📄 No recent complaints found</p>
        </div>
      ) : (
        <div style={styles.complaintsList}>
          {complaints.slice(0, 5).map((complaint) => (
            <div 
              key={complaint.id} 
              style={styles.complaintCard}
              onClick={() => handleComplaintClick(complaint)}
              title="Click to view location on map"
            >
              <div style={styles.complaintHeader}>
                <span style={styles.categoryIcon}>
                  {getCategoryIcon(complaint.category)}
                </span>
                <span style={styles.complaintTitle}>
                  {complaint.title}
                </span>
                <span 
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(complaint.status)
                  }}
                >
                  {complaint.status}
                </span>
              </div>
              <div style={styles.complaintMeta}>
                <span style={styles.category}>{complaint.category}</span>
                <span style={styles.date}>{formatDate(complaint.created_at)}</span>
              </div>
              <div style={styles.clickHint}>📍 Click to view on map</div>
            </div>
          ))}
        </div>
      )}
      
      <div style={styles.footer}>
        <button 
          style={styles.refreshButton}
          onClick={fetchRecentComplaints}
          disabled={loading}
        >
          🔄 Refresh
        </button>
        <small style={styles.dataSource}>
          {error ? '📱 Local Data' : '🌐 Live Data'} • MC1 Area
        </small>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '10px 0',
    border: '1px solid #e1e8ed'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #f8f9fa',
    paddingBottom: '10px'
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600'
  },
  fallbackIndicator: {
    fontSize: '12px',
    color: '#f39c12',
    backgroundColor: '#fef5e7',
    padding: '4px 8px',
    borderRadius: '12px',
    border: '1px solid #f39c12'
  },
  loading: {
    textAlign: 'center',
    padding: '30px',
    color: '#7f8c8d'
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '3px solid #ecf0f1',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 15px'
  },
  noData: {
    textAlign: 'center',
    padding: '30px',
    color: '#7f8c8d',
    fontStyle: 'italic'
  },
  complaintsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  complaintCard: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '12px 15px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e9ecef',
      borderColor: '#9b5cf1',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(155, 92, 241, 0.15)'
    }
  },
  clickHint: {
    fontSize: '10px',
    color: '#9b5cf1',
    fontStyle: 'italic',
    marginTop: '4px',
    textAlign: 'center'
  },
  complaintHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  categoryIcon: {
    fontSize: '16px',
    minWidth: '20px'
  },
  complaintTitle: {
    flex: 1,
    fontWeight: '500',
    color: '#2c3e50',
    fontSize: '14px'
  },
  statusBadge: {
    color: 'white',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  complaintMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6c757d'
  },
  category: {
    fontWeight: '500'
  },
  date: {
    fontStyle: 'italic'
  },
  footer: {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  refreshButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500'
  },
  dataSource: {
    color: '#6c757d',
    fontSize: '11px'
  }
};

export default RecentComplaints;