import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplaintsByStatus, getStats, getComplaints } from '../../../../utils/api.js';
import '../mc1.css';

const SUCMC1 = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Always use manual filtering for more reliable results
      console.log('🔄 Fetching all complaints for manual filtering...');
      
      const allComplaintsResponse = await getComplaints('MC1');
      let resolvedComplaints = [];
      
      if (allComplaintsResponse && allComplaintsResponse.success && Array.isArray(allComplaintsResponse.data)) {
        console.log('📊 All complaints received:', allComplaintsResponse.data.length);
        
        // Filter for resolved complaints manually
        resolvedComplaints = allComplaintsResponse.data.filter(complaint => {
          const status = complaint.status ? complaint.status.toLowerCase().trim() : '';
          const isResolved = ['resolved', 'completed', 'success', 'finished', 'done'].includes(status);
          
          if (isResolved) {
            console.log('✅ Found resolved complaint:', complaint.complaint_id, 'Status:', complaint.status);
          }
          
          return isResolved;
        });
        
        console.log('📈 Filtered resolved complaints:', resolvedComplaints.length);
      } else {
        console.warn('❌ Failed to get complaints data');
      }
      
      setComplaints(resolvedComplaints);
      
      // Get overall stats for success rate calculation
      const statsResponse = await getStats('MC1');
      if (statsResponse && statsResponse.success) {
        console.log('📊 Stats received:', statsResponse.data);
        setStats(statsResponse.data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load complaints data');
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.complaint_id?.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const currentComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calculateSuccessRate = () => {
    if (!stats) return "0%";
    
    const total = parseInt(stats.total) || 0;
    const actualResolved = complaints.length; // Use actual filtered complaints count
    
    if (total === 0) return "0%";
    const rate = Math.round((actualResolved / total) * 100);
    return `${rate}%`;
  };

  const getResolvedCount = () => {
    return complaints.length; // Show actual resolved complaints count
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* NLTN Theme Background Effects */}
      <style>{`
        :root { --accent: #9b5cf1; }
        body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); position: relative; }
        body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
        body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
        body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
        
        /* Material Icons fallback */
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      {/* NLTN Theme Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
        padding: '0 15px',
        zIndex: 1
      }}>
        
        {/* NLTN Back Arrow */}
        <div
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '15px',
            top: '15px',
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
            zIndex: 100
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 1)';
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(124, 77, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          <span className="material-icons" style={{ color: '#7c4dff', fontSize: '24px' }}>
            arrow_back
          </span>
        </div>

        {/* NLTN Header */}
        <h1 style={{ 
          fontSize: '2rem',
          color: '#7c4dff',
          marginBottom: '28px',
          fontWeight: '700',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>
          Success Rate Analysis
        </h1>
        
        <p style={{ 
          color: '#555',
          fontSize: '1.08rem',
          marginBottom: '28px',
          textAlign: 'center'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <span className="material-icons" style={{ fontSize: '20px', color: '#7c4dff' }}>check_circle</span>
            </span>
            {getResolvedCount()} Resolved | Success Rate: {calculateSuccessRate()}
          </span>
        </p>
        
        {/* Debug Info */}
        {!loading && !error && (
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            fontSize: '12px',
            color: '#666'
          }}>
            <strong>Debug Info:</strong> 
            Total Complaints: {stats?.total || 'N/A'} | 
            Resolved from API Stats: {stats?.resolved || 'N/A'} | 
            Actual Filtered Resolved: {complaints.length} | 
            Success Rate: {calculateSuccessRate()}
          </div>
        )}

        {/* NLTN Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '25px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Search resolved complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              fontSize: '14px',
              flex: '1',
              maxWidth: '300px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#7c4dff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <div style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            background: 'white',
            fontSize: '14px',
            minWidth: '120px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#7c4dff',
            fontWeight: '600'
          }}>
            <span style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
              <span className="material-icons" style={{ fontSize: '16px', color: '#7c4dff' }}>check_circle</span>
            </span>
            {filteredComplaints.length} resolved
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ 
              fontSize: '18px', 
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span className="material-icons rotating">refresh</span>
              Loading success rate data...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px 20px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '2px solid #ff5252'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: '#ff5252', marginBottom: '15px' }}>
              error_outline
            </span>
            <h3 style={{ color: '#ff5252', margin: '0 0 10px 0' }}>Error Loading Data</h3>
            <p style={{ color: '#666', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Success State - NLTN Complaints Grid */}
        {!loading && !error && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {currentComplaints.map((complaint, index) => (
                <div
                  key={complaint.complaint_id || index}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07)',
                    border: '1.5px solid rgba(155,92,241,0.10)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 77, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ 
                        margin: '0 0 5px 0', 
                        color: '#333',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}>
                        {complaint.title || 'No Title'}
                      </h3>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        background: '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}>
                        ID: #{complaint.complaint_id || 'N/A'}
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#e8f8e8',
                      color: '#4caf50',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span className="material-icons" style={{ fontSize: '14px' }}>check_circle</span>
                      Resolved
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: '#555', 
                    margin: '0 0 15px 0',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {complaint.description || 'No description available'}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <div style={{
                      background: '#7c4dff',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {complaint.category || 'General'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      {complaint.updated_at ? new Date(complaint.updated_at).toLocaleDateString() : 
                       complaint.created_at ? new Date(complaint.created_at).toLocaleDateString() : 'No date'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '30px'
              }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    background: currentPage === 1 ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: currentPage === 1 ? '#999' : 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span className="material-icons" style={{ fontSize: '18px' }}>chevron_left</span>
                  Previous
                </button>
                
                <span style={{ 
                  padding: '10px 20px',
                  background: 'white',
                  borderRadius: '8px',
                  border: '2px solid #667eea',
                  color: '#667eea',
                  fontWeight: '600'
                }}>
                  {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    background: currentPage === totalPages ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: currentPage === totalPages ? '#999' : 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  Next
                  <span className="material-icons" style={{ fontSize: '18px' }}>chevron_right</span>
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredComplaints.length === 0 && (
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '60px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}>
                <span className="material-icons" style={{ fontSize: '64px', color: '#ddd', marginBottom: '20px' }}>
                  check_circle_outline
                </span>
                <h3 style={{ color: '#666', margin: '0 0 10px 0' }}>No resolved complaints found</h3>
                <p style={{ color: '#999', margin: 0 }}>
                  {searchTerm ? 'Try adjusting your search terms' : 'No resolved complaints available at the moment'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SUCMC1;