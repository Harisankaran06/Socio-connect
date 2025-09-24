import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplaints } from '../../../../utils/api';

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
:root { --accent: #9b5cf1; }
html, body { height: 100%; }
body, #root { min-height: 100vh; background: linear-gradient(135deg, #e8ebff, #f8f5ff); position: relative; }
body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
.total-main { width: 100%; max-width: 1200px; margin: 40px auto; display: flex; flex-direction: column; align-items: stretch; position: relative; padding: 0 15px; z-index: 1; }
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
.total-title { font-size: 2rem; color: #7c4dff; margin-bottom: 28px; font-weight: 700; letter-spacing: -1px; text-align: center; }
.total-subtitle { color: #555; font-size: 1.08rem; margin-bottom: 28px; text-align: center; }

.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
  flex-wrap: wrap;
}
.filter-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 14px;
}
.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  flex: 1;
  max-width: 300px;
}

.complaints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}
.complaint-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(155,92,241,0.18), 0 2px 10px rgba(155,92,241,0.07);
  border: 1.5px solid rgba(155,92,241,0.10);
  transition: transform 0.2s, box-shadow 0.2s;
}
.complaint-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 77, 255, 0.15);
}
.complaint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.complaint-id {
  color: #888;
  font-size: 12px;
}
.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}
.status-open { background-color: #fdf2e4; color: #e1861e; }
.status-inprogress { background-color: #fadede; color: #e54f4a; }
.status-resolved { background-color: #e6f7ef; color: #15bd60; }
.status-closed { background-color: #f0f0f0; color: #666; }

.complaint-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}
.complaint-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
}
.complaint-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
}
.complaint-category {
  background: #7c4dff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.resolved-badge {
  background: #e6f7ef;
  color: #15bd60;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
}
.page-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.page-btn:hover {
  background: #f5f5f5;
}
.page-btn.active {
  background: #7c4dff;
  color: white;
  border-color: #7c4dff;
}
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}
`;

export default function RESMC1() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const complaintsPerPage = 12;

  useEffect(() => {
    fetchResolvedComplaints();
  }, []);

  const fetchResolvedComplaints = async () => {
    try {
      // Fetch from PHP MySQL API
      const response = await getComplaints('MC1');
      
      if (response && response.success && response.data.length > 0) {
        // Transform the PHP data and filter only resolved complaints
        const transformedData = response.data
          .filter(complaint => {
            const status = complaint.status.toLowerCase();
            return status === 'resolved' || status === 'completed' || status === 'closed';
          })
          .map(complaint => ({
            id: complaint.id,
            title: complaint.title,
            description: complaint.description || 'No description provided',
            category: complaint.category,
            status: complaint.status,
            location: complaint.location || 'Location not specified',
            citizen_name: complaint.citizen_name || 'Anonymous',
            phone_number: complaint.phone_number || '',
            email: complaint.email || '',
            priority: complaint.priority || 'Medium',
            created_at: complaint.created_at,
            updated_at: complaint.updated_at
          }));
        
        setComplaints(transformedData);
        setFilteredComplaints(transformedData);
      } else {
        console.log('❌ No resolved complaints found in API');
        setComplaints([]);
        setFilteredComplaints([]);
      }
    } catch (error) {
      console.error('❌ API fetch error:', error);
      console.log('API connection failed - no fallback data');
      setComplaints([]);
      setFilteredComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = complaints;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(complaint => 
        complaint.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredComplaints(filtered);
    setCurrentPage(1);
  }, [complaints, categoryFilter, searchTerm]);

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
  const startIndex = (currentPage - 1) * complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, startIndex + complaintsPerPage);

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'open') return 'status-open';
    if (statusLower === 'in progress' || statusLower === 'inprogress' || statusLower === 'progress') return 'status-inprogress';
    if (statusLower === 'resolved' || statusLower === 'completed' || statusLower === 'closed') return 'status-resolved';
    return 'status-closed';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(complaints.map(c => c.category))];
    return categories.filter(Boolean);
  };

  return (
    <div>
      <style>{styles}</style>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div className="total-main">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <span className="material-icons" style={{ fontSize: '24px', color: '#7c4dff' }}>arrow_back</span>
        </div>
        
        <h1 className="total-title">Resolved Complaints - Greater Chennai Corporation</h1>
        <p className="total-subtitle">Complete list of resolved complaints with filtering and search options</p>
        
        <div className="filter-bar">
          <select 
            className="filter-select" 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {getUniqueCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <input
            type="text"
            className="search-input"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="loading">Loading resolved complaints...</div>
        ) : (
          <>
            <div className="complaints-grid">
              {currentComplaints.map((complaint, index) => (
                <div key={complaint.id || index} className="complaint-card">
                  <div className="complaint-header">
                    <span className="complaint-id">#{complaint.id || `RES-${startIndex + index + 1}`}</span>
                    <span className={`status ${getStatusClass(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  
                  <div className="complaint-title">
                    {complaint.title}
                    <span className="resolved-badge">✓ Resolved</span>
                  </div>
                  <div className="complaint-desc">{complaint.description}</div>
                  
                  <div className="complaint-meta">
                    <span className="complaint-category">{complaint.category}</span>
                    <span>{formatDate(complaint.updated_at || complaint.created_at)}</span>
                  </div>
                  
                  {complaint.location && (
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                      📍 {complaint.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredComplaints.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No resolved complaints found{searchTerm || categoryFilter !== 'all' ? ' matching your filters' : ''}.
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button 
                  className="page-btn" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}