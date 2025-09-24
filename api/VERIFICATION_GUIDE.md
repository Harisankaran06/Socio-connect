# 🔍 API Verification Scripts - User Guide

This folder contains multiple verification scripts to test your Socio Connect PHP MySQL API integration. Choose the one that works best for your environment.

## 📋 Available Verification Tools

### 1. 🌐 **Web Dashboard** (Recommended for Beginners)
**File:** `verify-dashboard.html`
**How to use:**
1. Open in browser: `http://localhost/project/desktop/web/api/verify-dashboard.html`
2. Click "Run All Tests" button
3. View real-time results with detailed responses

**Features:**
- ✅ Visual interface with real-time testing
- ✅ Shows API responses and error details
- ✅ No command line knowledge required
- ✅ Quick links to other tools

---

### 2. 🖥️ **Enhanced PHP Test Page**
**File:** `test.php`
**How to use:**
1. Open in browser: `http://localhost/project/desktop/web/api/test.php`
2. Automatic testing with detailed diagnostics

**Features:**
- ✅ Tests PHP configuration and database
- ✅ Shows detailed error messages
- ✅ Validates all API endpoints
- ✅ Database connection diagnostics

---

### 3. ⚡ **Batch Script** (Windows Command Prompt)
**File:** `verify_setup.bat`
**How to use:**
1. Double-click the file, or
2. Open Command Prompt and run: `verify_setup.bat`

**Features:**
- ✅ Comprehensive testing with progress tracking
- ✅ Color-coded results
- ✅ Saves test log to file
- ✅ Works on any Windows system

---

### 4. 🔧 **PowerShell Script** (Advanced Windows)
**File:** `Verify-Setup.ps1`
**How to use:**
1. Right-click → "Run with PowerShell", or
2. In PowerShell: `.\Verify-Setup.ps1`
3. For detailed output: `.\Verify-Setup.ps1 -Detailed`

**Features:**
- ✅ Most comprehensive testing
- ✅ Advanced error handling
- ✅ JSON response analysis
- ✅ Custom base URL support

---

### 5. 🚀 **Node.js Script** (For Developers)
**File:** `verify-api.js`
**How to use:**
1. Install Node.js if not installed
2. Run: `node verify-api.js`
3. Optional custom URL: `node verify-api.js http://your-server/api`

**Features:**
- ✅ Cross-platform (Windows, Mac, Linux)
- ✅ Detailed JSON logging
- ✅ Professional developer output
- ✅ Programmable and extensible

---

### 6. 📊 **Simple Batch Script** (Quick Test)
**File:** `test_api.bat`
**How to use:**
1. Double-click to run quick test

**Features:**
- ✅ Basic connectivity testing
- ✅ Fast execution
- ✅ Simple pass/fail results

---

## 🎯 **Which Tool Should I Use?**

| Your Situation | Recommended Tool | Why |
|----------------|------------------|-----|
| **New to programming** | `verify-dashboard.html` | Visual, easy to understand |
| **Want detailed diagnostics** | `test.php` | Shows PHP and database info |
| **Windows user, quick test** | `verify_setup.bat` | Comprehensive, easy to run |
| **Advanced Windows user** | `Verify-Setup.ps1` | Most features and flexibility |
| **Developer/programmer** | `verify-api.js` | Professional output, extensible |
| **Just want to check basics** | `test_api.bat` | Fast and simple |

---

## 🔧 **Setup Requirements**

Before running any verification tool:

1. **XAMPP/WAMP Running:**
   - ✅ Apache service started
   - ✅ MySQL service started

2. **Database Setup:**
   - ✅ `socio_connect` database created
   - ✅ `database_setup.sql` imported

3. **Files in Place:**
   - ✅ API files in: `C:\xampp\htdocs\project\desktop\web\api\`

---

## 📊 **Understanding Test Results**

### ✅ **All Tests Pass (100%)**
- 🎉 **Perfect!** Your API is ready
- Start your React app and test MC1 components
- Real data should appear instead of fallback data

### ⚠️ **Most Tests Pass (70-99%)**
- 🔧 **Good progress** - minor issues to fix
- Review failed tests and address specific problems
- React app should work with fallback data

### ❌ **Many Tests Fail (<70%)**
- 🚨 **Setup issues** - fundamental problems
- Check XAMPP/WAMP services
- Verify database and file locations
- Run `test.php` for detailed diagnostics

---

## 🛠️ **Common Issues & Solutions**

### **Issue: "API connection failed"**
**Solution:**
- Check if Apache is running in XAMPP
- Verify API files are in correct folder
- Try accessing: `http://localhost/project/desktop/web/api/test.php`

### **Issue: "Database connection error"**
**Solution:**
- Check if MySQL is running in XAMPP
- Verify database `socio_connect` exists
- Check credentials in `config.php`

### **Issue: "404 Not Found"**
**Solution:**
- Ensure mod_rewrite is enabled in Apache
- Check `.htaccess` file exists in api folder
- Verify folder path is correct

### **Issue: "No sample data found"**
**Solution:**
- Import `database_setup.sql` in phpMyAdmin
- Check if complaints table has data
- Verify MC1 area data exists

---

## 📋 **Test Coverage**

All verification tools test:

| Component | What's Tested |
|-----------|---------------|
| **Network** | Localhost connectivity |
| **Web Server** | Apache availability |
| **Database** | MySQL connection and data |
| **API Endpoints** | All 5 API endpoints |
| **Data Validation** | Sample data existence |
| **Integration** | End-to-end functionality |

---

## 🔗 **Quick Access Links**

After running verification, use these links:

- **API Dashboard:** `http://localhost/project/desktop/web/api/verify-dashboard.html`
- **PHP Diagnostics:** `http://localhost/project/desktop/web/api/test.php`
- **Database Admin:** `http://localhost/phpmyadmin`
- **Stats API:** `http://localhost/project/desktop/web/api/stats?mc_area=MC1`
- **Complaints API:** `http://localhost/project/desktop/web/api/complaints?mc_area=MC1`

---

## 📝 **Logs and Reports**

Verification tools create log files:
- `verification_log.txt` - Simple text log
- `verification_log.json` - Detailed JSON log (Node.js script)

These help track issues and share results with developers.

---

## 🚀 **Next Steps After Verification**

1. **If all tests pass:**
   - Start React app: `npm start`
   - Navigate to MC1 components
   - Verify real data displays

2. **If tests fail:**
   - Fix issues identified by verification
   - Re-run verification scripts
   - Contact support with log files if needed

---

## 📞 **Getting Help**

If verification fails:
1. Run `test.php` for detailed diagnostics
2. Check log files for specific errors
3. Share verification results for troubleshooting
4. Review setup guide for missing steps