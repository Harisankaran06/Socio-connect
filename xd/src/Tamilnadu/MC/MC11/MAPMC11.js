import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
  body { background: linear-gradient(135deg, #e8ebff, #f8f5ff); min-height: 100vh; overflow-x: hidden; position: relative; }
  body::before, body::after { content: ""; position: absolute; border-radius: 50%; background: rgba(174, 144, 255, 0.2); z-index: 0; }
  body::before { width: 400px; height: 400px; top: -120px; left: -120px; }
  body::after { width: 300px; height: 300px; bottom: -80px; right: -80px; }
  .back-arrow {
    position: absolute;
    left: 32px;
    top: 32px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    z-index: 10;
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

const center = [13.0827, 80.2707]; // Chennai coordinates for MC11


// Bounding box for Chennai
const CHENNAI_BOUNDS = {
  minLat: 12.9,
  maxLat: 13.2,
  minLng: 80.1,
  maxLng: 80.3,
};

// Function to generate random locations within Chennai
const getRandomLocations = (count) => {
  const locations = [];
  const streetNames = ["Gandhi Street", "Nehru Road", "Kamaraj Avenue", "Anna Salai", "Rajaji Street"];
  for (let i = 0; i < count; i++) {
    const lat = Math.random() * (CHENNAI_BOUNDS.maxLat - CHENNAI_BOUNDS.minLat) + CHENNAI_BOUNDS.minLat;
    const lng = Math.random() * (CHENNAI_BOUNDS.maxLng - CHENNAI_BOUNDS.minLng) + CHENNAI_BOUNDS.minLng;
    const address = `${Math.floor(Math.random() * 100) + 1}, ${streetNames[Math.floor(Math.random() * streetNames.length)]}, Chennai`;
    locations.push({ lat, lng, address });
  }
  return locations;
};

const complaintCategories = [
    { label: "Electricity Issues", value: 18 },
    { label: "Water Supply Issues", value: 15 },
    { label: "Sanitation Issues", value: 10 },
    { label: "Road Issues", value: 7 },
    { label: "PWD Issues", value: 5 },
];

export default function MAPMC11() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState('');
  const [markers, setMarkers] = useState([]);

  // Fix Leaflet icon issue
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);
const handleIssueChange = (event) => {
    const issueLabel = event.target.value;
    setSelectedIssue(issueLabel);
    if (issueLabel) {
      const category = complaintCategories.find(c => c.label === issueLabel);
      const count = category ? category.value : 0;
      setMarkers(getRandomLocations(count));
    } else {
      setMarkers([]);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <img src="/images/back.png" alt="Back" className="back-arrow" onClick={() => navigate(-1)} />
      <img className="logo-absolute" src="/images/logo.png" alt="Socio Connect Logo" />
      <main className="main-content">
        <div className="map-container">
          <div className="map-card">
            <div className="map-wrapper">
              <div className="map-header">
                <select value={selectedIssue} onChange={handleIssueChange}>
                  <option value="">Select Issues</option>
                  {complaintCategories.map(cat => (
                    <option key={cat.label} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />                {markers.map((marker, idx) => (
                  <Marker key={idx} position={[marker.lat, marker.lng]}>
                    <Popup>
                      <div>
                        <strong>Issue Location</strong><br />
                        {marker.address}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

