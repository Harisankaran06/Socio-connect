@echo off
echo ========================================
echo  Socio Connect - API Setup Checker
echo ========================================
echo.

echo Checking if localhost is accessible...
ping -n 1 localhost >nul
if %errorlevel%==0 (
    echo [✓] Localhost is accessible
) else (
    echo [✗] Localhost is not accessible
    echo     Please start your web server (XAMPP/WAMP)
)
echo.

echo Testing API endpoints...
echo.

echo 1. Testing Stats API...
curl -s "http://localhost/project/desktop/web/api/stats?mc_area=MC1" > temp_stats.json
if exist temp_stats.json (
    echo [✓] Stats API responded
    type temp_stats.json
    del temp_stats.json
) else (
    echo [✗] Stats API failed
)
echo.

echo 2. Testing Recent Complaints API...
curl -s "http://localhost/project/desktop/web/api/recent?mc_area=MC1&limit=3" > temp_recent.json
if exist temp_recent.json (
    echo [✓] Recent Complaints API responded
    type temp_recent.json
    del temp_recent.json
) else (
    echo [✗] Recent Complaints API failed
)
echo.

echo 3. Testing Category Stats API...
curl -s "http://localhost/project/desktop/web/api/category-stats?mc_area=MC1" > temp_category.json
if exist temp_category.json (
    echo [✓] Category Stats API responded
    type temp_category.json
    del temp_category.json
) else (
    echo [✗] Category Stats API failed
)
echo.

echo ========================================
echo  Test Complete
echo ========================================
echo.
echo If you see JSON responses above, your API is working!
echo If you see errors, check:
echo 1. XAMPP/WAMP is running (Apache + MySQL)
echo 2. Database 'socio_connect' exists
echo 3. API files are in correct folder
echo.
pause