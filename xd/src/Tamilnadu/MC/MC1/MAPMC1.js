import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getComplaintsWithLocation, getStats } from '../../../utils/api';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
  :root { --accent: #9b5cf1; }
  html, body { height: 100%; }
  body { background: linear-gradient(135deg, #e8ebff, #f8f5ff); min-height: 100vh; overflow-x: hidden; position: relative; }
  body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174,144,255,0.18); z-index: 0; }
  body::before { width: 400px; height: 400px; top: -100px; left: -100px; }
  body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
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
  .logo-absolute {
    position: absolute;
    top: 2mm;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: 150px;
    height: auto;
    margin: 0;
    padding: 0;
    background: transparent;
    display: block;
    line-height: 0;
  }
  .main-content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 0;
    position: relative;
    z-index: 1;
  }
  .map-container { display: flex; align-items: center; justify-content: center; width: 100%; }
  .map-card {
    position: relative;
    width: 100%;
    max-width: 1200px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.04);
    margin-top: 120px;
  }
  .map-header {
    padding: 18px 24px 12px 24px;
    background: #fafaff;
    border-radius: 12px 12px 0 0;
    border-bottom: 2px solid #ececec;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .map-header input, .map-header select {
    width: 48%;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    box-shadow: 0 2px 8px rgba(155,92,241,0.04)
  }
  .map-wrapper {
    width: 100%;
    height: 520px;
    border-radius: 0 0 12px 12px;
    overflow: hidden;
  }
  @media (max-width: 900px) {
    .map-wrapper { height: 420px; max-width: 560px; }
    .main-content { padding: 16px; }
  }
