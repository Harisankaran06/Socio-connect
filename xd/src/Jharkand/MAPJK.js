import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

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

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 23.3441,
  lng: 85.3096,
};

// Bounding box for Ranchi
const RANCHI_BOUNDS = {
  minLat: 23.25,
  maxLat: 23.45,
  minLng: 85.20,
  maxLng: 85.40,
};

// Function to generate random locations within Ranchi
const getRandomLocations = (count) => {
  const locations = [];
  const streetNames = ["Main Road", "Kanke Road", "Harmu Road", "Lalpur Chowk", "Doranda Street"];
  for (let i = 0; i < count; i++) {
    const lat = Math.random() * (RANCHI_BOUNDS.maxLat - RANCHI_BOUNDS.minLat) + RANCHI_BOUNDS.minLat;
    const lng = Math.random() * (RANCHI_BOUNDS.maxLng - RANCHI_BOUNDS.minLng) + RANCHI_BOUNDS.minLng;
    const address = `${Math.floor(Math.random() * 100) + 1}, ${streetNames[Math.floor(Math.random() * streetNames.length)]}, Ranchi`;
    locations.push({ lat, lng, address });
  }
  return locations;
};

const complaintCategories = [
    { label: "Electricity Issues", value: 20 },
    { label: "Water Supply Issues", value: 15 },
    { label: "Sanitation Issues", value: 10 },
    { label: "Road Issues", value: 8 },
    { label: "PWD Issues", value: 5 },
];

export default function MAPJK() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState('');
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef(null);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
      }
    }
  };

  const handleIssueChange = (event) => {
    const issueLabel = event.target.value;
    setSelectedIssue(issueLabel);
    setActiveMarker(null);

    if (issueLabel) {
      const category = complaintCategories.find(c => c.label === issueLabel);
      const count = category ? category.value : 0;
      setMarkers(getRandomLocations(count));
    } else {
      setMarkers([]);
    }
  };

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
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
              <LoadScript 
                googleMapsApiKey={API_KEY}
                libraries={['places']}
              >
                <>
                  <div className="map-header">
                    <select value={selectedIssue} onChange={handleIssueChange}>
                      <option value="">Select Issues</option>
                      {complaintCategories.map(cat => (
                        <option key={cat.label} value={cat.label}>{cat.label}</option>
                      ))}
                    </select>
                    <Autocomplete
                      onLoad={(ref) => (autocompleteRef.current = ref)}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <input type="search" placeholder="Search location" aria-label="Search map" style={{ width: '100%' }} />
                    </Autocomplete>
                  </div>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={12}
                    onLoad={onLoad}
                    onClick={() => setActiveMarker(null)}
                  >
                    {markers.map((marker, index) => (
                      <Marker 
                        key={index} 
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => handleMarkerClick(marker)}
                      />
                    ))}

                    {activeMarker && (
                      <InfoWindow
                        position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
                        onCloseClick={() => setActiveMarker(null)}
                      >
                        <div style={{ padding: '5px' }}>
                          <h6 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Issue Location</h6>
                          <p style={{ margin: '0 0 10px 0' }}>{activeMarker.address}</p>
                          <button 
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.lat},${activeMarker.lng}`, '_blank')}
                            style={{
                              backgroundColor: '#7c4dff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              padding: '8px 12px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                            }}
                          >
                            Get Directions
                          </button>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </>
              </LoadScript>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
