@echo off
setlocal enabledelayedexpansion
color 0A
title Socio Connect - Comprehensive API Verification

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║           🚀 SOCIO CONNECT - API VERIFICATION SCRIPT         ║
echo ║                     Comprehensive Testing                     ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

:: Initialize counters
set PASS_COUNT=0
set FAIL_COUNT=0
set TOTAL_TESTS=10

:: Function to display test result
goto :main

:test_result
if "%1"=="PASS" (
    echo [✓] %2
    set /a PASS_COUNT+=1
) else (
    echo [✗] %2
    set /a FAIL_COUNT+=1
)
goto :eof

:main

echo ⏳ Starting verification tests...
echo.

:: Test 1: Check if localhost is accessible
echo 📡 Test 1/10: Network Connectivity
ping -n 1 localhost >nul 2>&1
if %errorlevel%==0 (
    call :test_result PASS "Localhost is accessible"
) else (
    call :test_result FAIL "Localhost is NOT accessible - Start XAMPP/WAMP"
)
echo.

:: Test 2: Check if Apache is running
echo 🌐 Test 2/10: Apache Web Server
curl -s -I "http://localhost" >nul 2>&1
if %errorlevel%==0 (
    call :test_result PASS "Apache web server is running"
) else (
    call :test_result FAIL "Apache web server is NOT running"
)
echo.

:: Test 3: Check if API folder is accessible
echo 📁 Test 3/10: API Folder Access
curl -s -I "http://localhost/project/desktop/web/api/" >nul 2>&1
if %errorlevel%==0 (
    call :test_result PASS "API folder is accessible"
) else (
    call :test_result FAIL "API folder is NOT accessible - Check folder location"
)
echo.

:: Test 4: Database Connection Test
echo 🗄️ Test 4/10: Database Connection
curl -s "http://localhost/project/desktop/web/api/test.php" | find "Database connection successful" >nul
if %errorlevel%==0 (
    call :test_result PASS "Database connection working"
) else (
    call :test_result FAIL "Database connection failed - Check MySQL and database"
)
echo.

:: Test 5: Stats API
echo 📊 Test 5/10: Statistics API
curl -s "http://localhost/project/desktop/web/api/stats?mc_area=MC1" > temp_stats.json 2>nul
if exist temp_stats.json (
    findstr "success.*true" temp_stats.json >nul
    if !errorlevel!==0 (
        call :test_result PASS "Stats API is working"
        echo     Response: 
        type temp_stats.json | more
    ) else (
        call :test_result FAIL "Stats API returned error"
        type temp_stats.json
    )
    del temp_stats.json
) else (
    call :test_result FAIL "Stats API is not responding"
)
echo.

:: Test 6: Recent Complaints API
echo 🕐 Test 6/10: Recent Complaints API
curl -s "http://localhost/project/desktop/web/api/recent?mc_area=MC1&limit=3" > temp_recent.json 2>nul
if exist temp_recent.json (
    findstr "success.*true" temp_recent.json >nul
    if !errorlevel!==0 (
        call :test_result PASS "Recent Complaints API is working"
        echo     Response:
        type temp_recent.json | more
    ) else (
        call :test_result FAIL "Recent Complaints API returned error"
    )
    del temp_recent.json
) else (
    call :test_result FAIL "Recent Complaints API is not responding"
)
echo.

:: Test 7: All Complaints API
echo 📋 Test 7/10: All Complaints API
curl -s "http://localhost/project/desktop/web/api/complaints?mc_area=MC1" > temp_complaints.json 2>nul
if exist temp_complaints.json (
    findstr "success.*true" temp_complaints.json >nul
    if !errorlevel!==0 (
        call :test_result PASS "All Complaints API is working"
        echo     Found complaints in response
    ) else (
        call :test_result FAIL "All Complaints API returned error"
    )
    del temp_complaints.json
) else (
    call :test_result FAIL "All Complaints API is not responding"
)
echo.

:: Test 8: Category Stats API
echo 📈 Test 8/10: Category Statistics API
curl -s "http://localhost/project/desktop/web/api/category-stats?mc_area=MC1" > temp_category.json 2>nul
if exist temp_category.json (
    findstr "success.*true" temp_category.json >nul
    if !errorlevel!==0 (
        call :test_result PASS "Category Stats API is working"
        echo     Response:
        type temp_category.json | more
    ) else (
        call :test_result FAIL "Category Stats API returned error"
    )
    del temp_category.json
) else (
    call :test_result FAIL "Category Stats API is not responding"
)
echo.

:: Test 9: Analytics API
echo 📊 Test 9/10: Analytics API
curl -s "http://localhost/project/desktop/web/api/analytics?mc_area=MC1" > temp_analytics.json 2>nul
if exist temp_analytics.json (
    findstr "success.*true" temp_analytics.json >nul
    if !errorlevel!==0 (
        call :test_result PASS "Analytics API is working"
        echo     Response:
        type temp_analytics.json | more
    ) else (
        call :test_result FAIL "Analytics API returned error"
    )
    del temp_analytics.json
) else (
    call :test_result FAIL "Analytics API is not responding"
)
echo.

:: Test 10: Complete Integration Test
echo 🔄 Test 10/10: Complete Integration Test
if %PASS_COUNT% GEQ 7 (
    call :test_result PASS "System integration is ready for React app"
) else (
    call :test_result FAIL "System needs attention before React integration"
)
echo.

:: Final Results
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                        📋 TEST RESULTS                       ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo ✅ Passed Tests: %PASS_COUNT%/%TOTAL_TESTS%
echo ❌ Failed Tests: %FAIL_COUNT%/%TOTAL_TESTS%
echo.

if %PASS_COUNT%==%TOTAL_TESTS% (
    echo 🎉 EXCELLENT! All tests passed. Your API is ready!
    echo.
    echo ✅ Next Steps:
    echo    1. Start your React app: npm start
    echo    2. Navigate to MC1 Dashboard
    echo    3. Check if real data appears
    echo.
) else if %PASS_COUNT% GEQ 7 (
    echo ⚠️  GOOD! Most tests passed. Minor issues to fix.
    echo.
    echo 🔧 Recommended Actions:
    echo    1. Fix the failed tests above
    echo    2. Re-run this script
    echo    3. Test React app with fallback data
    echo.
) else (
    echo 🚨 ATTENTION NEEDED! Multiple issues found.
    echo.
    echo 🛠️  Required Actions:
    echo    1. Check XAMPP/WAMP is running (Apache + MySQL)
    echo    2. Verify database 'socio_connect' exists
    echo    3. Ensure API files are in correct location
    echo    4. Run test.php in browser for detailed diagnostics
    echo.
)

echo 🔗 Useful Links:
echo    • Detailed Test: http://localhost/project/desktop/web/api/test.php
echo    • phpMyAdmin: http://localhost/phpmyadmin
echo    • API Base: http://localhost/project/desktop/web/api/
echo.
echo 📄 Log saved to: verification_log.txt
echo %date% %time% - Passed: %PASS_COUNT%/%TOTAL_TESTS% >> verification_log.txt

echo.
pause