`;

const center = [13.0827, 80.2707]; // Chennai City Center (Fort St. George area)

// Category mapping for complaint types
const categoryMapping = {
  'Electricity Issues': 'Electricity',
  'Water Supply Issues': 'Water Supply', 
  'Sanitation Issues': 'Sanitation',
  'Road Issues': 'Roads',
  'PWD Issues': 'PWD'
};

// Status color mapping for markers
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'open': return '#e74c3c';
    case 'in progress': return '#f39c12';
    case 'resolved': return '#27ae60';
    case 'closed': return '#95a5a6';
    default: return '#3498db';
  }
};

// Priority icon mapping
const getPriorityIcon = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'critical': return '🔴';
    case 'high': return '🟠';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '🔵';
  }
};

export default function MAPMC1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIssue, setSelectedIssue] = useState('');
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complaintCategories, setComplaintCategories] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(11);

  // Fix Leaflet icon issue and create custom icon for Chennai center
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Check if we came from a complaint click
    if (location.state?.selectedComplaint) {
      const complaint = location.state.selectedComplaint;
      setSelectedComplaint(complaint);
      
      // If complaint has coordinates, center map on it
      if (complaint.latitude && complaint.longitude) {
        setMapCenter([complaint.latitude, complaint.longitude]);
        setMapZoom(15); // Closer zoom for specific complaint
      }
      
      // Pre-filter by category if specified
      if (location.state.filterCategory) {
        const categoryLabel = `${location.state.filterCategory} Issues`;
        setSelectedIssue(categoryLabel);
      }
    }

    // Load initial data
    loadComplaintStats();
    loadAllComplaints();
  }, [location.state]);

  // Load complaint statistics to get category counts
  const loadComplaintStats = async () => {
    try {
      const response = await getStats('MC1');
      if (response && response.success) {
        setTotalComplaints(parseInt(response.data.total) || 0);
      }
    } catch (error) {
      console.error('Error loading complaint stats:', error);
    }
  };

  // Load all complaints with locations
  const loadAllComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getComplaintsWithLocation('MC1');
      if (response && response.success) {
        const complaintsData = response.data;
        setMarkers(complaintsData);
        
        // Calculate category counts from actual data
        const categoryCounts = complaintsData.reduce((acc, complaint) => {
          const category = complaint.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // Format categories for dropdown
        const formattedCategories = Object.entries(categoryCounts).map(([category, count]) => ({
          label: `${category} Issues`,
          value: count,
          category: category
        }));

        setComplaintCategories(formattedCategories);
      } else {
        throw new Error('Failed to load complaint data');
      }
    } catch (error) {
      console.error('Error loading complaints:', error);
      setError('Failed to load complaint locations');
      setMarkers([]);
    } finally {
      setLoading(false);
    }
  };

  // Custom icon for Chennai center
  const chennaiIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Create custom icon based on complaint status
  const getComplaintIcon = (complaint, isSelected = false) => {
    const color = getStatusColor(complaint.status);
    const size = isSelected ? 28 : 20; // Larger size for selected complaint
    const borderColor = isSelected ? '#9b5cf1' : 'white';
    const borderWidth = isSelected ? '3px' : '2px';
    
    const iconHtml = `
      <div style="
        background-color: ${color}; 
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 50%; 
        border: ${borderWidth} solid ${borderColor};
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isSelected ? '12px' : '10px'};
        ${isSelected ? 'animation: pulse 2s infinite;' : ''}
      ">
        ${getPriorityIcon(complaint.priority)}
      </div>
      ${isSelected ? `
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      </style>
      ` : ''}
    `;

    return new L.DivIcon({
      html: iconHtml,
      iconSize: [size + 4, size + 4],
      iconAnchor: [(size + 4) / 2, (size + 4) / 2],
      popupAnchor: [0, -(size + 4) / 2],
      className: 'custom-complaint-icon'
    });
  };

  const handleIssueChange = async (event) => {
    const issueLabel = event.target.value;
    setSelectedIssue(issueLabel);
    
    if (issueLabel === '') {
      // Show all complaints
      loadAllComplaints();
    } else {
      // Filter by category
      const category = categoryMapping[issueLabel];
      if (category) {
        try {
          setLoading(true);
          const response = await getComplaintsWithLocation('MC1', category);
          if (response && response.success) {
            setMarkers(response.data);
          }
        } catch (error) {
          console.error('Error filtering complaints:', error);
          setError('Failed to filter complaint locations');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      <style>{styles}</style>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <span className="material-icons" style={{ fontSize: '24px', color: '#7c4dff' }}>arrow_back</span>
      </div>
      <img className="logo-absolute" src="/images/logo.png" alt="Socio Connect Logo" />
      <main className="main-content">
        <div className="map-container">
          <div className="map-card">
            <div className="map-wrapper">
              <div className="map-header">
                <select value={selectedIssue} onChange={handleIssueChange} disabled={loading}>
                  <option value="">All Issues ({totalComplaints} total)</option>
                  {complaintCategories.map(cat => (
                    <option key={cat.label} value={cat.label}>
                      {cat.label} ({cat.value})
                    </option>
                  ))}
                </select>
                {loading && <span style={{color: '#666', fontSize: '14px'}}>Loading...</span>}
                {error && <span style={{color: '#e74c3c', fontSize: '14px'}}>{error}</span>}
              </div>
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
                zoomControl={true}
                key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`} // Force re-render when center/zoom changes
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                
                {/* Chennai Center Marker */}
                <Marker position={center} icon={chennaiIcon}>
                  <Popup>
                    <div>
                      <strong>🏙️ Chennai City Center</strong><br />
                      <small>Tamil Nadu, India</small><br />
                      Fort St. George Area<br />
                      <em>Main administrative center</em>
                    </div>
                  </Popup>
                </Marker>
                
                {/* Complaint markers with real data */}
                {markers.map((complaint) => {
                  const isSelectedComplaint = selectedComplaint && selectedComplaint.id === complaint.id;
                  return (
                    <Marker 
                      key={complaint.id} 
                      position={[complaint.latitude, complaint.longitude]}
                      icon={getComplaintIcon(complaint, isSelectedComplaint)}
                    >
                      <Popup 
                        maxWidth={300}
                        autoClose={!isSelectedComplaint} // Keep selected complaint popup open
                      >
                        <div style={{maxWidth: '280px'}}>
                          <strong style={{color: getStatusColor(complaint.status)}}>
                            {getPriorityIcon(complaint.priority)} {complaint.title}
                          </strong><br />
                          {isSelectedComplaint && (
                            <div style={{backgroundColor: '#e8f5e8', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px', fontSize: '12px', color: '#27ae60'}}>
                              📍 Selected from recent complaints
                            </div>
                          )}
                          <div style={{margin: '8px 0', padding: '4px 8px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                            <strong>Category:</strong> {complaint.category}<br />
                            <strong>Status:</strong> <span style={{color: getStatusColor(complaint.status)}}>{complaint.status}</span><br />
                            <strong>Priority:</strong> {complaint.priority}<br />
                          </div>
                          <div style={{marginBottom: '8px'}}>
                            <strong>Location:</strong> {complaint.location}<br />
                            <strong>Reported by:</strong> {complaint.citizen_name || 'Anonymous'}
                          </div>
                          {complaint.description && (
                            <div style={{fontSize: '12px', color: '#666', marginTop: '8px'}}>
                              <strong>Description:</strong> {complaint.description}
                            </div>
                          )}
                          <div style={{fontSize: '11px', color: '#999', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '4px'}}>
                            <strong>Complaint ID:</strong> #{complaint.id}<br />
                            <strong>Created:</strong> {new Date(complaint.created_at).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

