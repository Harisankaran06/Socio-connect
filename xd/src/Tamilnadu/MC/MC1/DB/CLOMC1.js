import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplaintsByStatus, getComplaints } from '../../../../utils/api.js';
import '../mc1.css';

const CLOMC1 = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchClosedComplaints();
  }, []);

  const fetchClosedComplaints = async () => {
    try {
      setLoading(true);
      
      // Always use manual filtering for more reliable results
      console.log('🔄 Fetching all complaints for closed filtering...');
      
      const allComplaintsResponse = await getComplaints('MC1');
      let closedComplaints = [];
      
      if (allComplaintsResponse && allComplaintsResponse.success && Array.isArray(allComplaintsResponse.data)) {
        console.log('📊 All complaints received:', allComplaintsResponse.data.length);
        
        // Filter for closed complaints manually
        closedComplaints = allComplaintsResponse.data.filter(complaint => {
          const status = complaint.status ? complaint.status.toLowerCase().trim() : '';
          const isClosed = ['closed', 'terminated', 'archived', 'cancelled', 'rejected', 'dismissed'].includes(status);
          
          if (isClosed) {
            console.log('🔒 Found closed complaint:', complaint.complaint_id, 'Status:', complaint.status);
          }
          
          return isClosed;
        });
        
        console.log('📈 Filtered closed complaints:', closedComplaints.length);
      } else {
        console.warn('❌ Failed to get complaints data');
      }
      
      setComplaints(closedComplaints);
      
    } catch (error) {
      console.error('Error fetching closed complaints:', error);
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

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* NLTN Theme Background Effects */}
      <style>{`
        :root { --accent: #9b5cf1; }
        body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); position: relative; }
        body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
        body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
        body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
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
          Closed Complaints
        </h1>
        
        <p style={{ 
          color: '#555',
          fontSize: '1.08rem',
          marginBottom: '28px',
          textAlign: 'center'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span className="material-icons" style={{ fontSize: '20px', color: '#6c757d' }}>
              block
            </span>
            {complaints.length} Closed Complaints
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
            Total Filtered Closed: {complaints.length} | 
            Search Results: {filteredComplaints.length}
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
            placeholder="Search closed complaints..."
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
            onFocus={(e) => e.target.style.borderColor = '#6c757d'}
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
            color: '#6c757d',
            fontWeight: '600'
          }}>
            <span className="material-icons" style={{ fontSize: '16px', color: '#6c757d' }}>
              block
            </span>
            {filteredComplaints.length} closed
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(174,144,255,0.1)',
          display: 'none'
        }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <span className="material-icons" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                fontSize: '20px'
              }}>
                search
              </span>
              <input
                type="text"
                placeholder="Search closed complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 45px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '25px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {filteredComplaints.length} closed complaints
            </div>
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
              Loading closed complaints...
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
                    cursor: 'pointer',
                    opacity: 0.8
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 77, 255, 0.15)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07)';
                    e.currentTarget.style.opacity = '0.8';
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
                      backgroundColor: '#f5f5f5',
                      color: '#6c757d',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span className="material-icons" style={{ fontSize: '14px' }}>block</span>
                      Closed
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
                      background: '#6c757d',
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
                    background: currentPage === 1 ? '#f0f0f0' : 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
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
                  border: '2px solid #6c757d',
                  color: '#6c757d',
                  fontWeight: '600'
                }}>
                  {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    background: currentPage === totalPages ? '#f0f0f0' : 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
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
                  block
                </span>
                <h3 style={{ color: '#666', margin: '0 0 10px 0' }}>No closed complaints found</h3>
                <p style={{ color: '#999', margin: 0 }}>
                  {searchTerm ? 'Try adjusting your search terms' : 'No closed complaints available at the moment'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CLOMC1;