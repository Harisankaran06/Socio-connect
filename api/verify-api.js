#!/usr/bin/env node

/**
 * Socio Connect - Node.js API Verification Script
 * Advanced testing with colored output and detailed reporting
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

class ApiVerifier {
    constructor(baseUrl = 'http://localhost/project/desktop/web/api') {
        this.baseUrl = baseUrl;
        this.results = [];
        this.startTime = Date.now();
    }

    log(message, color = 'white') {
        console.log(`${colors[color]}${message}${colors.reset}`);
    }

    success(message) {
        this.log(`✅ ${message}`, 'green');
    }

    error(message) {
        this.log(`❌ ${message}`, 'red');
    }

    warning(message) {
        this.log(`⚠️  ${message}`, 'yellow');
    }

    info(message) {
        this.log(`ℹ️  ${message}`, 'cyan');
    }

    async makeRequest(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}/${endpoint}`;
            const lib = url.startsWith('https:') ? https : http;
            
            const req = lib.get(url, options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve({ status: res.statusCode, data: jsonData, raw: data });
                    } catch (e) {
                        resolve({ status: res.statusCode, data: null, raw: data });
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
        });
    }

    async testEndpoint(name, endpoint, validator = null) {
        this.info(`Testing ${name}...`);
        
        try {
            const result = await this.makeRequest(endpoint);
            
            let success = result.status === 200;
            let message = `${name} responded with HTTP ${result.status}`;
            
            if (validator && success) {
                success = validator(result);
                message = success ? `${name} validation passed` : `${name} validation failed`;
            } else if (result.data && result.data.success !== undefined) {
                success = result.data.success === true;
                message = success ? `${name} API working correctly` : `${name} API returned error: ${result.data.message}`;
            }
            
            if (success) {
                this.success(message);
                if (result.data && typeof result.data === 'object') {
                    console.log(`   Response:`, JSON.stringify(result.data, null, 2).substring(0, 200) + '...');
                }
            } else {
                this.error(message);
            }
            
            this.results.push({ name, success, message, data: result.data });
            return success;
            
        } catch (error) {
            this.error(`${name} failed: ${error.message}`);
            this.results.push({ name, success: false, message: error.message, data: null });
            return false;
        }
    }

    async runComprehensiveTest() {
        this.log('\n╔═══════════════════════════════════════════════════════════════╗', 'cyan');
        this.log('║           🚀 SOCIO CONNECT - NODE.JS VERIFICATION            ║', 'cyan');
        this.log('║                     Comprehensive API Testing                ║', 'cyan');
        this.log('╚═══════════════════════════════════════════════════════════════╝', 'cyan');
        
        this.info(`\nTesting API at: ${this.baseUrl}`);
        this.info(`Start time: ${new Date().toLocaleString()}\n`);

        // Test 1: Basic connectivity
        await this.testEndpoint(
            'Basic Connectivity',
            '',
            (result) => result.status === 200 || result.status === 403 // Apache might return 403 for directory listing
        );

        // Test 2: Test page
        await this.testEndpoint(
            'PHP Test Page',
            'test.php',
            (result) => result.raw && result.raw.includes('Database connection successful')
        );

        // Test 3: Stats API
        await this.testEndpoint('Statistics API', 'stats?mc_area=MC1');

        // Test 4: Recent complaints
        await this.testEndpoint('Recent Complaints API', 'recent?mc_area=MC1&limit=5');

        // Test 5: All complaints
        await this.testEndpoint('All Complaints API', 'complaints?mc_area=MC1');

        // Test 6: Category stats
        await this.testEndpoint('Category Statistics API', 'category-stats?mc_area=MC1');

        // Test 7: Analytics
        await this.testEndpoint('Analytics API', 'analytics?mc_area=MC1');

        // Test 8: Data validation
        this.info('Testing data validation...');
        try {
            const statsResult = await this.makeRequest('stats?mc_area=MC1');
            if (statsResult.data && statsResult.data.success && statsResult.data.data.total > 0) {
                this.success('Sample data exists in database');
                this.results.push({ name: 'Data Validation', success: true, message: 'Sample data found' });
            } else {
                this.error('No sample data found - please run database_setup.sql');
                this.results.push({ name: 'Data Validation', success: false, message: 'No sample data' });
            }
        } catch (error) {
            this.error(`Data validation failed: ${error.message}`);
            this.results.push({ name: 'Data Validation', success: false, message: error.message });
        }

        this.generateReport();
    }

    generateReport() {
        const endTime = Date.now();
        const duration = Math.round((endTime - this.startTime) / 1000);
        const passed = this.results.filter(r => r.success).length;
        const total = this.results.length;
        const successRate = Math.round((passed / total) * 100);

        this.log('\n╔═══════════════════════════════════════════════════════════════╗', 'magenta');
        this.log('║                        📋 FINAL REPORT                       ║', 'magenta');
        this.log('╚═══════════════════════════════════════════════════════════════╝', 'magenta');

        this.log(`\n📊 Test Results: ${passed}/${total} passed (${successRate}%)`, 'bright');
        this.log(`⏱️  Test Duration: ${duration} seconds`, 'bright');
        this.log(`🕐 Completed: ${new Date().toLocaleString()}`, 'bright');

        console.log('\n📋 Detailed Results:');
        this.results.forEach((result, index) => {
            const status = result.success ? '✅' : '❌';
            console.log(`   ${index + 1}. ${status} ${result.name}: ${result.message}`);
        });

        if (successRate === 100) {
            this.log('\n🎉 EXCELLENT! All tests passed successfully!', 'green');
            this.log('✅ Your API is fully functional and ready for React integration', 'green');
            this.log('\n🚀 Next Steps:', 'cyan');
            this.log('   1. Start your React development server: npm start', 'white');
            this.log('   2. Navigate to the MC1 Dashboard components', 'white');
            this.log('   3. Verify real data appears from your database', 'white');
        } else if (successRate >= 70) {
            this.warning('\n⚠️  Most tests passed, but some issues need attention');
            this.log('\n🔧 Recommended Actions:', 'yellow');
            this.log('   1. Review and fix the failed tests above', 'white');
            this.log('   2. Re-run this verification script', 'white');
            this.log('   3. Test React app (should work with fallback data)', 'white');
        } else {
            this.error('\n🚨 Multiple critical issues found!');
            this.log('\n🛠️  Required Actions:', 'red');
            this.log('   1. Ensure XAMPP/WAMP is running (Apache + MySQL)', 'white');
            this.log('   2. Verify socio_connect database exists with sample data', 'white');
            this.log('   3. Check API files location and permissions', 'white');
            this.log('   4. Run database_setup.sql in phpMyAdmin', 'white');
        }

        this.log('\n🔗 Quick Links:', 'cyan');
        this.log(`   • Detailed Test: ${this.baseUrl}/test.php`, 'white');
        this.log('   • Database Admin: http://localhost/phpmyadmin', 'white');
        this.log(`   • API Base: ${this.baseUrl}`, 'white');

        // Save log file
        const logData = {
            timestamp: new Date().toISOString(),
            duration: duration,
            results: this.results,
            summary: { passed, total, successRate }
        };

        try {
            fs.writeFileSync('verification_log.json', JSON.stringify(logData, null, 2));
            this.log('\n📄 Detailed log saved to: verification_log.json', 'cyan');
        } catch (error) {
            this.warning(`Could not save log file: ${error.message}`);
        }
    }
}

// CLI Usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const baseUrl = args[0] || 'http://localhost/project/desktop/web/api';
    
    const verifier = new ApiVerifier(baseUrl);
    verifier.runComprehensiveTest().catch(console.error);
}

module.exports = ApiVerifier;