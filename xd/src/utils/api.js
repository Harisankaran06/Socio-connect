import axios from 'axios';

// API base URLs to try in order
const API_BASES = [
  'http://localhost:8080',                         // PHP development server
  'http://localhost/project/desktop/web/api',      // Direct Apache
  'http://127.0.0.1/project/desktop/web/api',     // Alternative localhost
  '/project/desktop/web/api',                     // Proxy route
  'http://localhost:80/project/desktop/web/api',  // Explicit port 80
];

// Create axios instance with default configuration
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Enhanced API call with multiple URL attempts and better error handling
export const apiCall = async (endpoint, options = {}) => {
  const errors = [];
  
  for (const baseUrl of API_BASES) {
    try {
      // For localhost:8080 (PHP dev server), use query parameter approach
      let url;
      if (baseUrl === 'http://localhost:8080') {
        const endpointName = endpoint.replace('/', '');
        url = `${baseUrl}/complaints.php?endpoint=${endpointName}&mc_area=MC1`;
      } else {
        url = `${baseUrl}/complaints.php${endpoint}`;
      }
      
      console.log(`🔄 Trying API URL: ${url}`);
      
      const response = await apiClient.get(url, options);
      
      if (response.data && response.data.success) {
        console.log(`✅ API Success with URL: ${url}`, response.data);
        return response.data;
      } else {
        throw new Error('API returned unsuccessful response: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      const errorMsg = `${baseUrl}: ${error.message}`;
      errors.push(errorMsg);
      console.warn(`❌ API attempt failed: ${errorMsg}`);
      
      // Continue to next URL unless it's the last one
      if (baseUrl === API_BASES[API_BASES.length - 1]) {
        break;
      }
    }
  }
  
  // If all attempts failed, throw comprehensive error
  const allErrors = errors.join('; ');
  console.error('🚨 All API attempts failed:', allErrors);
  throw new Error(`All API attempts failed: ${allErrors}`);
  throw new Error(`All API attempts failed: ${allErrors}`);
};

// Specific API functions
export const getStats = (mcArea = 'MC1') => 
  apiCall(`/stats?mc_area=${mcArea}`);

export const getCategoryStats = (mcArea = 'MC1') => 
  apiCall(`/category-stats?mc_area=${mcArea}`);

export const getComplaints = (mcArea = 'MC1') => 
  apiCall(`/complaints?mc_area=${mcArea}`);

export const getRecentComplaints = (mcArea = 'MC1') => 
  apiCall(`/recent?mc_area=${mcArea}`);

export const getAnalytics = (mcArea = 'MC1') => 
  apiCall(`/analytics?mc_area=${mcArea}`);

export const getComplaintsByStatus = (mcArea = 'MC1', status = 'open') => 
  apiCall(`/complaints?mc_area=${mcArea}&status=${status}`);

export const getComplaintsWithLocation = (mcArea = 'MC1', category = null) => {
  const categoryParam = category ? `&category=${encodeURIComponent(category)}` : '';
  return apiCall(`/locations?mc_area=${mcArea}${categoryParam}`);
};

// Update complaint status function with enhanced error handling
export const updateComplaintStatus = async (complaintId, newStatus, priority = null, mcArea = 'MC1') => {
  const errors = [];
  
  for (const baseUrl of API_BASES) {
    try {
      // For localhost:8080 (PHP dev server), use different URL structure
      let url;
      if (baseUrl === 'http://localhost:8080') {
        url = `${baseUrl}/complaints.php?endpoint=update-complaint&action=update-complaint`;
      } else {
        url = `${baseUrl}/complaints.php/update-complaint`;
      }
      
      console.log(`🔄 Trying API URL for status update: ${url}`);
      
      const requestData = {
        id: complaintId,
        status: newStatus,
        mc_area: mcArea,
        ...(priority && { priority })
      };
      
      console.log(`📤 Sending update request:`, requestData);
      
      const response = await apiClient.post(url, requestData);
      
      if (response.data && response.data.success) {
        console.log(`✅ Status update successful with URL: ${url}`, response.data);
        return response.data;
      } else {
        throw new Error('API returned unsuccessful response: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      const errorMsg = `${baseUrl}: ${error.message}`;
      errors.push(errorMsg);
      console.warn(`❌ Status update attempt failed: ${errorMsg}`);
      
      // Log more details about the error
      if (error.response) {
        console.warn(`📄 Response status: ${error.response.status}`);
        console.warn(`📄 Response data:`, error.response.data);
      }
      
      // Continue to next URL unless it's the last one
      if (baseUrl === API_BASES[API_BASES.length - 1]) {
        break;
      }
    }
  }
  
  // If all attempts failed, throw comprehensive error
  const allErrors = errors.join('; ');
  console.error('🚨 All status update attempts failed:', allErrors);
  throw new Error(`All status update attempts failed: ${allErrors}`);
  throw new Error(`All status update attempts failed: ${allErrors}`);
};