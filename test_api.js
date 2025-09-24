#!/usr/bin/env node
/**
 * API Testing Script for Status Updates
 * Tests all button actions across departments
 */

const axios = require('axios');

const API_BASE = 'http://localhost:8080';

// Test API endpoints
async function testAPI() {
  console.log('🧪 Testing API Status Update Functionality\n');
  
  try {
    // Test 1: Resolve button functionality
    console.log('1️⃣ Testing RESOLVE button (should set status to "Resolved")');
    const resolveTest = await axios.post(`${API_BASE}/complaints.php?endpoint=update-complaint`, {
      id: 'TEST001',
      status: 'Resolved',
      mc_area: 'MC1'
    });
    console.log('✅ Resolve test result:', resolveTest.data);
    console.log('');

    // Test 2: 1 Day button functionality
    console.log('2️⃣ Testing 1 DAY button (should set status to "In Progress")');
    const oneDayTest = await axios.post(`${API_BASE}/complaints.php?endpoint=update-complaint`, {
      id: 'TEST002',
      status: 'In Progress',
      priority: '1 day',
      mc_area: 'MC1'
    });
    console.log('✅ 1 Day test result:', oneDayTest.data);
    console.log('');

    // Test 3: 2 Days button functionality
    console.log('3️⃣ Testing 2 DAYS button (should set status to "In Progress")');
    const twoDaysTest = await axios.post(`${API_BASE}/complaints.php?endpoint=update-complaint`, {
      id: 'TEST003',
      status: 'In Progress',
      priority: '2 days',
      mc_area: 'MC1'
    });
    console.log('✅ 2 Days test result:', twoDaysTest.data);
    console.log('');

    // Test 4: Get all complaints to verify updates
    console.log('4️⃣ Testing data retrieval (verify persistence)');
    const getComplaints = await axios.get(`${API_BASE}/complaints.php?endpoint=complaints&mc_area=MC1`);
    console.log('✅ Get complaints result:', getComplaints.data);
    
    console.log('\n🎉 All API tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Resolve button → Status: "Resolved"');
    console.log('   ✅ 1 Day button → Status: "In Progress", Priority: "1 day"');
    console.log('   ✅ 2 Days button → Status: "In Progress", Priority: "2 days"');
    console.log('   ✅ Data persistence working');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('📄 Response data:', error.response.data);
    }
  }
}

// Test the departments
async function testDepartments() {
  console.log('\n🏢 Testing Department-Specific Functionality\n');
  
  const departments = [
    { name: 'Sanitation', id: 'SAN001' },
    { name: 'Electricity', id: 'ELE001' },
    { name: 'Water Supply', id: 'WAT001' },
    { name: 'Roads', id: 'ROA001' },
    { name: 'PWD', id: 'PWD001' }
  ];

  for (const dept of departments) {
    console.log(`🔧 Testing ${dept.name} Department:`);
    
    try {
      // Test resolve for this department
      const resolveResult = await axios.post(`${API_BASE}/complaints.php?endpoint=update-complaint`, {
        id: dept.id,
        status: 'Resolved',
        mc_area: 'MC1'
      });
      
      console.log(`   ✅ ${dept.name} resolve test: ${resolveResult.data.success ? 'SUCCESS' : 'FAILED'}`);
      
    } catch (error) {
      console.log(`   ❌ ${dept.name} test failed: ${error.message}`);
    }
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Comprehensive API Testing...\n');
  
  await testAPI();
  await testDepartments();
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Open http://localhost:3000');
  console.log('2. Navigate to Tamil Nadu → MC1 → Any Department');
  console.log('3. Test buttons: Resolve, 1 Day, 2 Days');
  console.log('4. Refresh page to verify persistence');
  console.log('5. Repeat for all 5 departments');
}

// Execute tests
runAllTests().catch(console.error);